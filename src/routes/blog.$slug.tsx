import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { posts } from "@/lib/data";
import { useLanguage } from "@/lib/language";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} | Raja567` },
        { name: "description", content: post.description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="p-10 text-center">
      Post not found.{" "}
      <Link to="/blog" className="text-primary underline">
        Blog
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const { language, t } = useLanguage();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link to="/blog" className="text-sm font-semibold text-muted-foreground">
          {t("← All guides", "← सभी गाइड")}
        </Link>
        <h1 className="mt-2 font-display text-3xl">{t(post.title, post.titleHi)}</h1>
        <p className="my-6 text-muted-foreground">{t(post.description, post.descriptionHi)}</p>
        {(language === "hi" ? post.bodyHi : post.body).map((p, i) => (
          <p key={i} className="mb-4 leading-relaxed">
            {p}
          </p>
        ))}
        <Link to="/blog" className="mt-8 inline-block font-semibold text-primary underline">
          {t("Explore more guides →", "और गाइड पढ़ें →")}
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
