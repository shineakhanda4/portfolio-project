import { SITE } from "@/data/site";
import { getPageSeo, getSeoAlternates } from "@/lib/seo";
import { serializeStructuredData } from "@/lib/structuredData";
import { absoluteUrl } from "@/lib/utils";
import type { PageSeo } from "@/types/content";

export type ManagedHeadTag =
  | { kind: "meta"; attributes: Record<string, string> }
  | { kind: "link"; attributes: Record<string, string> }
  | { kind: "script"; attributes: Record<string, string>; content: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function canonicalFor(path: string): string {
  return absoluteUrl(path === "/" ? "/" : path, SITE.url);
}

export function buildManagedHeadTags(seo: PageSeo): ManagedHeadTag[] {
  const image = absoluteUrl(seo.image ?? SITE.defaultImage, SITE.url);
  const imageAlt = seo.imageAlt ?? SITE.defaultImageAlt;
  const canonical = canonicalFor(seo.path);
  const robots = seo.noindex
    ? "noindex, follow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const tags: ManagedHeadTag[] = [
    { kind: "meta", attributes: { name: "description", content: seo.description } },
    { kind: "meta", attributes: { name: "robots", content: robots } },
    { kind: "meta", attributes: { name: "author", content: SITE.name } },
    { kind: "link", attributes: { rel: "canonical", href: canonical } },
    { kind: "meta", attributes: { property: "og:site_name", content: SITE.name } },
    { kind: "meta", attributes: { property: "og:locale", content: "en_BD" } },
    { kind: "meta", attributes: { property: "og:type", content: seo.type === "article" ? "article" : "website" } },
    { kind: "meta", attributes: { property: "og:title", content: seo.title } },
    { kind: "meta", attributes: { property: "og:description", content: seo.description } },
    { kind: "meta", attributes: { property: "og:url", content: canonical } },
    { kind: "meta", attributes: { property: "og:image", content: image } },
    { kind: "meta", attributes: { property: "og:image:alt", content: imageAlt } },
    { kind: "meta", attributes: { name: "twitter:card", content: "summary_large_image" } },
    { kind: "meta", attributes: { name: "twitter:site", content: "@shine1920e" } },
    { kind: "meta", attributes: { name: "twitter:creator", content: "@shine1920e" } },
    { kind: "meta", attributes: { name: "twitter:title", content: seo.title } },
    { kind: "meta", attributes: { name: "twitter:description", content: seo.description } },
    { kind: "meta", attributes: { name: "twitter:image", content: image } },
    { kind: "meta", attributes: { name: "twitter:image:alt", content: imageAlt } },
  ];

  if (seo.path === "/") {
    tags.push({
      kind: "link",
      attributes: {
        rel: "preload",
        as: "image",
        href: SITE.portrait.src,
        fetchpriority: "high",
      },
    });
  }

  if (seo.publishedTime) {
    tags.push(
      { kind: "meta", attributes: { property: "article:published_time", content: seo.publishedTime } },
      { kind: "meta", attributes: { property: "article:modified_time", content: seo.modifiedTime ?? seo.publishedTime } },
      { kind: "meta", attributes: { property: "article:author", content: SITE.name } },
    );
    for (const tag of seo.articleTags ?? []) {
      tags.push({ kind: "meta", attributes: { property: "article:tag", content: tag } });
    }
  }

  for (const alternate of getSeoAlternates(seo.path)) {
    tags.push({
      kind: "link",
      attributes: { rel: "alternate", hreflang: alternate.hreflang, href: alternate.href },
    });
  }

  tags.push({
    kind: "script",
    attributes: { type: "application/ld+json" },
    content: serializeStructuredData(seo.path),
  });

  return tags;
}

function renderAttributes(attributes: Record<string, string>): string {
  return Object.entries(attributes)
    .map(([key, value]) => ` ${key}="${escapeHtml(value)}"`)
    .join("");
}

export function renderManagedHeadHtml(seo: PageSeo): string {
  const tags = buildManagedHeadTags(seo);
  const serialized = tags
    .map((tag) => {
      if (tag.kind === "script") {
        return `<script${renderAttributes(tag.attributes)} data-managed-seo="true">${tag.content.replace(
          /<\/script/gi,
          "<\\/script",
        )}</script>`;
      }
      return `<${tag.kind}${renderAttributes(tag.attributes)} data-managed-seo="true" />`;
    })
    .join("\n    ");

  return `<title>${escapeHtml(seo.title)}</title>
    ${serialized}`;
}

export function applyManagedHead(seo: PageSeo): void {
  if (typeof document === "undefined") return;

  document.title = seo.title;
  document.querySelectorAll("[data-managed-seo]").forEach((element) => element.remove());

  const tags = buildManagedHeadTags(seo);
  for (const tag of tags) {
    const element = document.createElement(tag.kind);

    for (const [key, value] of Object.entries(tag.attributes)) {
      element.setAttribute(key, value);
    }

    if (tag.kind === "script") {
      element.textContent = tag.content;
    }

    element.setAttribute("data-managed-seo", "true");
    document.head.appendChild(element);
  }
}

export function getSeoForLocation(pathname: string): PageSeo {
  return getPageSeo(pathname);
}
