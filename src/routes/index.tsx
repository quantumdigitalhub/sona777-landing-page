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
  component: CompactLanding,
});

function CompactLanding() {
  const { t } = useLanguage();
  const steps = [
    { icon: Download, label: t("Download", "डाउनलोड") },
    { icon: Smartphone, label: t("Install", "इंस्टॉल") },
    { icon: CircleCheck, label: t("Open", "खोलें") },
  ];

  return (
    <div className="flex min-h-svh flex-col bg-[#f4f3f0]">
      <SiteHeader compact />
      <main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-6 sm:px-6 sm:py-10">
        <section
          aria-labelledby="app-heading"
          className="grid w-full overflow-hidden rounded-3xl border border-black/5 bg-[#17202e] shadow-xl shadow-black/5 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="p-6 text-white sm:p-9">
            <div className="flex items-center justify-between gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white p-2">
                <img
                  src="/favicon.png"
                  alt=""
                  aria-hidden
                  width={64}
                  height={64}
                  className="h-auto w-full"
                />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/80">
                <Smartphone aria-hidden className="size-3.5" />
                Android
              </span>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
              {t("Your next download", "आपका अगला डाउनलोड")}
            </p>
            <h1
              id="app-heading"
              className="mt-3 text-4xl leading-[1.12] font-extrabold tracking-tight sm:text-5xl"
            >
              Sona 777.
              <br />
              <span className="text-[#f3a18e]">{t("Ready to go.", "आपके लिए तैयार।")}</span>
            </h1>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {t(
                "Get the app on your Android phone. We’ll walk you through the installation.",
                "अपने Android फ़ोन पर ऐप पाएँ। इंस्टॉल करने के आसान निर्देश भी साथ मिलेंगे।",
              )}
            </p>
            <div className="mt-6 [&_a]:w-full">
              <DownloadBtn placement="hero" big />
            </div>
            <Link
              to="/download"
              className="mt-2 flex min-h-11 items-center justify-center gap-1.5 text-xs font-medium text-white/70 hover:text-white"
            >
              {t("Installation help", "इंस्टॉल करने में मदद")}
              <ArrowUpRight aria-hidden className="size-3.5" />
            </Link>
            <ol
              aria-label={t("Getting started", "शुरुआत करें")}
              className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5"
            >
              {steps.map(({ icon: Icon, label }, index) => (
                <li
                  key={label}
                  className="flex min-w-0 flex-col items-center gap-2 text-center text-xs text-white/75"
                >
                  <span className="flex items-center gap-1.5 text-white/45">
                    <span>0{index + 1}</span>
                    <Icon aria-hidden className="size-3.5" />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ol>
          </div>
          <figure className="hidden flex-col items-center justify-center gap-4 bg-[#ebece9] p-7 md:flex">
            <div className="w-44 overflow-hidden rounded-[1.75rem] border-[5px] border-white bg-white shadow-lg shadow-black/10">
              <img
                src={appPreview}
                alt={t("Sona 777 app home screen", "Sona 777 ऐप की होम स्क्रीन")}
                width={398}
                height={764}
                loading="lazy"
                className="block h-auto w-full"
              />
            </div>
            <figcaption className="text-xs text-muted-foreground">
              {t("A look inside the app", "ऐप की एक झलक")}
            </figcaption>
          </figure>
        </section>
      </main>
      <SiteFooter compact />
    </div>
  );
}
