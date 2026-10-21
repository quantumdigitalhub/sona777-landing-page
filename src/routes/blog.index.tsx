import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { posts } from "@/lib/data";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Digital Guides | Raja567" },
      {
        name: "description",
        content:
          "Practical ideas for organizing digital files, managing notifications and reading thoughtfully online. Available in English and Hindi.",
      },
      { property: "og:title", content: "Digital Guides | Raja567" },
      {
        property: "og:description",
        content: "Practical guides for everyday digital life in English and Hindi.",
      },
    ],
  }),
  component: BlogList,
});

function BlogList() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl">{t("Digital guides", "डिजिटल गाइड")}</h1>
        <p className="mt-3 text-muted-foreground">
          {t(
            "Small steps for a more thoughtful digital routine.",
            "बेहतर डिजिटल दिनचर्या के लिए छोटे कदम।",
          )}
        </p>
        <div className="mt-8 divide-y rounded-md border bg-card">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="block p-6 hover:bg-muted"
            >
              <h2 className="text-lg font-bold">{t(post.title, post.titleHi)}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t(post.description, post.descriptionHi)}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
