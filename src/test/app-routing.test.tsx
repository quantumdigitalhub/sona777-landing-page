import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";

function makeRouter() {
  return createRouter({ routeTree, context: { queryClient: new QueryClient() } });
}

describe("App download variant routing", () => {
  it("matches the app landing page and APK installation page", () => {
    const router = makeRouter();
    expect(router.matchRoutes("/").at(-1)?.routeId).toBe("/");
    expect(router.matchRoutes("/download").at(-1)?.routeId).toBe("/download");
  });

  it.each(["/charts", "/charts/kalyan", "/blog", "/blog/kalyan-matka-history"])(
    "does not expose the removed route %s",
    (path) => {
      expect(makeRouter().matchRoutes(path).at(-1)?.routeId).toBe(rootRouteId);
    },
  );
});
