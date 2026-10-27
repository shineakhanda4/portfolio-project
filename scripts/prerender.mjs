import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const distDir = path.join(root, "dist");
const templatePath = path.join(distDir, "index.html");
const serverEntryPath = path.join(root, "dist-server", "entry-server.js");

async function loadServerEntry() {
  try {
    return await import(`${pathToFileURL(serverEntryPath).href}?t=${Date.now()}`);
  } catch (error) {
    const mjsPath = path.join(root, "dist-server", "entry-server.mjs");
    try {
      return await import(`${pathToFileURL(mjsPath).href}?t=${Date.now()}`);
    } catch {
      throw error;
    }
  }
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absolute(siteUrl, routePath) {
  return `${siteUrl.replace(/\/$/, "")}${routePath === "/" ? "/" : routePath}`;
}

function resolveOutputPath(routePath) {
  if (routePath === "/") return path.join(distDir, "index.html");
  if (routePath === "/404") return path.join(distDir, "404.html");
  return path.join(distDir, routePath.replace(/^\//, ""), "index.html");
}

function injectPage(template, html, head, fontPreloads) {
  let output = template;

  if (output.includes("<!--seo-head-->")) {
    output = output.replace("<!--seo-head-->", `${fontPreloads}\n    ${head}`);
  } else {
    output = output.replace("</head>", `${fontPreloads}\n    ${head}\n  </head>`);
  }

  if (!output.includes('<div id="root"></div>')) {
    throw new Error("Could not find the empty application root in the Vite HTML template.");
  }

  output = output.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return output;
}

function renderSitemap(siteUrl, entries, imageMap) {
  const urls = entries
    .map((entry) => {
      const lastmod = entry.lastmod ? `\n    <lastmod>${escapeXml(entry.lastmod)}</lastmod>` : "";
      const image = imageMap.get(entry.path);
      const imageXml = image
        ? `\n    <image:image>
      <image:loc>${escapeXml(absolute(siteUrl, image.src))}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
      <image:caption>${escapeXml(image.caption)}</image:caption>
    </image:image>`
        : "";
      return `  <url>
    <loc>${escapeXml(absolute(siteUrl, entry.path))}</loc>${lastmod}${imageXml}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

function renderRedirects(routePaths) {
  return routePaths
    .filter((routePath) => routePath !== "/" && routePath !== "/404")
    .flatMap((routePath) => [
      `${routePath} ${routePath}/index.html 200`,
      `${routePath}/ ${routePath} 301`,
    ])
    .join("\n");
}

function renderRobots(siteUrl) {
  return `# Search and retrieval policy for ${siteUrl}
# Public professional content is intended to be discoverable by search engines
# and by user-triggered AI retrieval tools. No hidden or cloaked content is served.

User-agent: *
Allow: /
Disallow: /api/

# Search and AI retrieval crawlers are explicitly welcome.
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${siteUrl.replace(/\/$/, "")}/sitemap.xml
`;
}

function renderRss(siteUrl, items) {
  const feedUrl = `${siteUrl.replace(/\/$/, "")}/rss.xml`;
  const blogUrl = `${siteUrl.replace(/\/$/, "")}/blog`;
  const entries = items
    .map((post) => {
      const url = `${blogUrl}/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shine Akhanda — Journal</title>
    <link>${escapeXml(blogUrl)}</link>
    <description>Practical writing on web development, digital marketing, SEO, and Linux infrastructure.</description>
    <language>en-bd</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${entries}
  </channel>
</rss>
`;
}

function renderLlmsTxt(siteUrl, projects, services, posts) {
  const base = siteUrl.replace(/\/$/, "");
  return `# Shine Akhanda

> Shine Akhanda is a web developer and digital marketing expert based in Mymensingh, Bangladesh. He is the founder and CEO of Cave Technologies. His work covers modern business websites, React and Next.js development, digital marketing, SEO, Linux server administration, bare-metal infrastructure, troubleshooting, and server recovery.

Canonical website: ${base}
Location: Mymensingh, Bangladesh
Telephone: +8801302776234
Email: me@shineakhanda.dev
Primary language: English; Bengali-language client work is also relevant.
Contact backend: Hono running on Cloudflare (Workers static assets or Pages Functions) at /api/contact.

## Professional identity
- Web developer and digital marketing professional.
- Founder and CEO of Cave Technologies, a business-building agency focused on websites, digital marketing, online advertising, and digital growth.
- 25+ client projects delivered.
- Experience helping 7+ companies improve sales through budget-conscious marketing.
- Hands-on interest and experience in Linux administration, bare-metal infrastructure, troubleshooting, and recovery.
- Personal philosophy: "Web development is my profession; system administration is my passion."

## Core pages
- [Home](${base}/)
- [About](${base}/about)
- [Selected projects](${base}/projects)
- [Services](${base}/services)
- [Skills and technology stack](${base}/skills)
- [Journal](${base}/blog)
- [Linux and infrastructure](${base}/infrastructure)
- [Contact](${base}/contact)

## Selected projects
${projects.map((project) => `- [${project.title}](${base}/projects/${project.slug}) — ${project.summary} Live site: ${project.externalUrl}`).join("\n")}

## Services
${services.map((service) => `- [${service.title}](${base}/services/${service.slug}) — ${service.summary}`).join("\n")}

## Journal
${posts.map((post) => `- [${post.title}](${base}/blog/${post.slug}) — ${post.description}`).join("\n")}

## Official profiles
- GitHub: https://github.com/shineakhanda4
- Cave Technologies GitHub: https://github.com/caveweb1920
- LinkedIn: https://linkedin.com/in/shineakhanda
- Facebook: https://fb.me/shine1920.me
- X: https://x.com/shine1920e
- YouTube: https://youtube.com/@lws-1920
- Discord: https://discord.com/users/1289181620653396100

## Notes
This file is a concise, human-readable summary for retrieval systems. It is supplemental; the canonical website remains the authoritative source. No ranking, inclusion, or AI-answer guarantee is implied by its presence.
`;
}

async function main() {
  const { render, getPrerenderManifest, getRssItems, getEntityData } = await loadServerEntry();
  const manifest = getPrerenderManifest();
  const siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || manifest.siteUrl;
  const { projects, services, posts } = getEntityData();
  const imageMap = new Map();
  for (const project of projects) {
    if (!project.image) continue;
    imageMap.set(`/projects/${project.slug}`, {
      src: project.image,
      title: project.title,
      caption: project.imageAlt || project.summary,
    });
  }
  for (const post of posts) {
    imageMap.set(`/blog/${post.slug}`, {
      src: post.cover,
      title: post.title,
      caption: post.coverAlt || post.description,
    });
  }

  const template = await readFile(templatePath, "utf8");
  const assetFiles = await readdir(path.join(distDir, "assets"));
  const criticalFonts = [
    "newsreader-latin-wght-normal-",
    "newsreader-latin-wght-italic-",
    "manrope-latin-wght-normal-",
  ]
    .map((prefix) => assetFiles.find((file) => file.startsWith(prefix) && file.endsWith(".woff2")))
    .filter(Boolean);

  const fontPreloads = criticalFonts
    .map(
      (file) =>
        `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`,
    )
    .join("\n    ");

  const generated = [];

  for (const routePath of manifest.paths) {
    const { html, head } = await render(routePath);
    const output = injectPage(template, html, head, fontPreloads);
    const outputPath = resolveOutputPath(routePath);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, output, "utf8");
    generated.push(routePath);
  }

  await writeFile(
    path.join(distDir, "sitemap.xml"),
    renderSitemap(siteUrl, manifest.sitemap, imageMap),
    "utf8",
  );
  await writeFile(path.join(distDir, "robots.txt"), renderRobots(siteUrl), "utf8");
  await writeFile(path.join(distDir, "_redirects"), renderRedirects(manifest.paths), "utf8");
  await writeFile(
    path.join(distDir, ".assetsignore"),
    "_headers\n_redirects\n_routes.json\n",
    "utf8",
  );
  await writeFile(path.join(distDir, "rss.xml"), renderRss(siteUrl, posts), "utf8");
  await writeFile(
    path.join(distDir, "llms.txt"),
    renderLlmsTxt(siteUrl, projects, services, posts),
    "utf8",
  );

  console.log(`Prerendered ${generated.length} routes.`);
  console.log(`Sitemap entries: ${manifest.sitemap.length}`);
  console.log(`Site URL: ${siteUrl}`);
  console.log(`Articles in RSS: ${posts.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
