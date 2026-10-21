import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { WHATSAPP_SUPPORT_URL } from "@/lib/data";
import { useLanguage } from "@/lib/language";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5h.1c6.6 0 11.9-5.4 11.9-12 0-3.2-1.2-6.2-3.5-8.4ZM12 21.9c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4A9.9 9.9 0 0 1 2 12C2 6.5 6.5 2 12 2c2.6 0 5.1 1 7 2.9a9.9 9.9 0 0 1 3 7.1c0 5.5-4.5 9.9-10 9.9Zm5.5-7.4c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-1 1.2c-.2.2-.4.2-.7.1-1.6-.8-2.7-1.4-3.8-3.3-.3-.5.3-.5.8-1.5.1-.2.1-.4 0-.6L9 7c-.2-.6-.5-.5-.7-.5H7.7c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.3 3.1c.1.2 2.2 3.4 5.3 4.7 2 .8 2.8.9 3.8.7.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" />
    </svg>
  );
}

export function WhatsAppSupport({ floating = false }: { floating?: boolean }) {
  const { t } = useLanguage();
  const label = t("WhatsApp support", "WhatsApp सहायता");
  const className = floating
    ? "fixed right-4 bottom-[calc(6rem+env(safe-area-inset-bottom))] z-40 size-12 rounded-full bg-success text-background shadow-none hover:bg-success/90 md:bottom-6 [&_svg]:size-6"
    : "h-11 w-full sm:w-auto bg-success text-background shadow-none hover:bg-success/90";
  const ready = /^https:\/\/(wa\.me|api\.whatsapp\.com|www\.whatsapp\.com)\//.test(
    WHATSAPP_SUPPORT_URL,
  );
  const contents = (
    <>
      <WhatsAppIcon />
      {!floating && label}
    </>
  );

  if (ready)
    return (
      <Button asChild className={className}>
        <a
          href={WHATSAPP_SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
        >
          {contents}
        </a>
      </Button>
    );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className} aria-label={label} title={label}>
          {contents}
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top" align="end" className="max-w-[calc(100vw-2rem)] shadow-none">
        <p className="font-bold">
          {t("WhatsApp support coming soon", "WhatsApp सहायता जल्द उपलब्ध होगी")}
        </p>
        <p role="status" className="mt-2 text-sm text-muted-foreground">
          {t(
            "The support contact hasn’t been added yet. Please check back later.",
            "सहायता संपर्क अभी जोड़ा नहीं गया है। कृपया बाद में दोबारा देखें।",
          )}
        </p>
      </PopoverContent>
    </Popover>
  );
}
