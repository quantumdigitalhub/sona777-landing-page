import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, Globe, Sparkles } from "lucide-react";
import stackedLogo from "@/assets/raja567-stacked.png";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/data";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Raja567 | Everyday Digital Guides" },
      {
        name: "description",
        content:
          "Explore practical guides for everyday digital life, available in English and Hindi.",
      },
      { property: "og:title", content: "Raja567 | Everyday Digital Guides" },
      {
        property: "og:description",
        content: "Simple ideas for a more thoughtful digital routine. Read in English or Hindi.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useLanguage();
  const features = [
    {
      icon: BookOpen,
      title: t("Useful, everyday ideas", "रोज़मर्रा के उपयोगी सुझाव"),
      body: t(
        "Short reads with steps you can try at your own pace.",
        "छोटे लेख और आसान कदम जिन्हें आप अपनी सुविधा से आज़मा सकते हैं।",
      ),
    },
    {
      icon: Globe,
      title: t("Read in your language", "अपनी भाषा में पढ़ें"),
      body: t(
        "Switch between English and Hindi on any page.",
        "किसी भी पेज पर अंग्रेज़ी और हिन्दी के बीच भाषा बदलें।",
      ),
    },
    {
      icon: Sparkles,
      title: t("A simpler routine", "आसान दिनचर्या"),
      body: t(
        "Find a little more clarity in your everyday digital life.",
        "अपनी रोज़मर्रा की डिजिटल ज़िंदगी को थोड़ा आसान बनाएँ।",
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="overflow-hidden border-b border-gold/30 bg-linear-to-br from-background via-muted to-accent/50">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 text-center md:grid-cols-2 md:py-24 md:text-left">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                {t("Welcome to Raja567", "Raja567 में आपका स्वागत है")}
              </p>
              <h1 className="font-display text-5xl leading-tight tracking-tight sm:text-6xl">
                {t("Small ideas.", "छोटे सुझाव।")}
                <br />
                <span className="text-primary">
                  {t("Everyday possibilities.", "हर दिन नई संभावनाएँ।")}
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted-foreground md:mx-0">
                {t(
                  "Make room for a simpler digital life. Explore practical guides, thoughtful habits and useful ideas in English and Hindi.",
                  "डिजिटल ज़िंदगी को आसान बनाएँ। अंग्रेज़ी और हिन्दी में उपयोगी गाइड, अच्छी आदतें और सरल सुझाव पढ़ें।",
                )}
              </p>
              <Button asChild size="lg" className="mt-7 shadow-none">
                <Link to="/blog">
                  {t("Explore the guides", "गाइड पढ़ें")}
                  <ArrowUpRight aria-hidden />
                </Link>
              </Button>
            </div>
            <div className="mx-auto flex aspect-square w-full max-w-sm items-center justify-center rounded-full border border-gold/30 bg-background/60 p-10">
              <img
                src={stackedLogo}
                alt="Raja567"
                width={1236}
                height={1273}
                fetchPriority="high"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>
        <section
          aria-label={t("About our guides", "हमारी गाइड के बारे में")}
          className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3"
        >
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon aria-hidden className="mb-4 size-6 text-primary" />
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </section>
        <section className="border-y bg-muted">
          <div className="mx-auto max-w-6xl px-5 py-14">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              {t("A little inspiration", "थोड़ी प्रेरणा")}
            </p>
            <h2 className="mt-2 font-display text-3xl">
              {t("Start with something useful", "कुछ उपयोगी पढ़कर शुरुआत करें")}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="rounded-md border bg-card p-6 transition-colors hover:border-primary"
                >
                  <BookOpen aria-hidden className="mb-6 size-5 text-primary" />
                  <h3 className="text-lg font-bold">{t(post.title, post.titleHi)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(post.description, post.descriptionHi)}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    {t("Read guide", "गाइड पढ़ें")}
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-3xl px-5 py-14">
          <h2 className="font-display text-3xl">{t("Good to know", "ज़रूरी जानकारी")}</h2>
          {[
            [
              t("Do I need an account?", "क्या अकाउंट की ज़रूरत है?"),
              t(
                "No. All guides on this website are free to read without signing up.",
                "नहीं। इस वेबसाइट की सभी गाइड बिना रजिस्ट्रेशन के मुफ़्त पढ़ सकते हैं।",
              ),
            ],
            [
              t("Can I read in Hindi?", "क्या मैं हिन्दी में पढ़ सकता हूँ?"),
              t(
                "Yes. Use the language selector at the top of any page. Your choice is saved in this browser when storage is available.",
                "हाँ। किसी भी पेज के ऊपर भाषा चुनें। ब्राउज़र में स्टोरेज उपलब्ध होने पर आपकी पसंद सहेजी जाती है।",
              ),
            ],
          ].map(([question, answer]) => (
            <details key={question} className="border-b py-5">
              <summary className="cursor-pointer font-semibold">{question}</summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p>
            </details>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
