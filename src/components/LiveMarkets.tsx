import { useSuspenseQuery } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories, categoryLabels } from "@/lib/results";
import { resultsQueryOptions } from "@/lib/results-query";
import { MarketCard } from "./MarketCard";
import { useLanguage } from "@/lib/language";

export function LiveMarkets({ chartsOnly = false }: { chartsOnly?: boolean }) {
  const { data, refetch, isFetching } = useSuspenseQuery(resultsQueryOptions);
  const { t, language } = useLanguage();
  const label = (category: string) =>
    t(
      categoryLabels[category as keyof typeof categoryLabels],
      category === "main" ? "मुख्य मार्केट" : category === "starline" ? "स्टारलाइन" : "जैकपॉट",
    );
  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {data.unavailable.length === 3
            ? t("Results temporarily unavailable", "परिणाम अभी उपलब्ध नहीं हैं")
            : `${t("Last checked:", "आखिरी जाँच:")} ${new Date(data.fetchedAt).toLocaleString(language === "hi" ? "hi-IN" : "en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} IST`}
        </p>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 shadow-none"
          disabled={isFetching}
          onClick={() => void refetch()}
        >
          <RefreshCw className={isFetching ? "animate-spin" : ""} />
          {t("Refresh", "रीफ़्रेश")}
        </Button>
      </div>
      {categories.map((category) => {
        const markets = data.markets.filter((market) => market.category === category);
        return (
          <section key={category} className="mb-8 last:mb-0" aria-label={label(category)}>
            <h3 className="mb-3 text-lg font-bold">{label(category)}</h3>
            {data.unavailable.includes(category) ? (
              <p
                role="status"
                className="border-l-2 border-primary bg-muted p-4 text-sm text-muted-foreground"
              >
                {label(category)} —{" "}
                {t(
                  "results could not be loaded. Please try again shortly.",
                  "परिणाम लोड नहीं हो सके। कृपया थोड़ी देर बाद कोशिश करें।",
                )}
              </p>
            ) : markets.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {t("No results published yet.", "अभी कोई परिणाम प्रकाशित नहीं हुआ है।")}
              </p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {markets.map((market) => (
                  <MarketCard key={market.slug} market={market} chartsOnly={chartsOnly} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
