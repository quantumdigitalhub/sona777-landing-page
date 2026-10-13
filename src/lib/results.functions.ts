import { createServerFn } from "@tanstack/react-start";
import { categories, normalizeResults, RESULTS_BASE_URL, type ResultFeed } from "./results";

export const fetchResults = createServerFn({ method: "GET" }).handler(
  async (): Promise<ResultFeed> => {
    const now = new Date();
    const read = async (path: string): Promise<unknown> => {
      const response = await fetch(new URL(path, RESULTS_BASE_URL), {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000),
        redirect: "manual",
      });
      if (!response.ok) throw new Error("Result provider unavailable");
      return response.json();
    };
    let combined: unknown;
    try {
      combined = await read("public/results");
    } catch {
      /* Try category feeds independently. */
    }
    const feeds = await Promise.all(
      categories.map(async (category) => {
        if (combined !== undefined && !Array.isArray(combined)) {
          try {
            const root = combined as Record<string, unknown>;
            const nested = root["data"];
            const grouped =
              nested && typeof nested === "object" && !Array.isArray(nested)
                ? (nested as Record<string, unknown>)
                : root;
            const rows =
              grouped[category] ?? grouped[`${category}_results`] ?? grouped[`${category}_markets`];
            if (rows === undefined) throw new Error("Category absent from combined feed");
            return { category, markets: normalizeResults(rows, category, now), unavailable: false };
          } catch {
            /* Fall back to the dedicated category endpoint. */
          }
        }
        try {
          return {
            category,
            markets: normalizeResults(await read(`public/results/${category}`), category, now),
            unavailable: false,
          };
        } catch {
          return { category, markets: [], unavailable: true };
        }
      }),
    );
    return {
      markets: feeds.flatMap((feed) => feed.markets),
      unavailable: feeds.filter((feed) => feed.unavailable).map((feed) => feed.category),
      fetchedAt: now.toISOString(),
    };
  },
);
