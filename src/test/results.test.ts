import { describe, expect, it } from "vitest";
import { chartUrl, normalizeResults, RESULTS_BASE_URL } from "@/lib/results";
const providerOrigin = new URL(RESULTS_BASE_URL).origin;

describe("Live result adapter", () => {
  it("resolves feeds under the API base without duplicating api", () => {
    expect(new URL("public/results", RESULTS_BASE_URL).href).toBe(
      "https://sona777.app/api/public/results",
    );
    expect(new URL("public/results/main", RESULTS_BASE_URL).href).toBe(
      "https://sona777.app/api/public/results/main",
    );
  });
  it("reads main results and preserves string digits", () => {
    const rows = normalizeResults(
      {
        data: {
          main: [
            {
              market_id: 7,
              market_name: "Test Main",
              result: "123-04-567",
              chart_url: "/charts/7",
            },
          ],
        },
      },
      "main",
    );
    expect(rows[0]?.result).toBe("123-04-567");
    expect(rows[0]?.chartUrl).toBe(`${providerOrigin}/charts/7`);
  });
  it("builds documented starline and jackpot chart paths", () => {
    expect(chartUrl("starline", "12")).toBe(`${providerOrigin}/starline-charts/12`);
    expect(chartUrl("jackpot", "")).toBe(`${providerOrigin}/king-jackpot-chart`);
  });
  it("reads the provider main_markets envelope and preserves its chart ID", () => {
    const [market] = normalizeResults(
      {
        main_markets: [
          {
            id: 28,
            market_id: 126,
            name: "KARNATAKA DAY",
            result: "100-13-670",
            open_time: "10:00 AM",
            close_time: "11:00 AM",
            chart_url: "http://sona777.app/charts/28",
          },
        ],
      },
      "main",
    );
    expect(market).toMatchObject({
      id: "126",
      result: "100-13-670",
      open: "10:00 AM",
      close: "11:00 AM",
      chartUrl: `${providerOrigin}/charts/28`,
    });
    expect(
      normalizeResults([{ id: 28, market_id: 126, name: "KARNATAKA DAY" }], "main")[0]?.chartUrl,
    ).toBe(`${providerOrigin}/charts/28`);
  });
  it("reads jackpot time slots without inventing a published result", () => {
    const [market] = normalizeResults(
      { data: [{ id: 12, time: "21:00", result: "**" }] },
      "jackpot",
    );
    expect(market).toMatchObject({
      name: "Jackpot 21:00",
      open: "21:00",
      result: "**",
      chartUrl: `${providerOrigin}/king-jackpot-chart`,
    });
  });
  it("keeps the newest starline result when the provider returns market history", () => {
    const markets = normalizeResults(
      [
        {
          id: 157,
          market_id: 1,
          market_name: "Starline 10:00 AM",
          date: "2026-10-13",
          result: "123-6",
        },
        {
          id: 1,
          market_id: 1,
          market_name: "Starline 10:00 AM",
          date: "2026-10-13",
          result: "123-1",
        },
      ],
      "starline",
      new Date("2026-10-13T00:00:00Z"),
    );
    expect(markets).toHaveLength(1);
    expect(markets[0]?.result).toBe("123-6");
  });
  it("shows only today's Starline rounds using India time at midnight", () => {
    const rows = [
      { market_id: 1, market_name: "Yesterday", date: "2026-10-12", result: "123-6" },
      { market_id: 2, market_name: "Today", date: "2026-10-13", result: "234-9" },
      { market_id: 3, market_name: "Tomorrow", date: "2026-10-14", result: "345-2" },
    ];
    expect(
      normalizeResults(rows, "starline", new Date("2026-10-12T18:29:59Z")).map((row) => row.name),
    ).toEqual(["Yesterday"]);
    expect(
      normalizeResults({ data: rows }, "starline", new Date("2026-10-12T18:30:00Z")).map(
        (row) => row.name,
      ),
    ).toEqual(["Today"]);
  });
  it("does not show historical rounds when no Starline results exist today", () => {
    expect(
      normalizeResults(
        [{ market_id: 1, market_name: "Old round", date: "2026-09-21", result: "123-6" }],
        "starline",
        new Date("2026-10-13T00:00:00Z"),
      ),
    ).toEqual([]);
  });
  it("rejects Starline rounds with missing or invalid dates", () => {
    for (const date of [undefined, "invalid", "2026-02-30"]) {
      expect(() =>
        normalizeResults(
          [{ market_id: 1, market_name: "Round", date, result: "123-6" }],
          "starline",
        ),
      ).toThrow();
    }
  });
  it("rejects unsafe chart URLs and uses the documented fallback", () => {
    expect(chartUrl("main", "5", "javascript:alert(1)")).toBe(`${providerOrigin}/charts/5`);
    expect(chartUrl("main", "5", "https://other.example/charts/5")).toBe(
      `${providerOrigin}/charts/5`,
    );
  });
  it("does not invent results or accept unknown formats", () => {
    expect(() => normalizeResults({ success: false }, "main")).toThrow();
    expect(() => normalizeResults([{ id: 1 }], "main")).toThrow();
    expect(normalizeResults([{ market_id: 1, name: "Pending" }], "main")[0]?.result).toBe(
      "Awaiting result",
    );
    expect(normalizeResults([], "starline")).toEqual([]);
  });
});
