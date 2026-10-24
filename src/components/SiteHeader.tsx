import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { trackApkDownload, trackDownload, type Placement } from "@/lib/track";
import { APK_URL } from "@/lib/data";
import horizontalLogo from "@/assets/sona-horizontal.png";

export function DownloadBtn({
  placement = "header",
  big = false,
}: {
  placement?: Placement;
  big?: boolean;
}) {
  const { t } = useLanguage();
  const ready = /^https:\/\//.test(APK_URL);
  return (
    <Button
      asChild={ready}
      disabled={!ready}
      size={big ? "lg" : "default"}
      className={
        big
          ? "sona-download h-12 w-full rounded-xl px-6 text-base font-bold sm:h-14 sm:w-auto sm:min-w-64 sm:px-8"
          : "sona-download h-11 rounded-xl font-bold"
      }
    >
      {ready ? (
        <a
          href={APK_URL}
          download
          data-download-placement={placement}
          onClick={() => {
            trackDownload(placement);
            void trackApkDownload().catch(() => undefined);
          }}
        >
          <Download aria-hidden />
          {t("Download App", "ऐप डाउनलोड करें")}
        </a>
      ) : (
        <>
          <Download aria-hidden />
          {t("Download unavailable", "डाउनलोड उपलब्ध नहीं है")}
        </>
      )}
    </Button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const links = [
    { to: "/", label: t("Home", "होम") },
    { to: "/download", label: t("Installation guide", "इंस्टॉल गाइड") },
  ] as const;

  return (
    <header className="sticky top-0 z-20 border-b border-amber-600/15 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:py-3">
        <Link
          to="/"
          aria-label={t("Sona 777 home", "Sona 777 होम")}
          className="flex min-h-11 min-w-0 items-center"
        >
          <img
            src={horizontalLogo}
            alt="Sona 777"
            width={1686}
            height={354}
            className="h-auto w-24 sm:w-36 lg:w-44"
          />
        </Link>
        <nav
          aria-label={t("Main navigation", "मुख्य नेविगेशन")}
          className="hidden gap-6 text-sm font-semibold md:flex"
        >
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="inline-flex min-h-11 items-center hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <div role="group" aria-label="Language / भाषा" className="inline-flex gap-1">
            <Button
              size="sm"
              variant={language === "en" ? "default" : "ghost"}
              aria-pressed={language === "en"}
              aria-label="English"
              onClick={() => setLanguage("en")}
              className="h-11 min-w-11 px-2 shadow-none sm:px-3"
            >
              <span className="sm:hidden">EN</span>
              <span className="hidden sm:inline">English</span>
            </Button>
            <Button
              size="sm"
              variant={language === "hi" ? "default" : "ghost"}
              aria-pressed={language === "hi"}
              onClick={() => setLanguage("hi")}
              className="h-11 min-w-11 px-2 shadow-none sm:px-3"
            >
              हिन्दी
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            aria-label={open ? t("Close menu", "मेन्यू बंद करें") : t("Open menu", "मेन्यू खोलें")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
            className="size-11 shadow-none md:hidden"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label={t("Mobile navigation", "मोबाइल नेविगेशन")}
          className="border-t bg-background px-4 md:hidden"
        >
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className="block border-b py-3 font-semibold last:border-0 hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  const pathname = useLocation().pathname;
  const [showStickyDownload, setShowStickyDownload] = useState(false);

  useEffect(() => {
    setShowStickyDownload(false);
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") return;

    const heroDownload = document.querySelector('[data-download-placement="hero"]');
    if (!heroDownload) return;

    const visibleDownloads = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visibleDownloads.add(entry.target);
        else visibleDownloads.delete(entry.target);
      }

      setShowStickyDownload(
        heroDownload.getBoundingClientRect().bottom <= 0 && visibleDownloads.size === 0,
      );
    });

    document
      .querySelectorAll('[data-download-placement]:not([data-download-placement="sticky_mobile"])')
      .forEach((button) => observer.observe(button));
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <>
      <footer className="border-t border-primary/20 bg-muted px-4 py-8 text-center text-sm leading-relaxed text-muted-foreground sm:py-10">
        <Link to="/" className="inline-flex min-h-11 items-center font-bold text-primary">
          Sona 777
        </Link>
        <p className="mt-2">
          {t(
            "Sona 777 for Android. Installation help in English and Hindi.",
            "Android के लिए Sona 777। इंस्टॉल करने में मदद अंग्रेज़ी और हिन्दी में।",
          )}
        </p>
        <p className="mt-4 text-xs">© 2026 Sona 777.</p>
      </footer>
      {pathname === "/" && (
        <>
          <div className="h-[calc(5rem+env(safe-area-inset-bottom))] md:hidden" />
          <div
            hidden={!showStickyDownload}
            className="fixed inset-x-0 bottom-0 z-30 border-t bg-background px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden [&_a]:h-12 [&_a]:w-full"
          >
            <DownloadBtn placement="sticky_mobile" big />
          </div>
        </>
      )}
    </>
  );
}
