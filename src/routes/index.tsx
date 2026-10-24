import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Download, Languages, Smartphone } from "lucide-react";
import heroArtwork from "@/assets/sona_header.png";
import { SiteHeader, SiteFooter, DownloadBtn } from "@/components/SiteHeader";
import { WhatsAppSupport } from "@/components/WhatsAppSupport";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sona 777 App Download | Android Installation Guide" },
      {
        name: "description",
        content:
          "Download the Sona 777 Android app. Find app installation instructions and download help in English and Hindi.",
      },
      { property: "og:title", content: "Download Sona 777 for Android" },
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
      title: t("Download", "डाउनलोड करें"),
      body: t(
        "Tap Download App to get the Android app directly.",
        "Android ऐप सीधे डाउनलोड करने के लिए ऐप डाउनलोड करें पर टैप करें।",
      ),
    },
    {
      title: t("Install", "इंस्टॉल करें"),
      body: t(
        "Open the downloaded file and follow the installation guide.",
        "डाउनलोड की गई फ़ाइल खोलें और इंस्टॉल करने के निर्देश पढ़ें।",
      ),
    },
    {
      title: t("Open Sona 777", "Sona 777 खोलें"),
      body: t(
        "Once installation finishes, open the app from your phone.",
        "इंस्टॉल होने के बाद अपने फ़ोन पर ऐप खोलें।",
      ),
    },
  ];
  const questions = [
    {
      question: t("How do I download the app?", "ऐप कैसे डाउनलोड करूँ?"),
      answer: t(
        "Tap Download App to start the download directly. For help installing, open the installation guide.",
        "सीधे डाउनलोड शुरू करने के लिए ऐप डाउनलोड करें पर टैप करें। इंस्टॉल करने में मदद के लिए इंस्टॉल गाइड खोलें।",
      ),
    },
    {
      question: t("Does it work on iPhone?", "क्या यह iPhone पर चलता है?"),
      answer: t(
        "This download is for Android phones. It cannot be installed on iPhone.",
        "यह डाउनलोड Android फ़ोन के लिए है। इसे iPhone पर इंस्टॉल नहीं कर सकते।",
      ),
    },
    {
      question: t("Where is the downloaded file?", "डाउनलोड की गई फ़ाइल कहाँ है?"),
      answer: t(
        "Check Downloads in your browser or open the Downloads folder in your phone’s Files app.",
        "ब्राउज़र में Downloads देखें या फ़ोन के Files ऐप में Downloads फ़ोल्डर खोलें।",
      ),
    },
    {
      question: t("Need help installing?", "इंस्टॉल करने में मदद चाहिए?"),
      answer: t(
        "The download page includes step-by-step instructions and answers to common installation questions in English and Hindi.",
        "डाउनलोड पेज पर अंग्रेज़ी और हिन्दी में चरण-दर-चरण निर्देश और इंस्टॉल से जुड़े आम सवालों के जवाब हैं।",
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section aria-labelledby="hero-title" className="sona-hero border-b border-amber-600/30">
          <div className="mx-auto grid max-w-6xl items-center gap-x-12 px-4 pt-6 pb-5 text-center sm:px-5 sm:pt-8 md:grid-cols-2 md:grid-rows-[auto_auto] md:py-10 md:text-left">
            <div className="md:col-start-1 md:row-start-1 md:self-end">
              <h1
                id="hero-title"
                className="sona-hero-title font-display text-[clamp(3rem,12vw,4.5rem)] leading-none font-black italic tracking-tight uppercase md:text-[clamp(4rem,7vw,6.5rem)]"
              >
                Sona777
              </h1>
              <p className="mt-2 font-display text-xl leading-tight italic sm:text-3xl">
                {t("Your markets.", "आपके मार्केट।")}{" "}
                <span className="text-primary">{t("Your game.", "आपका खेल।")}</span>
              </p>
            </div>
            <div className="relative mx-auto mt-3 w-full max-w-56 md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:max-w-80">
              <div
                aria-hidden
                className="absolute inset-x-0 top-1/4 bottom-0 rounded-full bg-amber-300/25 blur-3xl"
              />
              <img
                src={heroArtwork}
                alt={t("Sona 777", "Sona 777")}
                width={376}
                height={432}
                fetchPriority="high"
                className="relative block h-auto w-full drop-shadow-xl"
              />
            </div>
            <div className="mt-4 flex justify-center md:col-start-1 md:row-start-2 md:mt-6 md:self-start md:justify-start">
              <DownloadBtn placement="hero" big />
            </div>
          </div>
        </section>

        <div className="border-b border-amber-600/15 bg-[#fffcf5]">
          <ul className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-4 py-4 sm:px-5 sm:py-5">
            {[
              { icon: Smartphone, label: t("All your markets", "आपके सभी मार्केट") },
              { icon: Download, label: t("Easy installation", "आसान इंस्टॉलेशन") },
              { icon: Languages, label: t("English & Hindi", "अंग्रेज़ी और हिन्दी") },
            ].map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center justify-center gap-2 text-center text-xs font-semibold sm:flex-row sm:gap-3 sm:text-sm"
              >
                <Icon aria-hidden className="size-5 shrink-0 text-amber-700" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <section
          id="installation"
          aria-labelledby="installation-title"
          className="mx-auto max-w-6xl scroll-mt-24 px-4 py-8 sm:px-5 sm:py-10"
        >
          <div className="grid gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                {t("Getting started", "शुरुआत करें")}
              </p>
              <h2
                id="installation-title"
                className="mt-2 font-display text-2xl tracking-tight sm:text-3xl"
              >
                {t("Ready in three steps", "तीन आसान चरणों में तैयार")}
              </h2>
              <ol className="mt-5 grid divide-y border-y md:grid-cols-3 md:divide-x md:divide-y-0">
                {steps.map(({ title, body }, index) => (
                  <li
                    key={title}
                    className="flex items-start gap-3 py-4 md:px-5 md:first:pl-0 md:last:pr-0"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-base font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                to="/download"
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline hover:underline-offset-4"
              >
                {t("Full installation guide", "इंस्टॉल करने के पूरे निर्देश")}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <div className="border-t">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-5 sm:py-10 md:grid-cols-[1fr_280px] md:gap-12 lg:grid-cols-[1fr_320px]">
            <section aria-labelledby="questions-title">
              <h2 id="questions-title" className="font-display text-xl sm:text-2xl">
                {t("A little help", "कुछ ज़रूरी जवाब")}
              </h2>
              <div className="mt-3 divide-y">
                {questions.map(({ question, answer }) => (
                  <details key={question} className="group py-4">
                    <summary className="cursor-pointer text-sm font-semibold hover:text-primary">
                      {question}
                    </summary>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
            <aside
              aria-labelledby="requirements-title"
              className="self-start rounded-xl bg-muted/60 p-5"
            >
              <h2 id="requirements-title" className="text-sm font-bold">
                {t("Before you download", "डाउनलोड करने से पहले")}
              </h2>
              <ul className="mt-4 space-y-4">
                {[
                  t(
                    "An Android phone. This app does not work on iPhone.",
                    "Android फ़ोन। यह ऐप iPhone पर काम नहीं करता।",
                  ),
                  t(
                    "A stable connection and enough free storage.",
                    "स्थिर इंटरनेट कनेक्शन और पर्याप्त खाली स्टोरेज।",
                  ),
                  t(
                    "Keep Play Protect enabled and review installation warnings.",
                    "Play Protect चालू रखें और इंस्टॉल करते समय दिखने वाली चेतावनियाँ पढ़ें।",
                  ),
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                  >
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <section className="border-t bg-muted/60">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-lg font-bold">{t("Ready to play?", "खेलने के लिए तैयार?")}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("Get Sona 777 for Android.", "Android के लिए Sona 777 पाएँ।")}
              </p>
            </div>
            <DownloadBtn placement="other" />
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppSupport floating />
    </div>
  );
}
