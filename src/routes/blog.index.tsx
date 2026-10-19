import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { posts } from "@/lib/data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Matka Blog – Matka History, Charts & Guides | Raja567" },
      { name: "description", content: "Read about matka history, Kalyan and Main Bazar markets, and how to read jodi and panel charts." },
      { property: "og:title", content: "Matka Blog – Raja567" },
      { property: "og:description", content: "Matka history, market guides and chart tips." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BlogList,
});

function BlogList() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="mb-6 font-display text-3xl">Matka Blog</h1>
        <div className="divide-y rounded-md border bg-card">
          {posts.map((p) => (
            <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="block p-4 hover:bg-muted">
              <div className="text-xs text-muted-foreground">{p.date}</div>
              <h2 className="font-bold">{p.title}</h2>
              <p className="text-sm text-muted-foreground">{p.description}</p>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
