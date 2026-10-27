import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const errors = [];
const warnings = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function toRoute(file) {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  if (relative === "index.html") return "/";
  if (relative === "404.html") return "/404";
  if (relative.endsWith("/index.html")) return `/${relative.replace(/\/index\.html$/, "")}`;
  return `/${relative}`;
}

function attr(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? null;
}

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const allFiles = await walk(root);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const fileSet = new Set(allFiles.map((file) => path.relative(root, file).replaceAll("\\", "/")));
const routeSet = new Set(htmlFiles.map(toRoute));

const titles = new Map();
const descriptions = new Map();
const canonicals = new Map();
const internalLinks = new Set();
const assetLinks = new Set();

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const route = toRoute(file);
  const title = decodeHtml(attr(html, /<title>([\s\S]*?)<\/title>/) ?? "");
  const description = decodeHtml(
    attr(html, /<meta name="description" content="([^"]*)"/) ?? "",
  );
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/) ?? "";
  const lang = attr(html, /<html lang="([^"]*)"/) ?? "";
  const h1Count = [...html.matchAll(/<h1[\s>]/g)].length;

  if (!title) errors.push(`${route}: missing title`);
  if (!description) errors.push(`${route}: missing meta description`);
  if (!canonical) errors.push(`${route}: missing canonical`);
  if (lang !== "en") errors.push(`${route}: unexpected html lang "${lang}"`);
  if (h1Count !== 1) errors.push(`${route}: expected one H1, found ${h1Count}`);

  if (title) {
    if (titles.has(title)) errors.push(`${route}: duplicate title with ${titles.get(title)}`);
    else titles.set(title, route);
    if (title.length > 75) warnings.push(`${route}: title is ${title.length} characters`);
  }

  if (description) {
    if (descriptions.has(description)) {
      errors.push(`${route}: duplicate description with ${descriptions.get(description)}`);
    } else descriptions.set(description, route);
    if (description.length > 170) {
      warnings.push(`${route}: description is ${description.length} characters`);
    }
  }

  if (canonical) {
    if (canonicals.has(canonical)) {
      errors.push(`${route}: duplicate canonical with ${canonicals.get(canonical)}`);
    } else canonicals.set(canonical, route);
  }

  if (route === "/privacy" || route === "/404" || route.startsWith("/blog/tags/")) {
    if (!robots.includes("noindex")) errors.push(`${route}: expected noindex`);
  } else if (robots.includes("noindex")) {
    errors.push(`${route}: unexpected noindex`);
  }

  const jsonLdMatches = [
    ...html.matchAll(
      /<script type="application\/ld\+json" data-managed-seo="true">([\s\S]*?)<\/script>/g,
    ),
  ];
  if (jsonLdMatches.length !== 1) {
    errors.push(`${route}: expected one managed JSON-LD block, found ${jsonLdMatches.length}`);
  }
  for (const match of jsonLdMatches) {
    try {
      const parsed = JSON.parse(match[1]);
      if (!parsed["@context"] || !Array.isArray(parsed["@graph"])) {
        errors.push(`${route}: JSON-LD is missing @context or @graph`);
      }
    } catch (error) {
      errors.push(`${route}: invalid JSON-LD (${String(error)})`);
    }
  }

  for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = decodeHtml(match[1]);
    if (href.startsWith("//")) continue;
    if (href.startsWith("/_") || href.startsWith("/api/")) continue;
    if (/\.(xml|txt|webmanifest|png|jpg|jpeg|webp|svg|ico)$/.test(href)) {
      assetLinks.add(href.split(/[?#]/)[0]);
    } else {
      internalLinks.add(href.split("#")[0] || "/");
    }
  }

  for (const match of html.matchAll(/<(?:img|source)[^>]+(?:src|srcset)="([^"]*)"/g)) {
    for (const candidate of decodeHtml(match[1]).split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url.startsWith("/")) assetLinks.add(url.split(/[?#]/)[0]);
    }
  }
}

for (const link of internalLinks) {
  if (!routeSet.has(link) && !fileSet.has(link.replace(/^\//, ""))) {
    errors.push(`Broken internal link: ${link}`);
  }
}

for (const asset of assetLinks) {
  const relative = asset.replace(/^\//, "");
  if (!fileSet.has(relative)) errors.push(`Missing asset reference: ${asset}`);
  const details = await stat(path.join(root, relative)).catch(() => null);
  if (details && details.size === 0) errors.push(`Empty asset: ${asset}`);
}

const sitemap = await readFile(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<url>[\s\S]*?<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
for (const url of sitemapUrls) {
  const route = decodeURIComponent(new URL(url).pathname);
  if (!routeSet.has(route)) errors.push(`Sitemap URL has no prerendered route: ${route}`);
  if (route === "/privacy" || route === "/404" || route.startsWith("/blog/tags/")) {
    errors.push(`Sitemap includes a noindex route: ${route}`);
  }
}
if (!sitemapUrls.length) errors.push("Sitemap has no URLs");
const sitemapImages = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(
  (match) => match[1],
);
if (sitemapImages.length === 0) errors.push("Sitemap has no image entries");
for (const imageUrl of sitemapImages) {
  const pathname = decodeURIComponent(new URL(imageUrl).pathname).replace(/^\//, "");
  if (!fileSet.has(pathname)) errors.push(`Sitemap references a missing image: ${imageUrl}`);
}

const rss = await readFile(path.join(root, "rss.xml"), "utf8");
const rssItems = [...rss.matchAll(/<item>/g)].length;
if (rssItems === 0) errors.push("RSS feed has no items");
if (!rss.includes("<language>en-bd</language>")) errors.push("RSS language is missing");

const robots = await readFile(path.join(root, "robots.txt"), "utf8");
if (!robots.includes("Sitemap: https://shineakhanda.dev/sitemap.xml")) {
  errors.push("robots.txt is missing the sitemap reference");
}

const redirects = await readFile(path.join(root, "_redirects"), "utf8");
const redirectLines = redirects.split("\n").filter(Boolean);
if (redirectLines.length !== (routeSet.size - 2) * 2) {
  errors.push(
    `Expected ${(routeSet.size - 2) * 2} routing rules for public routes, found ${redirectLines.length}`,
  );
}
for (const route of routeSet) {
  if (route === "/" || route === "/404") continue;
  if (!redirects.includes(`${route} ${route}/index.html 200`)) {
    errors.push(`Missing direct-route rewrite for ${route}`);
  }
  if (!redirects.includes(`${route}/ ${route} 301`)) {
    errors.push(`Missing trailing-slash redirect for ${route}`);
  }
}

const llms = await readFile(path.join(root, "llms.txt"), "utf8").catch(() => "");
if (llms.length < 500) errors.push("llms.txt is missing or too short");
if (!llms.includes("https://shineakhanda.dev/contact")) {
  errors.push("llms.txt is missing the contact URL");
}
if (!llms.includes("me@shineakhanda.dev")) errors.push("llms.txt is missing the public email");
if (!llms.includes("https://x.com/shine1920e")) errors.push("llms.txt is missing the X profile");

const manifestText = await readFile(path.join(root, "site.webmanifest"), "utf8");
let manifest;
try {
  manifest = JSON.parse(manifestText);
} catch (error) {
  errors.push(`Invalid site.webmanifest: ${String(error)}`);
}
if (manifest) {
  if (!manifest.name || !manifest.short_name) errors.push("Manifest is missing names");
  for (const icon of manifest.icons ?? []) {
    const iconPath = String(icon.src || "").replace(/^\//, "");
    if (!iconPath || !fileSet.has(iconPath)) {
      errors.push(`Manifest references a missing icon: ${icon.src}`);
    }
  }
}

const contactHtml = await readFile(path.join(root, "contact", "index.html"), "utf8");
if (!contactHtml.includes("mailto:me@shineakhanda.dev")) {
  errors.push("Contact page is missing the public email");
}
if (!contactHtml.includes("https://x.com/shine1920e")) {
  errors.push("Contact page is missing the X profile");
}

console.log(`HTML pages: ${htmlFiles.length}`);
console.log(`Sitemap URLs: ${sitemapUrls.length}`);
console.log(`Internal route links checked: ${internalLinks.size}`);
console.log(`Asset references checked: ${assetLinks.size}`);
console.log(`RSS items: ${rssItems}`);
console.log(`Warnings: ${warnings.length}`);
for (const warning of warnings) console.log(`  WARN ${warning}`);
console.log(`Errors: ${errors.length}`);
for (const error of errors) console.log(`  ERROR ${error}`);

if (errors.length > 0) process.exitCode = 1;
