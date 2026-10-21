import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  FileDown,
  FolderOpen,
  Languages,
  Smartphone,
  Check,
} from "lucide-react";
import appPreview from "@/assets/raja567-app-preview.png";
import { SiteHeader, SiteFooter, DownloadBtn } from "@/components/SiteHeader";
import { WhatsAppSupport } from "@/components/WhatsAppSupport";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raja567 App Download | Android Installation Guide" },
      {
        name: "description",
        content:
          "Download the Raja567 Android app. Find app installation instructions and download help in English and Hindi.",
      },
      { property: "og:title", content: "Download Raja567 for Android" },
      {
        property: "og:description",
        content:
          "Get the Android app with step-by-step installation guidance in English and Hindi.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  const steps = [
    {
      icon: Download,
      title: t("Download", "डाउनलोड करें"),
      body: t(
        "Open the download page to download the Android app.",
        "Android ऐप डाउनलोड करने के लिए डाउनलोड पेज खोलें।",
      ),
    },
    {
      icon: FolderOpen,
      title: t("Install", "इंस्टॉल करें"),
      body: t(
        "Open the downloaded file and follow the installation guide.",
        "डाउनलोड की गई फ़ाइल खोलें और इंस्टॉल करने के निर्देश पढ़ें।",
      ),
    },
    {
      icon: Smartphone,
      title: t("Open the app", "ऐप खोलें"),
      body: t(
        "Once installation finishes, open Raja567 from your phone.",
        "इंस्टॉल होने के बाद अपने फ़ोन पर Raja567 खोलें।",
      ),
    },
  ];
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="overflow-hidden border-b border-primary/20 bg-linear-to-br from-background via-muted to-accent/50">
          <div className="mx-auto grid max-w-6xl items-center gap-7 px-4 py-8 text-center sm:gap-12 sm:px-5 sm:py-14 md:grid-cols-2 md:py-20 md:text-left">
            <div>
              <p className="mb-4 inline-flex sm:mb-6 items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
                <Smartphone aria-hidden className="size-4" />
                {t("Available for Android", "Android के लिए उपलब्ध")}
              </p>
              <h1 className="font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {t("Raja567.", "Raja567।")}
                <br />
                <span className="text-primary">
                  {t("One download away.", "बस एक डाउनलोड दूर।")}
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-base sm:mt-5 sm:text-lg leading-relaxed text-muted-foreground md:mx-0">
                {t(
                  "Get Raja567 on your Android phone. Download the app and follow our simple, step-by-step installation guide.",
                  "अपने Android फ़ोन पर Raja567 पाएँ। ऐप डाउनलोड करें और इंस्टॉल करने के आसान निर्देशों का पालन करें।",
                )}
              </p>
              <div className="mt-6 flex flex-col items-stretch justify-center gap-2 sm:mt-8 sm:flex-row sm:items-center sm:gap-5 md:justify-start">
                <DownloadBtn placement="hero" big />
                <a
                  href="#installation"
                  className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-primary"
                >
                  {t("How to install", "इंस्टॉल कैसे करें")}
                  <ArrowRight aria-hidden className="size-4" />
                </a>
              </div>
              <p className="mt-3 text-xs sm:mt-4 text-muted-foreground">
                {t(
                  "Android app · Installation help in English & Hindi",
                  "Android ऐप · इंस्टॉल करने में मदद अंग्रेज़ी और हिन्दी में",
                )}
              </p>
            </div>
            <figure className="mx-auto w-full max-w-64 sm:max-w-72 lg:max-w-80">
              <div className="overflow-hidden rounded-[2rem] border-[6px] border-background bg-card shadow-xl shadow-primary/10 ring-1 ring-primary/15">
                <img
                  src={appPreview}
                  alt={t("Raja567 app home screen", "Raja567 ऐप की होम स्क्रीन")}
                  width={1440}
                  height={2995}
                  fetchPriority="high"
                  className="block h-auto w-full"
                />
              </div>
              <figcaption className="mt-4 text-center text-xs text-muted-foreground">
                {t("A look inside Raja567", "Raja567 ऐप की एक झलक")}
              </figcaption>
            </figure>
          </div>
        </section>
        <section aria-label={t("Download information", "डाउनलोड की जानकारी")} className="border-b">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 text-sm sm:gap-5 sm:px-5 sm:py-7 font-semibold sm:grid-cols-3">
            {[
              { icon: Smartphone, label: t("For Android phones", "Android फ़ोन के लिए") },
              {
                icon: Languages,
                label: t("English & Hindi instructions", "अंग्रेज़ी और हिन्दी में निर्देश"),
              },
              {
                icon: FileDown,
                label: t("Step-by-step installation help", "इंस्टॉल करने के चरणों में मदद"),
              },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-start gap-3 sm:justify-center">
                <Icon aria-hidden className="size-5 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </section>
        <section
          id="installation"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-10 sm:px-5 sm:py-16"
        >
          <p className="text-center text-xs font-bold uppercase tracking-widest text-primary">
            {t("Getting started", "शुरुआत करें")}
          </p>
          <h2 className="mt-3 text-center font-display text-2xl sm:text-3xl">
            {t("Your app, in three simple steps", "तीन आसान चरणों में आपका ऐप")}
          </h2>
          <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, body }, index) => (
              <div key={title} className="rounded-xl border bg-card p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">0{index + 1}</span>
                  <Icon aria-hidden className="size-6 text-primary" />
                </div>
                <h3 className="mt-3 text-lg font-bold sm:mt-6 sm:text-xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 text-center">
            <Link
              to="/download"
              className="inline-flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-primary underline underline-offset-4"
            >
              {t("View the full installation guide", "इंस्टॉल करने के पूरे निर्देश देखें")}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </section>
        <section className="border-y bg-muted">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-14">
            <h2 className="font-display text-2xl sm:text-3xl">
              {t("Before you download", "डाउनलोड करने से पहले")}
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                t(
                  "Use an Android phone. This download is not compatible with iPhone.",
                  "Android फ़ोन का उपयोग करें। यह डाउनलोड iPhone पर काम नहीं करता।",
                ),
                t(
                  "Have a stable internet connection and enough free storage.",
                  "स्थिर इंटरनेट कनेक्शन और पर्याप्त खाली स्टोरेज रखें।",
                ),
                t(
                  "Keep Play Protect enabled and review any installation warnings.",
                  "Play Protect चालू रखें और इंस्टॉल करते समय दिखने वाली चेतावनियाँ पढ़ें।",
                ),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-16">
          <h2 className="font-display text-2xl sm:text-3xl">
            {t("Download questions", "डाउनलोड से जुड़े सवाल")}
          </h2>
          {[
            [
              t("How do I download the app?", "ऐप कैसे डाउनलोड करूँ?"),
              t(
                "Tap Play Now to open the download page. You’ll find the app download and the installation instructions there.",
                "डाउनलोड पेज खोलने के लिए अभी खेलें पर टैप करें। वहाँ ऐप डाउनलोड और इंस्टॉल करने के निर्देश मिलेंगे।",
              ),
            ],
            [
              t("Does it work on iPhone?", "क्या यह iPhone पर चलता है?"),
              t(
                "This download is for Android phones. It cannot be installed on iPhone.",
                "यह डाउनलोड Android फ़ोन के लिए है। इसे iPhone पर इंस्टॉल नहीं कर सकते।",
              ),
            ],
            [
              t("Where is the downloaded file?", "डाउनलोड की गई फ़ाइल कहाँ है?"),
              t(
                "Check Downloads in your browser or open the Downloads folder in your phone’s Files app.",
                "ब्राउज़र में Downloads देखें या फ़ोन के Files ऐप में Downloads फ़ोल्डर खोलें।",
              ),
            ],
            [
              t("Need help installing?", "इंस्टॉल करने में मदद चाहिए?"),
              t(
                "The download page includes step-by-step instructions and answers to common installation questions in English and Hindi.",
                "डाउनलोड पेज पर अंग्रेज़ी और हिन्दी में चरण-दर-चरण निर्देश और इंस्टॉल से जुड़े आम सवालों के जवाब हैं।",
              ),
            ],
          ].map(([question, answer]) => (
            <details key={question} className="border-b py-5">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p>
            </details>
          ))}
        </section>
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-5 sm:py-14 text-center">
            <h2 className="font-display text-2xl sm:text-3xl">
              {t("Get Raja567 on your phone", "अपने फ़ोन पर Raja567 पाएँ")}
            </h2>
            <p className="mt-4 opacity-90">
              {t(
                "Your Android download and installation guide, together in one place.",
                "आपका Android डाउनलोड और इंस्टॉल गाइड, एक ही जगह।",
              )}
            </p>
            <div className="mt-6 w-full rounded-lg bg-background p-2 sm:mt-7 sm:inline-block sm:w-auto">
              <DownloadBtn placement="other" big />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppSupport floating />
    </div>
  );
}
