import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { BLOG_CATEGORIES } from "@/data/blogTaxonomy";
import { getAllPosts, getTagArchives } from "@/lib/blogMeta";
import type { RouteManifestItem } from "@/types/content";

export function getRouteManifest(): RouteManifestItem[] {
  const posts = getAllPosts();
  const categories = BLOG_CATEGORIES;
  const tags = getTagArchives();

  const core: RouteManifestItem[] = [
    { path: "/", priority: 1, changefreq: "monthly", sitemap: true },
    { path: "/about", priority: 0.9, changefreq: "monthly", sitemap: true },
    { path: "/projects", priority: 0.9, changefreq: "monthly", sitemap: true },
    { path: "/services", priority: 0.9, changefreq: "monthly", sitemap: true },
    { path: "/skills", priority: 0.8, changefreq: "monthly", sitemap: true },
    { path: "/blog", priority: 0.9, changefreq: "weekly", sitemap: true },
    { path: "/infrastructure", priority: 0.7, changefreq: "monthly", sitemap: true },
    { path: "/contact", priority: 0.8, changefreq: "yearly", sitemap: true },
    { path: "/privacy", priority: 0.2, changefreq: "yearly", sitemap: false, noindex: true },
  ];

  const projectRoutes: RouteManifestItem[] = PROJECTS.map((project) => ({
    path: `/projects/${project.slug}`,
    priority: 0.8,
    changefreq: "monthly",
    sitemap: true,
  }));

  const serviceRoutes: RouteManifestItem[] = SERVICES.map((service) => ({
    path: `/services/${service.slug}`,
    priority: 0.8,
    changefreq: "monthly",
    sitemap: true,
  }));

  const postRoutes: RouteManifestItem[] = posts.map((post) => ({
    path: `/blog/${post.slug}`,
    priority: 0.7,
    changefreq: "monthly",
    lastmod: post.updated,
    sitemap: true,
  }));

  const categoryRoutes: RouteManifestItem[] = categories.map((category) => {
    const latest = posts
      .filter((post) => post.categorySlug === category.slug)
      .map((post) => post.updated)
      .sort()
      .at(-1);
    return {
      path: `/blog/categories/${category.slug}`,
      priority: 0.5,
      changefreq: "weekly",
      lastmod: latest,
      sitemap: true,
    };
  });

  const tagRoutes: RouteManifestItem[] = tags.map((tag) => ({
    path: `/blog/tags/${tag.slug}`,
    priority: 0.3,
    changefreq: "monthly",
    sitemap: false,
    noindex: true,
  }));

  return [...core, ...projectRoutes, ...serviceRoutes, ...postRoutes, ...categoryRoutes, ...tagRoutes];
}

export function getPrerenderPaths(): string[] {
  return [...getRouteManifest().map((route) => route.path), "/404"];
}

export function getSitemapPaths(): RouteManifestItem[] {
  return getRouteManifest().filter((route) => route.sitemap !== false && route.noindex !== true);
}
