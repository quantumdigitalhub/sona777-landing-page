import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchResults } from "@/lib/results.functions";
import { RESULTS_BASE_URL } from "@/lib/results";

vi.mock("@tanstack/react-start", () => ({
  createServerFn: () => ({ handler: (handler: () => Promise<unknown>) => handler }),
}));

afterEach(() => vi.unstubAllGlobals());

describe("Result feed loading", () => {
  it("loads all provider categories from a single combined request", async () => {
    const request = vi.fn().mockResolvedValue(
      Response.json({
        main_markets: [{ id: 28, market_id: 126, name: "KARNATAKA DAY", result: "100-13-670" }],
        starline: [{ market_id: 1, market_name: "Starline 10:00 AM", result: "123-6" }],
        jackpot: [{ id: 12, time: "21:00", result: "**" }],
      }),
    );
    vi.stubGlobal("fetch", request);
    const feed = await fetchResults();
    expect(feed.unavailable).toEqual([]);
    expect(feed.markets.map((market) => market.category)).toEqual(["main", "starline", "jackpot"]);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request.mock.calls[0]?.[1]).toMatchObject({ redirect: "manual" });
    expect(request.mock.calls[0]?.[0].href).toBe(new URL("public/results", RESULTS_BASE_URL).href);
  });

  it("falls back only for an invalid category and marks failed feeds unavailable", async () => {
    const request = vi
      .fn()
      .mockResolvedValueOnce(
        Response.json({ main_markets: [], starline: [], jackpot: [{ id: 12 }] }),
      )
      .mockResolvedValueOnce(new Response(null, { status: 503 }));
    vi.stubGlobal("fetch", request);
    const feed = await fetchResults();
    expect(feed.markets).toEqual([]);
    expect(feed.unavailable).toEqual(["jackpot"]);
    expect(request).toHaveBeenCalledTimes(2);
    expect(request.mock.calls[1]?.[0].href).toBe(
      new URL("public/results/jackpot", RESULTS_BASE_URL).href,
    );
  });

  it("uses dedicated feeds when the combined request fails", async () => {
    const request = vi
      .fn()
      .mockRejectedValueOnce(new Error("Provider unavailable"))
      .mockImplementation(async () => Response.json({ data: [] }));
    vi.stubGlobal("fetch", request);
    expect((await fetchResults()).unavailable).toEqual([]);
    expect(request).toHaveBeenCalledTimes(4);
  });
});
