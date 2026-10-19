import { z } from "zod";

// Change this one value when the result provider moves domains.
export const RESULTS_BASE_URL = "https://raja567matka.com/api/";
export const categories = ["main", "starline", "jackpot"] as const;
export type Category = (typeof categories)[number];
export const categoryLabels: Record<Category, string> = {
  main: "Main Markets",
  starline: "Starline",
  jackpot: "Jackpot",
};
export type LiveMarket = {
  slug: string;
  id: string;
  category: Category;
  name: string;
  open: string;
  close: string;
  result: string;
  chartUrl: string | null;
};
export type ResultFeed = { markets: LiveMarket[]; unavailable: Category[]; fetchedAt: string };

const recordSchema = z.record(z.unknown());
const roundDateSchema = z.string().date();
function text(row: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }
  return "";
}

export function chartUrl(category: Category, id: string, provided?: string): string | null {
  const provider = new URL(RESULTS_BASE_URL);
  if (provided) {
    try {
      const url = new URL(provided, provider.origin);
      if (url.protocol === "http:" && url.host === provider.host) url.protocol = provider.protocol;
      // Only accept chart destinations on the configured provider, never arbitrary links.
      if (
        url.origin === provider.origin &&
        !url.username &&
        !url.password &&
        /^\/(charts|starline-charts)\/[^/]+\/?$|^\/king-jackpot-chart\/?$/.test(url.pathname)
      ) {
        return new URL(url.pathname + url.search, RESULTS_BASE_URL).href;
      }
    } catch {
      /* Fall back to the documented chart path. */
    }
  }
  const origin = provider.origin;
  if (category === "jackpot") return `${origin}/king-jackpot-chart`;
  if (!id) return null;
  return `${origin}/${category === "main" ? "charts" : "starline-charts"}/${encodeURIComponent(id)}`;
}

export function normalizeResults(
  payload: unknown,
  category: Category,
  now = new Date(),
): LiveMarket[] {
  let value = payload;
  // Support a bare array or the common data/results/category envelopes; reject unknown shapes.
  for (let depth = 0; depth < 4 && !Array.isArray(value); depth++) {
    const parsed = recordSchema.safeParse(value);
    if (!parsed.success) throw new Error("Unexpected results format");
    const row = parsed.data;
    value =
      row[category] ??
      row[`${category}_results`] ??
      row[`${category}_markets`] ??
      row["results"] ??
      row["data"];
  }
  if (!Array.isArray(value)) throw new Error("Unexpected results format");
  const rows = value.map((item) => recordSchema.parse(item));
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  const currentRows =
    category === "starline"
      ? rows.filter((row) => roundDateSchema.parse(row["date"]) === today)
      : rows;
  const markets = currentRows.map((row): LiveMarket => {
    const nested = recordSchema.safeParse(row["market"] ?? row["starline_market"]);
    const info = nested.success ? { ...nested.data, ...row } : row;
    const id = text(
      info,
      category === "starline" ? ["starline_market_id", "market_id", "id"] : ["market_id", "id"],
    );
    const time = category === "jackpot" ? text(info, ["time"]) : "";
    const name =
      text(info, ["market_name", "starline_market_name", "name", "title"]) ||
      (time ? `Jackpot ${time}` : "");
    if (!name || (category !== "jackpot" && !id)) throw new Error("Missing market identity");
    const result = text(info, ["result", "result_string", "full_result", "result_value"]);
    return {
      slug: `${category}-${encodeURIComponent(id || name)}`,
      id,
      category,
      name,
      open: text(info, ["open_time", "open", "start_time"]) || time,
      close: text(info, ["close_time", "close", "end_time"]),
      result: result || "Awaiting result",
      chartUrl: chartUrl(
        category,
        category === "main" ? text(info, ["id", "market_id"]) : id,
        text(info, ["chart_url", "chart_link", "chartUrl"]),
      ),
    };
  });
  const uniqueMarkets = new Map<string, LiveMarket>();
  for (const market of markets) {
    // The provider returns results newest first; keep the latest entry per market.
    if (!uniqueMarkets.has(market.slug)) uniqueMarkets.set(market.slug, market);
  }
  return [...uniqueMarkets.values()];
}
