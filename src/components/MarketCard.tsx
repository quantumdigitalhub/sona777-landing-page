import { Clock3, ArrowUpRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/language";
import { type LiveMarket } from "@/lib/results";

export function MarketCard({
  market,
  chartsOnly = false,
}: {
  market: LiveMarket;
  chartsOnly?: boolean;
}) {
  const { t } = useLanguage();
  const chartButton = market.chartUrl && (
    <Button
      asChild
      variant="outline"
      size="sm"
      className={chartsOnly ? "shadow-none" : "flex-1 shadow-none"}
    >
      <Link to="/charts/$slug" params={{ slug: market.slug }}>
        <BarChart3 />
        {t("View Chart", "चार्ट देखें")}
      </Link>
    </Button>
  );
  if (chartsOnly)
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border bg-card p-4">
        <span className="font-bold">{market.name}</span>
        {chartButton}
      </div>
    );
  const status =
    market.result === "Awaiting result" || market.result.includes("*")
      ? t("Pending", "प्रतीक्षा में")
      : t("Result", "परिणाम");
  return (
    <article className="overflow-hidden rounded-md border bg-card">
      <div className="flex items-center justify-between gap-2 border-b px-5 py-4">
        <h3 className="font-bold uppercase">{market.name}</h3>
        <span className="shrink-0 rounded-sm bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground">
          {status}
        </span>
      </div>
      <div className="px-5 py-4">
        {(market.open || market.close) && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock3 className="size-3.5 shrink-0" />
            {[market.open, market.close].filter(Boolean).join(" – ")}
          </p>
        )}
        <p className="mt-4 text-xs font-semibold uppercase text-muted-foreground">
          {t("Result", "परिणाम")}
        </p>
        <p className="mt-1 break-words font-display text-2xl text-primary">
          {market.result === "Awaiting result"
            ? t("Awaiting result", "परिणाम की प्रतीक्षा")
            : market.result}
        </p>
      </div>
      <div className="flex gap-2 border-t bg-muted/50 px-4 py-3">
        {chartButton}
        <Button asChild size="sm" className="shadow-none">
          <Link
            to="/download"
            aria-label={`${t("Download app for", "ऐप डाउनलोड करें:")} ${market.name}`}
          >
            <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </article>
  );
}
