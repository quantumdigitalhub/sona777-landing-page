import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { Button } from "@/components/ui/button";
import horizontalLogo from "@/assets/raja567-horizontal.png";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const links = [
    { to: "/", label: t("Home", "होम") },
    { to: "/blog", label: t("Digital guides", "डिजिटल गाइड") },
  ] as const;

  return (
    <header className="sticky top-0 z-20 border-b border-gold/30 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" aria-label={t("Raja567 home", "Raja567 होम")}>
          <img
            src={horizontalLogo}
            alt="Raja567"
            width={2172}
            height={724}
            className="h-auto w-32 sm:w-44"
          />
        </Link>
        <nav
          aria-label={t("Main navigation", "मुख्य नेविगेशन")}
          className="hidden gap-6 text-sm font-semibold md:flex"
        >
          {links.map(({ to, label }) => (
            <Link key={to} to={to} className="hover:text-primary">
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div role="group" aria-label="Language / भाषा" className="inline-flex gap-1">
            <Button
              size="sm"
              variant={language === "en" ? "default" : "ghost"}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
              className="shadow-none"
            >
              English
            </Button>
            <Button
              size="sm"
              variant={language === "hi" ? "default" : "ghost"}
              aria-pressed={language === "hi"}
              onClick={() => setLanguage("hi")}
              className="shadow-none"
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
            className="shadow-none md:hidden"
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
  return (
    <footer className="border-t border-gold/30 bg-muted px-4 py-10 text-center text-sm text-muted-foreground">
      <Link to="/" className="font-bold text-primary">
        Raja567
      </Link>
      <p className="mt-2">
        {t(
          "Practical guides for everyday digital life.",
          "रोज़मर्रा की डिजिटल ज़िंदगी के लिए उपयोगी गाइड।",
        )}
      </p>
      <p className="mt-4 text-xs">© 2026 Raja567.</p>
    </footer>
  );
}
