import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Download, Smartphone, CircleCheck } from "lucide-react";
import appPreview from "@/assets/sona-app-preview.png";
import { SiteHeader, SiteFooter, DownloadBtn } from "@/components/SiteHeader";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sona 777 | Get the Android App" },
      {
        name: "description",
        content:
          "Get Sona 777 for Android. Download the app with installation guidance in English and Hindi.",
      },
      { property: "og:title", content: "Sona 777 | Get the Android App" },
      {
        property: "og:description",
        content: "Your Android download and installation help, in one place.",
      },
    ],
  }),
  component: FlatLanding,
});

function FlatLanding() {
  const { t } = useLanguage();
  const steps = [
    {
      icon: Download,
      title: t("Download", "डाउनलोड करें"),
      body: t(
        "Get the app file for your Android phone.",
        "अपने Android फ़ोन के लिए ऐप डाउनलोड करें।",
      ),
    },
    {
      icon: Smartphone,
      title: t("Install", "इंस्टॉल करें"),
      body: t("Follow the guided installation steps.", "इंस्टॉल करने के आसान चरणों का पालन करें।"),
    },
    {
      icon: CircleCheck,
      title: t("Open", "ऐप खोलें"),
      body: t("Find Sona 777 on your phone and open it.", "अपने फ़ोन पर Sona 777 ढूँढें और खोलें।"),
    },
  ];

  return (
    <div className="flex min-h-svh flex-col bg-[#fcfbf9]">
      <SiteHeader compact />
      <main className="flex-1">
        <section
          aria-labelledby="app-heading"
          className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-10 sm:px-8 sm:py-14 md:grid-cols-2 md:gap-14 md:py-16"
        >
          <div className="text-center md:text-left">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <Smartphone aria-hidden className="size-4" />
              {t("Sona 777 for Android", "Android के लिए Sona 777")}
            </p>
            <h1
              id="app-heading"
              className="mt-5 text-5xl leading-[1.08] font-extrabold tracking-tight text-[#17202e] sm:text-6xl lg:text-7xl"
            >
              Sona 777.
              <br />
              <span className="text-primary">{t("Ready when you are.", "आपके लिए तैयार।")}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-muted-foreground md:mx-0">
              {t(
                "Get the app on your Android phone. Installation guidance is available in English and Hindi.",
                "अपने Android फ़ोन पर ऐप पाएँ। इंस्टॉल करने के निर्देश अंग्रेज़ी और हिन्दी में उपलब्ध हैं।",
              )}
            </p>
            <div className="mx-auto mt-7 max-w-sm md:mx-0">
              <DownloadBtn placement="hero" big />
            </div>
            <Link
              to="/download"
              className="mt-2 inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {t("Installation help", "इंस्टॉल करने में मदद")}
              <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              {t("For Android phones · English / हिन्दी", "Android फ़ोन के लिए · English / हिन्दी")}
            </p>
          </div>
          <figure className="flex flex-col items-center gap-5">
            <div className="relative w-full max-w-64 rounded-[2.5rem] border border-[#3b414c] bg-[#17202e] p-2 pb-3 sm:max-w-72 sm:rounded-[2.75rem] sm:p-2.5 sm:pb-3.5">
              <div aria-hidden className="flex h-5 items-center justify-center gap-2">
                <span className="h-1 w-12 rounded-full bg-white/30" />
                <span className="size-1 rounded-full bg-white/30" />
              </div>
              <div className="overflow-hidden rounded-[1.75rem] bg-white sm:rounded-[2rem]">
                <img
                  src={appPreview}
                  alt={t("Sona 777 app home screen", "Sona 777 ऐप की होम स्क्रीन")}
                  width={398}
                  height={764}
                  fetchPriority="high"
                  className="block h-auto w-full"
                />
              </div>
              <div aria-hidden className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-white/40" />
              <span
                aria-hidden
                className="absolute top-24 -right-1 h-10 w-1 rounded-r bg-[#3b414c]"
              />
              <span
                aria-hidden
                className="absolute top-20 -left-1 h-6 w-1 rounded-l bg-[#3b414c]"
              />
              <span
                aria-hidden
                className="absolute top-28 -left-1 h-6 w-1 rounded-l bg-[#3b414c]"
              />
            </div>
            <figcaption className="text-xs text-muted-foreground">
              {t("A look inside Sona 777", "Sona 777 ऐप की एक झलक")}
            </figcaption>
          </figure>
        </section>
        <section aria-labelledby="steps-heading" className="border-t border-black/10">
          <div className="mx-auto max-w-6xl px-5 py-9 sm:px-8 sm:py-12">
            <h2 id="steps-heading" className="text-sm font-bold text-[#17202e]">
              {t("Three steps to get started", "शुरू करने के तीन चरण")}
            </h2>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3 sm:gap-8">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="pt-0.5 text-xs font-bold text-primary">0{index + 1}</span>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-bold text-[#17202e]">
                      <Icon aria-hidden className="size-4 text-primary" />
                      {title}
                    </h3>
                    <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
      <SiteFooter compact />
    </div>
  );
}
