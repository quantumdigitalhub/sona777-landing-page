import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, DownloadBtn } from "@/components/SiteHeader";
import { useLanguage } from "@/lib/language";
import { LiveMarkets } from "@/components/LiveMarkets";
import { resultsQueryOptions } from "@/lib/results-query";

export const Route = createFileRoute("/charts/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(resultsQueryOptions),
  errorComponent: () => <p role="alert" className="p-8 text-center">Charts could not load. Please refresh the page.</p>,
  notFoundComponent: () => <p className="p-8 text-center">Page not found.</p>,
  head: () => ({
    meta: [
      { title: "Matka Charts – Kalyan, Milan, Main Bazar Jodi & Panel | Raja567" },
      { name: "description", content: "All matka market charts in one list. View Kalyan, Milan Day, Main Bazar, Rajdhani and other jodi and panel charts." },
      { property: "og:title", content: "Matka Market Charts – Raja567" },
      { property: "og:description", content: "Jodi and panel charts for all popular matka markets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ChartsList,
});

function ChartsList() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-3xl">{t("Market Charts", "मार्केट चार्ट")}</h1>
        <div className="mt-6"><LiveMarkets chartsOnly /></div>
        <div className="mt-6 rounded-md border-2 border-primary p-4 text-center">
          <p className="mb-3 font-bold">{t("30+ markets with live charts in the app", "ऐप में 30+ मार्केट के लाइव चार्ट")}</p>
          <DownloadBtn />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
