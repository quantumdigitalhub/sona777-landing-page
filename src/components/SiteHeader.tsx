import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { useLanguage } from "@/lib/language";
import { trackDownload } from "@/lib/track";
import { Button } from "@/components/ui/button";
import { Download, Menu, X } from "lucide-react";
import horizontalLogo from "@/assets/sona-horizontal.png";
import verticalLogo from "@/assets/sona-vertical.png";

export function DownloadBtn({ big = false }: { big?: boolean }) {
  const { t } = useLanguage();
  return (
    <Button asChild className={`shadow-none font-bold ${big ? "h-12 px-8 text-base" : "h-10 px-4 text-sm"}`}>
    <Link
      to="/download"
      onClick={() => trackDownload(big ? "hero" : "header")}
    >
      <Download aria-hidden /> {t("Download App", "ऐप डाउनलोड करें")}
    </Link>
    </Button>
  );
}

const links = [
  { to: "/charts", label: "Market Charts" },
  { to: "/", label: "Today's Results" },
  { to: "/blog", label: "Matka Blog" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const label = (value: string) => value === "Market Charts" ? t(value, "मार्केट चार्ट") : value === "Today's Results" ? t(value, "आज के परिणाम") : t(value, "मटका ब्लॉग");
  return (
    <header className="sticky top-0 z-20 border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="shrink-0 shadow-none"
          >
            {open ? <X /> : <Menu />}
          </Button>
          <Link to="/" aria-label="Sona 777 home" className="block min-w-0 shrink">
            <img src={horizontalLogo} alt="Sona 777" width={1686} height={354} className="h-auto w-32 max-w-full sm:w-44" />
          </Link>
        </div>
        <nav className="hidden gap-6 text-sm font-semibold md:flex">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="hover:text-primary">{label(l.label)}</Link>
          ))}
        </nav>
        <DownloadBtn />
      </div>
      <div className="mx-auto flex max-w-6xl justify-end px-3 pb-2 sm:px-4">
        <div role="group" aria-label="Language / भाषा" className="inline-flex gap-1">
          <Button size="sm" variant={language === "en" ? "default" : "ghost"} aria-pressed={language === "en"} onClick={() => setLanguage("en")} className="h-7 shadow-none">English</Button>
          <Button size="sm" variant={language === "hi" ? "default" : "ghost"} aria-pressed={language === "hi"} onClick={() => setLanguage("hi")} className="h-7 shadow-none">हिन्दी</Button>
        </div>
      </div>
      {open && (
        <nav className="border-t bg-background">
          <div className="mx-auto max-w-6xl px-4 py-2">
            {links.map((l) => (
              <Link key={l.label} to={l.to} onClick={() => setOpen(false)} className="block border-b py-3 font-semibold last:border-0 hover:text-primary">
                {label(l.label)}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  const onDownloadPage = useLocation().pathname === "/download";
  return (
    <>
      <footer className="border-t bg-background px-4 py-8 text-center text-xs text-muted-foreground">
        <Link to="/" aria-label="Sona 777 home" className="mx-auto mb-5 block w-28">
          <img src={verticalLogo} alt="Sona 777" width={1187} height={1119} className="h-auto w-full" />
        </Link>
        <p>© 2026 Sona 777. For 18+ only. Play responsibly. This game involves financial risk.</p>
      </footer>
      {!onDownloadPage && <><div className="h-16 md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background p-3 md:hidden">
        <Button asChild className="h-12 w-full shadow-none"><Link to="/download" onClick={() => trackDownload("sticky_mobile")}><Download />{t("Download App – Free", "ऐप डाउनलोड करें – मुफ़्त")}</Link></Button>
      </div></>}
    </>
  );
}
