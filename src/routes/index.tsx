import { createFileRoute, Link } from "@tanstack/react-router";
import stackedLogo from "@/assets/raja567-stacked.png";
import { SiteHeader, SiteFooter, DownloadBtn } from "@/components/SiteHeader";
import { posts } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { LiveMarkets } from "@/components/LiveMarkets";
import { WhatsAppSupport } from "@/components/WhatsAppSupport";
import { resultsQueryOptions } from "@/lib/results-query";
import { trackDownload } from "@/lib/track";
import { ShieldCheck, Wallet, Headphones, CircleCheck, Crown, Trophy, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(resultsQueryOptions),
  errorComponent: () => <p role="alert" className="p-8 text-center">Results could not load. Please refresh the page.</p>,
  notFoundComponent: () => <p className="p-8 text-center">Page not found.</p>,
  head: () => ({
    meta: [
      { title: "Raja567 Matka – Download App, Live Results & Charts" },
      { name: "description", content: "Download the Raja567 Matka app. Live market results, Jodi & Panel charts, fast withdrawals." },
      { property: "og:title", content: "Raja567 Matka – Download the App" },
      { property: "og:description", content: "Live matka results, charts and instant play. Download Raja567 now." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center gap-2 bg-secondary px-4 py-2.5 text-center text-xs font-semibold tracking-wide text-secondary-foreground sm:text-sm">
        <Crown aria-hidden className="size-4 text-gold" />
        {t("Welcome to Raja567 · Live results & market charts", "Raja567 में आपका स्वागत है · लाइव परिणाम और मार्केट चार्ट")}
      </div>

      <SiteHeader />

      {/* Hero */}
      <section className="overflow-hidden border-b border-gold/30 bg-linear-to-br from-background via-muted to-accent/50">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-12 text-center md:grid-cols-2 md:gap-12 md:py-20 md:text-left">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-card/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"><Crown aria-hidden className="size-4" />{t("The Raja567 experience", "Raja567 का अनुभव")}</p>
            <h1 className="font-display text-5xl leading-[1.08] font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">{t("Your markets.", "आपके मार्केट।")}<br /><span className="text-foreground">{t("A royal experience.", "एक शाही अनुभव।")}</span></h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:mx-0">{t("Discover live matka results, explore Jodi & Panel charts, and find your next market. All in one place with Raja567.", "Raja567 पर लाइव मटका परिणाम देखें, जोड़ी और पैनल चार्ट खोजें और अपने पसंदीदा मार्केट से जुड़े रहें।")}</p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-5 md:justify-start">
              <DownloadBtn big />
              <a href="#results" className="inline-flex items-center gap-1 text-sm font-bold text-primary underline underline-offset-4">{t("Explore live results", "लाइव परिणाम देखें")}<ArrowUpRight aria-hidden className="size-4" /></a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{t("For Android · 18+ only ", "Android के लिए · केवल 18+")}</p>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full border border-gold/30 bg-background/60 p-8 sm:max-w-md sm:p-12">
            <div aria-hidden className="absolute inset-3 rounded-full border border-gold/15" />
            <img src={stackedLogo} alt="Raja567 burgundy crown with a gold ring" width={1236} height={1273} fetchPriority="high" className="relative h-auto w-full" />
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-6 text-center text-sm font-semibold md:grid-cols-4">
          {[[Headphones, "24×7 WhatsApp Support"], [CircleCheck, "Free and Secure"]].map(([Icon, text]) => {
            const TrustIcon = Icon as typeof ShieldCheck;
            return <div key={String(text)} className="flex items-center justify-center gap-2"><TrustIcon className="size-5 shrink-0 text-primary" /><span>{String(text)}</span></div>;
          })}
        </div>
      </section>

      {/* Results */}
      <section id="results" className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
             <p className="mb-2 text-xs font-bold uppercase text-primary">Live markets</p>
            <h2 className="font-display text-3xl">{t("Today's Results", "आज के परिणाम")}</h2>
          </div>
          <Link to="/download" className="text-sm font-bold text-primary underline">{t("Get instant result alerts in app →", "ऐप में तुरंत परिणाम की सूचना पाएँ →")}</Link>
        </div>
        <LiveMarkets />
      </section>

      {/* Charts */}
      <section id="charts" className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="font-display text-3xl">{t("Market Charts", "मार्केट चार्ट")}</h2>
          <div className="mt-6"><LiveMarkets chartsOnly /></div>
          <Link to="/charts" className="mt-4 inline-block text-sm font-bold text-primary underline">{t("View all market charts →", "सभी मार्केट चार्ट देखें →")}</Link>
        </div>
      </section>

      {/* How */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-8 text-center font-display text-3xl">{t("Start Playing in 3 Steps", "3 चरणों में शुरू करें")}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            [t("Download", "डाउनलोड करें"), t("Tap Download and install the Raja567 APK on your Android phone.", "डाउनलोड पर टैप करें और अपने Android फ़ोन पर Raja567 APK इंस्टॉल करें।")],
            [t("Register", "रजिस्टर करें"), t("Sign up with your mobile number in under 30 seconds.", "अपने मोबाइल नंबर से 30 सेकंड से कम समय में रजिस्टर करें।")],
            [t("Play & Win", "खेलें और जीतें"), t("Add funds via UPI, pick your market and withdraw winnings instantly.", "UPI से पैसे जोड़ें, अपना मार्केट चुनें और जीती हुई रकम निकालें।")],
          ].map(([t, d], i) => (
            <div key={t} className="border-l-4 border-primary bg-card p-5">
              <div className="font-display text-3xl text-primary">0{i + 1}</div>
              <h3 className="mt-2 text-lg font-bold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rates */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase text-primary"><Trophy className="size-4" />Game rates</p>
          <h2 className="mb-6 font-display text-3xl">Best Game Rates</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {[["Single", "10 ka 95"], ["Jodi", "10 ka 950"], ["Single Panna", "10 ka 1500"], ["Double Panna", "10 ka 3000"], ["Triple Panna", "10 ka 7000"]].map(([a, b]) => (
              <div key={a} className="rounded-md border bg-muted/50 p-5">
                <div className="flex items-start justify-between gap-2 text-sm font-bold">{a}<ArrowUpRight className="size-4 shrink-0 text-primary" /></div>
                <div className="mt-5 text-xs text-muted-foreground">Rate</div>
                <div className="mt-1 text-lg font-bold text-primary">{b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="mb-6 font-display text-3xl">{t("FAQ", "अक्सर पूछे जाने वाले सवाल")}</h2>
        {[
          [t("Is the app free?", "क्या ऐप मुफ़्त है?"), t("Yes, Raja567 is free to download and register.", "हाँ, Raja567 डाउनलोड करना और रजिस्टर करना मुफ़्त है।")],
          [t("How fast are withdrawals?", "रकम कितनी जल्दी मिलती है?"), t("Most withdrawals reach your UPI or bank within 5–15 minutes.", "अधिकतर निकासी 5–15 मिनट में आपके UPI या बैंक में पहुँच जाती है।")],
          [t("Is it available on iPhone?", "क्या यह iPhone पर उपलब्ध है?"), t("Currently the app is available for Android. iOS is coming soon.", "अभी ऐप Android के लिए उपलब्ध है। iOS जल्द आने वाला है।")],
          [t("How do I install the APK?", "APK कैसे इंस्टॉल करें?"), t("Open the download page for step-by-step Android installation instructions. Keep Play Protect enabled.", "Android पर इंस्टॉल करने के चरणों के लिए डाउनलोड पेज खोलें। Play Protect चालू रखें।")],
        ].map(([q, a]) => (
          <details key={q} className="border-b py-4">
            <summary className="cursor-pointer font-bold">{q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{a}</p>
          </details>
        ))}
        <Link to="/download" className="mt-4 inline-block font-semibold text-primary underline">{t("View installation guide →", "इंस्टॉल करने के निर्देश देखें →")}</Link>
      </section>

      {/* Blog */}
      <section className="border-t bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="mb-6 font-display text-3xl">Matka History & Guides</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="rounded-md border bg-card p-4 hover:border-foreground">
                <h3 className="font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="download" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <h2 className="font-display text-3xl md:text-4xl">Ready to play? Get the app now.</h2>
          <p className="mt-3 opacity-90">{t("Your results, charts and markets. The Raja567 experience.", "आपके परिणाम, चार्ट और मार्केट। Raja567 का अनुभव।")}</p>
          <Button asChild className="mt-6 h-auto bg-accent px-8 py-4 text-lg font-bold text-accent-foreground shadow-none hover:bg-accent/90"><Link to="/download" onClick={() => trackDownload("other")}>{t("↓ Download Raja567", "↓ Raja567 डाउनलोड करें")}</Link></Button>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppSupport floating />
    </div>
  );
}
