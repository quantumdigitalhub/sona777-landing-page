import { supabase } from "@/integrations/supabase/client";

export type Placement = "hero" | "sticky_mobile" | "header" | "other";

const STORAGE_KEY = "raja567-download-click";
const trackingEnabled = Boolean(
  import.meta.env["VITE_SUPABASE_URL"] && import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"],
);
let pendingClick: Promise<boolean> | undefined;

export function getDownloadClickId(): string | null {
  try {
    const value = sessionStorage.getItem(STORAGE_KEY);
    return value && /^[0-9a-f-]{36}$/i.test(value) ? value : null;
  } catch {
    return null;
  }
}

export function trackDownload(placement: Placement) {
  if (typeof window === "undefined") return;
  const id = crypto.randomUUID();
  try {
    sessionStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* Attribution is optional. */
  }
  if (!trackingEnabled) return;
  pendingClick = Promise.resolve(
    supabase
      .from("download_clicks")
      .insert({ id, placement, page: window.location.pathname.slice(0, 200) })
      .then(({ error }) => {
        if (error) {
          console.warn("Click tracking unavailable");
          try {
            if (getDownloadClickId() === id) sessionStorage.removeItem(STORAGE_KEY);
          } catch {
            /* Optional storage. */
          }
        }
        return !error;
      }),
  ).catch(() => false);
}

export async function trackApkDownload(): Promise<void> {
  if (!trackingEnabled) return;
  if (pendingClick) await pendingClick;
  const { error } = await supabase
    .from("apk_download_attempts")
    .insert({ click_id: getDownloadClickId() });
  if (error) console.warn("Download attempt tracking unavailable");
}
