import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Download, FileDown, FolderOpen, Settings, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { APK_URL } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { WhatsAppSupport } from "@/components/WhatsAppSupport";
import { getDownloadClickId, trackApkDownload, trackDownload } from "@/lib/track";

function startApkDownload() {
  void Promise.race([
    trackApkDownload().catch(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, 1500)),
  ]).then(() => window.location.assign(APK_URL));
}

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: "Install Raja567 app on Android | Hindi & English Guide" },
      {
        name: "description",
        content:
          "Step-by-step Raja567 app installation instructions for Android in Hindi and English, with download and installation help.",
      },
      { property: "og:title", content: "Raja567 Android Installation Guide" },
      {
        property: "og:description",
        content: "Download and install the Raja567 app with Hindi and English instructions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  const { t } = useLanguage();
  const ready = /^https:\/\//.test(APK_URL);
  const [reference, setReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const downloadStarted = useRef(false);
  useEffect(() => {
    if (!ready || downloadStarted.current) return;
    downloadStarted.current = true;
    if (!getDownloadClickId()) trackDownload("other");
    setReference(getDownloadClickId());
    startApkDownload();
  }, [ready]);
  const steps = [
    {
      icon: FileDown,
      title: t("Download the app", "ऐप डाउनलोड करें"),
      body: t(
        "The download starts automatically. If it doesn’t, tap Play Now above. Wait until the file finishes downloading. Only use a source you trust.",
        "डाउनलोड अपने आप शुरू होता है। शुरू न हो तो ऊपर अभी खेलें पर टैप करें। फ़ाइल का डाउनलोड पूरा होने दें। केवल भरोसेमंद स्रोत का उपयोग करें।",
      ),
    },
    {
      icon: FolderOpen,
      title: t("Open the downloaded file", "डाउनलोड की गई फ़ाइल खोलें"),
      body: t(
        "Open your browser’s Downloads or your phone’s Files app → Downloads, then tap the downloaded file.",
        "ब्राउज़र में Downloads या फ़ोन के Files ऐप → Downloads खोलें, फिर डाउनलोड की गई फ़ाइल पर टैप करें।",
      ),
    },
    {
      icon: Settings,
      title: t("Allow this installation, if prompted", "पूछे जाने पर इंस्टॉल करने की अनुमति दें"),
      body: t(
        "Android may ask for permission to install from this source. Open Settings and enable ‘Allow from this source’ only for the browser or Files app you used. Names vary by phone.",
        "Android इस स्रोत से इंस्टॉल करने की अनुमति माँग सकता है। Settings खोलें और केवल इस्तेमाल किए गए ब्राउज़र या Files ऐप के लिए ‘Allow from this source’ चालू करें। फ़ोन के अनुसार नाम अलग हो सकते हैं।",
      ),
    },
    {
      icon: ShieldCheck,
      title: t("Install, then restore the setting", "इंस्टॉल करें, फिर अनुमति बंद करें"),
      body: t(
        "Return to the installer and tap Install, then Open. Afterwards, turn ‘Allow from this source’ off again. Keep Play Protect enabled; if Android flags the file as unsafe, stop instead of bypassing the warning.",
        "इंस्टॉलर पर लौटें और Install, फिर Open पर टैप करें। बाद में ‘Allow from this source’ फिर बंद कर दें। Play Protect चालू रखें; फ़ाइल असुरक्षित बताई जाए तो चेतावनी को नज़रअंदाज़ न करें।",
      ),
    },
  ];
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center text-sm font-semibold text-primary"
        >
          {t("← Back to home", "← होम पर वापस जाएँ")}
        </Link>
        <p className="mt-4 text-sm sm:mt-8 font-semibold text-primary">
          {t("Android installation", "Android इंस्टॉलेशन")}
        </p>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl">
          {t("Install Raja567", "Raja567 इंस्टॉल करें")}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {t(
            "Follow these steps to install the app on your Android phone. This download does not work on iPhone.",
            "अपने Android फ़ोन पर ऐप इंस्टॉल करने के लिए नीचे दिए चरणों का पालन करें। यह डाउनलोड iPhone पर काम नहीं करता।",
          )}
        </p>
        <div className="my-6">
          {ready ? (
            <>
              <p role="status" className="mb-3 text-sm text-muted-foreground">
                {t(
                  "Your download should start automatically. If it doesn’t, tap Play Now below.",
                  "आपका डाउनलोड अपने आप शुरू होना चाहिए। शुरू न हो तो नीचे अभी खेलें पर टैप करें।",
                )}
              </p>
              <Button asChild size="lg" className="h-12 w-full shadow-none sm:w-auto">
                <a
                  href={APK_URL}
                  onClick={(event) => {
                    event.preventDefault();
                    startApkDownload();
                  }}
                >
                  <Download />
                  {t("Play Now", "अभी खेलें")}
                </a>
              </Button>
            </>
          ) : (
            <>
              <Button size="lg" disabled className="shadow-none">
                <Download />
                {t("Download not available yet", "डाउनलोड अभी उपलब्ध नहीं है")}
              </Button>
              <p role="status" className="mt-3 text-sm text-muted-foreground">
                {t(
                  "The download file has not been added yet. Installation instructions are available below.",
                  "डाउनलोड फ़ाइल अभी जोड़ी नहीं गई है। इंस्टॉल करने के निर्देश नीचे उपलब्ध हैं।",
                )}
              </p>
            </>
          )}
          {ready && reference && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm font-semibold">
                {t("Installation reference", "इंस्टॉलेशन रेफ़रेंस")}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="min-w-0 flex-1 break-all text-xs text-muted-foreground">
                  {reference}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={t("Copy installation reference", "इंस्टॉलेशन रेफ़रेंस कॉपी करें")}
                  className="size-11 shrink-0"
                  onClick={() => {
                    void navigator.clipboard
                      .writeText(reference)
                      .then(() => setCopied(true))
                      .catch(() => setCopied(false));
                  }}
                >
                  <Copy />
                </Button>
              </div>
              <p role="status" className="mt-2 text-sm text-muted-foreground">
                {copied
                  ? t(
                      "Copied. Enter this only if the app asks for an installation reference.",
                      "कॉपी हो गया। ऐप इंस्टॉलेशन रेफ़रेंस माँगे तभी इसे दर्ज करें।",
                    )
                  : t(
                      "Keep this reference if the app asks for it after installation.",
                      "इंस्टॉल करने के बाद ऐप माँगे तो यह रेफ़रेंस दर्ज करें।",
                    )}
              </p>
            </div>
          )}
        </div>
        <h2 className="mt-10 text-xl font-bold">{t("How to install", "इंस्टॉल कैसे करें")}</h2>
        <ol className="mt-3 divide-y">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={i} className="flex gap-3 py-5 sm:gap-4 sm:py-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-accent font-bold text-primary">
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="flex items-center gap-2 font-bold">
                  <Icon className="size-4 shrink-0 text-primary" />
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </li>
          ))}
        </ol>
        <section className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold">{t("Installation help", "इंस्टॉल करने में मदद")}</h2>
          <div className="my-4">
            <WhatsAppSupport />
            <p className="mt-2 text-sm text-muted-foreground">
              {t(
                "Contact Raja567 on WhatsApp for installation help.",
                "इंस्टॉल करने में मदद के लिए Raja567 से WhatsApp पर संपर्क करें।",
              )}
            </p>
          </div>
          {[
            [
              t("Can’t find the file?", "फ़ाइल नहीं मिल रही?"),
              t(
                "Check Downloads in your browser or Files app. If the download is incomplete, retry when your connection is stable.",
                "ब्राउज़र या Files ऐप में Downloads देखें। डाउनलोड अधूरा हो तो स्थिर इंटरनेट कनेक्शन पर दोबारा कोशिश करें।",
              ),
            ],
            [
              t("‘App not installed’ message?", "‘App not installed’ दिख रहा है?"),
              t(
                "Check free storage and download the complete file again. An existing app version can also conflict. Do not uninstall it unless your account and data are safely recoverable.",
                "खाली स्टोरेज जाँचें और पूरी फ़ाइल दोबारा डाउनलोड करें। पहले से मौजूद ऐप संस्करण भी समस्या बना सकता है। अकाउंट और डेटा सुरक्षित रूप से वापस मिल सकें, तभी पुराना ऐप हटाएँ।",
              ),
            ],
          ].map(([q, a]) => (
            <details key={q} className="border-b py-2">
              <summary className="min-h-11 cursor-pointer content-center py-2 font-semibold">
                {q}
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{a}</p>
            </details>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
