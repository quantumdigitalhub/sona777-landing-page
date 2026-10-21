import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import { trackDownload, type Placement } from "@/lib/track";
import horizontalLogo from "@/assets/raja567-horizontal.png";

export function DownloadBtn({
  placement = "header",
  big = false,
}: {
  placement?: Placement;
  big?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <Button
      asChild
      size={big ? "lg" : "default"}
      className={
        big
          ? "h-12 w-full px-6 text-base font-bold shadow-none sm:h-14 sm:w-auto sm:px-8"
          : "h-11 font-bold shadow-none"
      }
    >
      <Link to="/download" onClick={() => trackDownload(placement)}>
        <Download aria-hidden />
        {t("Play Now", "अभी खेलें")}
      </Link>
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
    <header className="sticky top-0 z-20 border-b border-primary/20 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2 sm:gap-3 sm:py-3">
        <Link
          to="/"
          aria-label={t("Raja567 home", "Raja567 होम")}
          className="flex min-h-11 min-w-0 items-center"
        >
          <img
            src={horizontalLogo}
            alt="Raja567"
            width={2172}
            height={724}
            className="h-auto w-24 sm:w-32 lg:w-36"
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
          <div className="hidden md:block">
            <DownloadBtn />
          </div>
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
  const onDownloadPage = useLocation().pathname === "/download";
  return (
    <>
      <footer className="border-t border-primary/20 bg-muted px-4 py-8 text-center text-sm leading-relaxed text-muted-foreground sm:py-10">
        <Link to="/" className="inline-flex min-h-11 items-center font-bold text-primary">
          Raja567
        </Link>
        <p className="mt-2">
          {t(
            "Raja567 for Android. Installation help in English and Hindi.",
            "Android के लिए Raja567। इंस्टॉल करने में मदद अंग्रेज़ी और हिन्दी में।",
          )}
        </p>
        <p className="mt-4 text-xs">© 2026 Raja567.</p>
      </footer>
      {!onDownloadPage && (
        <>
          <div className="h-[calc(5rem+env(safe-area-inset-bottom))] md:hidden" />
          <div className="fixed inset-x-0 bottom-0 z-30 border-t bg-background px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
            <Button asChild className="h-12 w-full font-bold shadow-none">
              <Link to="/download" onClick={() => trackDownload("sticky_mobile")}>
                <Download aria-hidden />
                {t("Play Now", "अभी खेलें")}
              </Link>
            </Button>
          </div>
        </>
      )}
    </>
  );
}
