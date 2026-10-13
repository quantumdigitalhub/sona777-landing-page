import { createFileRoute, Link } from "@tanstack/react-router";
import { Copy, Download, FileDown, FolderOpen, Settings, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { APK_URL } from "@/lib/data";
import { useLanguage } from "@/lib/language";
import { WhatsAppSupport } from "@/components/WhatsAppSupport";
import { getDownloadClickId, trackApkDownload } from "@/lib/track";

export const Route = createFileRoute("/download")({
  head: () => ({ meta: [
    { title: "Install Sona 777 APK on Android | Hindi & English Guide" },
    { name: "description", content: "Step-by-step Sona 777 APK installation instructions for Android in Hindi and English, with download and installation help." },
    { property: "og:title", content: "Sona 777 Android Installation Guide" },
    { property: "og:description", content: "Download and install the Sona 777 APK with Hindi and English instructions." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: DownloadPage,
});

function DownloadPage() {
  const { t } = useLanguage();
  const ready = /^https:\/\//.test(APK_URL);
  const [reference, setReference] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { setReference(getDownloadClickId()); }, []);
  const steps = [
    { icon: FileDown, title: t("Download the APK", "APK डाउनलोड करें"), body: t("Tap Download App above and wait until the file finishes downloading. Only use a source you trust.", "ऊपर ऐप डाउनलोड करें पर टैप करें और फ़ाइल का डाउनलोड पूरा होने दें। केवल भरोसेमंद स्रोत का उपयोग करें।") },
    { icon: FolderOpen, title: t("Open the downloaded file", "डाउनलोड की गई फ़ाइल खोलें"), body: t("Open your browser’s Downloads or your phone’s Files app → Downloads, then tap the APK file.", "ब्राउज़र में Downloads या फ़ोन के Files ऐप → Downloads खोलें, फिर APK फ़ाइल पर टैप करें।") },
    { icon: Settings, title: t("Allow this installation, if prompted", "पूछे जाने पर इंस्टॉल करने की अनुमति दें"), body: t("Android may ask for permission to install from this source. Open Settings and enable ‘Allow from this source’ only for the browser or Files app you used. Names vary by phone.", "Android इस स्रोत से इंस्टॉल करने की अनुमति माँग सकता है। Settings खोलें और केवल इस्तेमाल किए गए ब्राउज़र या Files ऐप के लिए ‘Allow from this source’ चालू करें। फ़ोन के अनुसार नाम अलग हो सकते हैं।") },
    { icon: ShieldCheck, title: t("Install, then restore the setting", "इंस्टॉल करें, फिर अनुमति बंद करें"), body: t("Return to the installer and tap Install, then Open. Afterwards, turn ‘Allow from this source’ off again. Keep Play Protect enabled; if Android flags the file as unsafe, stop instead of bypassing the warning.", "इंस्टॉलर पर लौटें और Install, फिर Open पर टैप करें। बाद में ‘Allow from this source’ फिर बंद कर दें। Play Protect चालू रखें; फ़ाइल असुरक्षित बताई जाए तो चेतावनी को नज़रअंदाज़ न करें।") },
  ];
  return <div className="min-h-screen"><SiteHeader /><main className="mx-auto max-w-3xl px-4 py-10">
    <Link to="/" className="text-sm font-semibold text-primary">{t("← Back to home", "← होम पर वापस जाएँ")}</Link>
    <p className="mt-8 text-sm font-semibold text-primary">{t("Android installation", "Android इंस्टॉलेशन")}</p>
    <h1 className="mt-2 font-display text-3xl">{t("Install Sona 777", "Sona 777 इंस्टॉल करें")}</h1>
    <p className="mt-3 text-muted-foreground">{t("Follow these steps to install the APK on your Android phone. APK files do not work on iPhone.", "अपने Android फ़ोन पर APK इंस्टॉल करने के लिए नीचे दिए चरणों का पालन करें। APK फ़ाइलें iPhone पर नहीं चलतीं।")}</p>
    <div className="my-6">
      {ready ? <Button asChild size="lg" className="shadow-none"><a href={APK_URL} onClick={(event) => { event.preventDefault(); void Promise.race([trackApkDownload().catch(() => undefined), new Promise(resolve => setTimeout(resolve, 1500))]).finally(() => { window.location.assign(APK_URL); }); }}><Download />{t("Download App", "ऐप डाउनलोड करें")}</a></Button> : <><Button size="lg" disabled className="shadow-none"><Download />{t("Download not available yet", "डाउनलोड अभी उपलब्ध नहीं है")}</Button><p role="status" className="mt-3 text-sm text-muted-foreground">{t("The download file has not been added yet. Installation instructions are available below.", "डाउनलोड फ़ाइल अभी जोड़ी नहीं गई है। इंस्टॉल करने के निर्देश नीचे उपलब्ध हैं।")}</p></>}
      {ready && reference && <div className="mt-4 border-t pt-4"><p className="text-sm font-semibold">{t("Installation reference", "इंस्टॉलेशन रेफ़रेंस")}</p><div className="mt-2 flex items-center gap-2"><code className="min-w-0 break-all text-xs text-muted-foreground">{reference}</code><Button variant="outline" size="icon" aria-label={t("Copy installation reference", "इंस्टॉलेशन रेफ़रेंस कॉपी करें")} onClick={() => { void navigator.clipboard.writeText(reference).then(() => setCopied(true)).catch(() => setCopied(false)); }}><Copy /></Button></div><p role="status" className="mt-2 text-sm text-muted-foreground">{copied ? t("Copied. Enter this only if the app asks for an installation reference.", "कॉपी हो गया। ऐप इंस्टॉलेशन रेफ़रेंस माँगे तभी इसे दर्ज करें।") : t("Keep this reference if the app asks for it after installation.", "इंस्टॉल करने के बाद ऐप माँगे तो यह रेफ़रेंस दर्ज करें।")}</p></div>}
    </div>
    <h2 className="mt-10 text-xl font-bold">{t("How to install", "इंस्टॉल कैसे करें")}</h2>
    <ol className="mt-3 divide-y">{steps.map(({ icon: Icon, title, body }, i) => <li key={i} className="flex gap-4 py-6"><span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-accent font-bold text-primary">{i + 1}</span><div className="min-w-0"><h3 className="flex items-center gap-2 font-bold"><Icon className="size-4 shrink-0 text-primary" />{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p></div></li>)}</ol>
    <section className="mt-8 border-t pt-6"><h2 className="text-xl font-bold">{t("Installation help", "इंस्टॉल करने में मदद")}</h2><div className="my-4"><WhatsAppSupport /><p className="mt-2 text-sm text-muted-foreground">{t("WhatsApp support will be available once the contact is added.", "संपर्क जुड़ने के बाद WhatsApp सहायता उपलब्ध होगी।")}</p></div>{[
      [t("Can’t find the file?", "फ़ाइल नहीं मिल रही?"), t("Check Downloads in your browser or Files app. If the download is incomplete, retry when your connection is stable.", "ब्राउज़र या Files ऐप में Downloads देखें। डाउनलोड अधूरा हो तो स्थिर इंटरनेट कनेक्शन पर दोबारा कोशिश करें।")],
      [t("‘App not installed’ message?", "‘App not installed’ दिख रहा है?"), t("Check free storage and download the complete file again. An existing app version can also conflict. Do not uninstall it unless your account and data are safely recoverable.", "खाली स्टोरेज जाँचें और पूरी फ़ाइल दोबारा डाउनलोड करें। पहले से मौजूद ऐप संस्करण भी समस्या बना सकता है। अकाउंट और डेटा सुरक्षित रूप से वापस मिल सकें, तभी पुराना ऐप हटाएँ।")],
    ].map(([q, a]) => <details key={q} className="border-b py-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 text-sm text-muted-foreground">{a}</p></details>)}</section>
  </main><SiteFooter /></div>;
}