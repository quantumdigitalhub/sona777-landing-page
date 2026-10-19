import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader, SiteFooter, DownloadBtn } from "@/components/SiteHeader";
import { posts } from "@/lib/data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
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
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: post.title, datePublished: post.date }),
      }],
    };
  },
  notFoundComponent: () => <div className="p-10 text-center">Post not found. <Link to="/blog" className="text-primary underline">Blog</Link></div>,
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link to="/blog" className="text-sm font-semibold text-muted-foreground">← Blog</Link>
        <h1 className="mt-2 font-display text-3xl">{post.title}</h1>
        <p className="mb-6 text-xs text-muted-foreground">{post.date}</p>
        {post.body.map((p, i) => <p key={i} className="mb-4 leading-relaxed">{p}</p>)}
        <div className="mt-8 flex flex-wrap gap-3 rounded-md border p-4">
          <DownloadBtn />
          <Link to="/charts" className="rounded-md border px-5 py-3 font-bold">View Charts</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
