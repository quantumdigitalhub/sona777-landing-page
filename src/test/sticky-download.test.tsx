import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DownloadBtn, SiteFooter } from "@/components/SiteHeader";
import { APK_URL } from "@/lib/data";
import { trackApkDownload, trackDownload } from "@/lib/track";

vi.mock("@/lib/track", () => ({
  trackDownload: vi.fn(),
  trackApkDownload: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: "/" }),
  Link: ({ to, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }) => (
    <a href={to} {...props} />
  ),
}));

let notifyVisibility: IntersectionObserverCallback;
const disconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        notifyVisibility = callback;
      }
      observe = vi.fn();
      disconnect = disconnect;
    },
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

function updateVisibility(target: Element, isIntersecting: boolean) {
  const entry = { target, isIntersecting } as IntersectionObserverEntry;
  act(() => notifyVisibility([entry], {} as IntersectionObserver));
}

function renderDownloads() {
  const view = render(
    <>
      <DownloadBtn placement="hero" />
      <DownloadBtn placement="other" />
      <SiteFooter />
    </>,
  );
  const [hero, bottom, sticky] = screen.getAllByRole("link", {
    name: "Download App",
    hidden: true,
  });
  return { ...view, hero, bottom, sticky };
}

describe("Mobile sticky download", () => {
  it("links every download button directly to the APK and records attribution before the attempt", () => {
    const { hero, bottom, sticky } = renderDownloads();
    for (const [button, placement] of [
      [hero, "hero"],
      [bottom, "other"],
      [sticky, "sticky_mobile"],
    ] as const) {
      expect(button).toHaveAttribute("href", APK_URL);
      expect(button).toHaveAttribute("download");
      button.addEventListener("click", (event) => event.preventDefault(), { once: true });
      fireEvent.click(button);
      expect(trackDownload).toHaveBeenLastCalledWith(placement);
    }
    expect(trackApkDownload).toHaveBeenCalledTimes(3);
    expect(vi.mocked(trackDownload).mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(trackApkDownload).mock.invocationCallOrder[0],
    );
  });

  it("stays hidden while the hero button is visible and appears after it scrolls away", () => {
    const { hero, sticky } = renderDownloads();
    expect(sticky).not.toBeVisible();

    updateVisibility(hero, true);
    expect(sticky).not.toBeVisible();

    vi.spyOn(hero, "getBoundingClientRect").mockReturnValue({ bottom: -1 } as DOMRect);
    updateVisibility(hero, false);
    expect(sticky).toBeVisible();

    updateVisibility(hero, true);
    expect(sticky).not.toBeVisible();
  });

  it("hides while the lower page download button is visible", () => {
    const { hero, bottom, sticky } = renderDownloads();
    vi.spyOn(hero, "getBoundingClientRect").mockReturnValue({ bottom: -1 } as DOMRect);
    updateVisibility(hero, false);
    expect(sticky).toBeVisible();

    updateVisibility(bottom, true);
    expect(sticky).not.toBeVisible();

    updateVisibility(bottom, false);
    expect(sticky).toBeVisible();
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = renderDownloads();
    unmount();
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
