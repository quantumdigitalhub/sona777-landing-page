import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteHeader, SiteFooter, DownloadBtn } from "@/components/SiteHeader";
import { resultsQueryOptions } from "@/lib/results-query";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/charts/$slug")({
  loader: ({ context }) => context.queryClient.ensureQueryData(resultsQueryOptions),
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    const title = `${name} Market Chart | Raja567`;
    const description = `View the chart and latest published results for ${name} on Raja567.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  errorComponent: () => (
    <p role="alert" className="p-8 text-center">
      Chart information could not load. Please refresh.
    </p>
  ),
  notFoundComponent: () => <p className="p-8 text-center">Market not found.</p>,
  component: ChartPage,
});

function ChartPage() {
  const { t } = useLanguage();
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(resultsQueryOptions);
  const market = data.markets.find(
    (item) => item.slug === slug || item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug,
  );
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link to="/charts" className="text-sm font-semibold text-primary">
          {t("← All markets", "← सभी मार्केट")}
        </Link>
        <h1 className="mt-4 font-display text-3xl">
          {market ? `${market.name} ${t("Chart", "चार्ट")}` : t("Market Chart", "मार्केट चार्ट")}
        </h1>
        {market ? (
          <div className="my-6">
            <p className="mb-4 text-xl font-bold text-primary">
              {market.result === "Awaiting result"
                ? t("Awaiting result", "परिणाम की प्रतीक्षा")
                : market.result}
            </p>
            {market.chartUrl ? (
              <iframe
                key={market.chartUrl}
                src={market.chartUrl}
                title={`${market.name} ${t("Chart", "चार्ट")}`}
                className="h-[75vh] min-h-96 w-full rounded-md border bg-white"
                sandbox="allow-scripts"
                referrerPolicy="no-referrer"
              />
            ) : (
              <p role="status" className="text-muted-foreground">
                {t("This chart is temporarily unavailable.", "यह चार्ट अभी उपलब्ध नहीं है।")}
              </p>
            )}
          </div>
        ) : (
          <p role="status" className="my-6 text-muted-foreground">
            {data.unavailable.length
              ? t(
                  "Chart information is temporarily unavailable.",
                  "चार्ट की जानकारी अभी उपलब्ध नहीं है।",
                )
              : t(
                  "This market is not in the current feed. See all markets for available charts.",
                  "यह मार्केट वर्तमान सूची में नहीं है। उपलब्ध चार्ट के लिए सभी मार्केट देखें।",
                )}
          </p>
        )}
        <div className="mt-8 border-t pt-6">
          <DownloadBtn />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
