import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { posts } from "@/lib/data";

function makeRouter() {
  return createRouter({ routeTree, context: { queryClient: new QueryClient() } });
}

describe("Informational variant routing", () => {
  it("matches the homepage and guide pages", () => {
    const router = makeRouter();
    expect(router.matchRoutes("/").at(-1)?.routeId).toBe("/");
    expect(router.matchRoutes("/blog").at(-1)?.routeId).toBe("/blog/");
    for (const post of posts) {
      expect(router.matchRoutes(`/blog/${post.slug}`).at(-1)?.routeId).toBe("/blog/$slug");
    }
  });

  it.each(["/charts", "/charts/kalyan", "/download"])(
    "does not expose the removed route %s",
    (path) => {
      expect(makeRouter().matchRoutes(path).at(-1)?.routeId).toBe(rootRouteId);
    },
  );

  it("rejects retired article slugs", async () => {
    const router = makeRouter();
    await router.navigate({ to: "/blog/$slug", params: { slug: "kalyan-matka-history" } });
    expect(router.state.matches.at(-1)?.status).toBe("notFound");
  });
});
