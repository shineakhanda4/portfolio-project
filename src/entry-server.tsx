import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { App } from "@/App";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { getAllPosts } from "@/lib/blogMeta";
import { renderManagedHeadHtml } from "@/lib/head";
import { preloadAllPages } from "@/lib/pageRegistry";
import { getPrerenderPaths, getSitemapPaths } from "@/lib/routes";
import { getPageSeo } from "@/lib/seo";
import type { RouteManifestItem } from "@/types/content";

let preloadPromise: Promise<void[]> | null = null;

export async function render(url: string): Promise<{ html: string; head: string; status: number }> {
  preloadPromise ??= preloadAllPages();
  await preloadPromise;

  const html = renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
  const seo = getPageSeo(url);

  return {
    html,
    head: renderManagedHeadHtml(seo),
    status: url === "/404" ? 404 : 200,
  };
}

export function getPrerenderManifest(): {
  paths: string[];
  sitemap: RouteManifestItem[];
  siteUrl: string;
} {
  return {
    paths: getPrerenderPaths(),
    sitemap: getSitemapPaths(),
    siteUrl: SITE.url,
  };
}

export function getRssItems() {
  return getAllPosts().map((post) => ({
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    updated: post.updated,
    category: post.categorySlug,
    cover: post.cover,
    coverAlt: post.coverAlt,
  }));
}

export function getEntityData() {
  return {
    projects: PROJECTS.map((project) => ({
      title: project.title,
      slug: project.slug,
      summary: project.summary,
      externalUrl: project.externalUrl,
      image: project.ogImage ?? project.image.src,
      imageAlt: project.image.alt,
    })),
    services: SERVICES.map((service) => ({
      title: service.title,
      slug: service.slug,
      summary: service.summary,
    })),
    posts: getRssItems(),
  };
}
