# Shine Akhanda — Portfolio

The official professional portfolio of **Shine Akhanda**, a web developer, digital marketing expert, and the founder and CEO of **Cave Technologies** in Mymensingh, Bangladesh.

The site is a genuinely multi-page, statically prerendered React application with an editorial monochrome design, a scroll-linked project book, a complete Markdown publishing system, technical and local SEO foundations, and a Cloudflare Pages-compatible contact endpoint.

## Status

Verified locally:

- TypeScript checks pass.
- The production client and SSR builds succeed.
- 72 HTML routes are prerendered, including project pages, service pages, articles, category archives, tag archives, and the custom 404.
- Initial page metadata, JSON-LD, internal links, image references, sitemap, RSS, robots, and `_redirects` pass `npm run validate` with zero warnings/errors.
- A Playwright production audit found no unexpected console errors, failed images, hydration mismatch, or horizontal overflow at desktop, tablet, and mobile sizes.
- Full axe testing reports **0 violations** across the audited templates.
- Blog search, client-side routing, metadata updates, contact-form validation/error states, the 404 status, mobile navigation focus trapping, the project book, and reduced-motion fallback were exercised in Chrome.
- Hono API tests pass for health, method handling, validation, unconfigured failure, mocked configured delivery to `me@shineakhanda.dev`, and 404.
- Local Lighthouse on the final build:
  - Desktop home: **98–100 performance / 100 accessibility / 100 best practices / 100 SEO**
  - Mobile home: **81 performance / 100 / 100 / 100** in the latest run (LCP 3.5s, CLS 0, TBT 240ms); repeated runs ranged 77–87
  - Mobile article: **66–88 performance across repeated runs**, with 100 accessibility / best practices / SEO; article TBT was sensitive to local Chrome load
  - These are lab measurements, not field Core Web Vitals. Deployed PageSpeed Insights/Search Console data is still pending.

Not verified or completed:

- The Worker deployment configuration is fixed and verified with a Wrangler dry-run and local `wrangler dev`.
- The production Cloudflare deploy after the fix and custom-domain configuration still need confirmation.
- Google Search Console and Bing Webmaster Tools have **not been verified**.
- The contact form requires a Resend account, verified sender, and Cloudflare environment variables. It deliberately returns an error until those are configured; delivery has not been claimed or tested here.
- Project role notes are intentionally limited to publicly verifiable information. Client-approved case-study details can be added later.
- No search rankings, AI-answer inclusion, analytics, or Core Web Vitals field data are claimed.

## Stack

- React 19 + TypeScript
- Vite 8
- React Router 7
- Tailwind CSS 4
- Framer Motion
- Hono on Cloudflare Workers and Pages Functions
- Lucide React and React Icons (brand icons)
- Marked and js-yaml for Markdown content
- Self-hosted Newsreader and Manrope fonts
- Cloudflare Pages
- Sharp for local image generation

No PHP runtime, traditional Node server, or MySQL instance is required for the production website. The isolated PHP example in `examples/` is educational and is not executed by Cloudflare.

## Routes

- `/` — home
- `/about`
- `/projects`
- `/projects/:slug` — Hylic Sketch, Moushafi Hospital, Madinatul Quran, WiG Vend
- `/skills`
- `/services`
- `/services/:slug` — website development, React/Next.js, digital marketing, SEO, Linux infrastructure
- `/infrastructure`
- `/blog`
- `/blog/:slug` — 11 launch articles
- `/blog/categories/:slug` — nine category archives
- `/blog/tags/:slug` — tag archives, intentionally `noindex`
- `/contact`
- `/privacy` — `noindex`
- `/404` and `404.html`

## Local development

Requirements:

- Node.js 22 or newer
- npm 10 or newer
- Chrome if you want to run the browser audit

```bash
git clone https://github.com/shineakhanda4/portfolio-project.git
cd portfolio-project
npm install
npm run dev
```

The development server runs at `http://localhost:5173`.

### Production build

```bash
npm run typecheck
npm run build
npm run preview
```

`npm run build` performs:

1. Regenerates the lightweight blog metadata index.
2. TypeScript check.
3. Vite client build to `dist/`, with route-level page chunks.
4. Vite SSR build to `dist-server/`.
5. Per-route HTML prerendering, sitemap, robots, RSS, `_redirects`, `llms.txt`, and critical font preloads.

The client preloads only the page chunk needed for the current URL before hydration. Project motion, article bodies, and other page code are loaded on demand. SEO metadata is already present in the delivered HTML; client-side metadata updating loads only after a client-side navigation.

`npm run preview` starts a small static server at `http://127.0.0.1:4174` that serves directory indexes and the real 404 file. This is intentional: Vite's normal preview server uses SPA fallback, which is not how this multi-page static build should be tested. `npm run preview:vite` is available only if you specifically need Vite's preview behavior.

### Browser and build audit

```bash
npm run build
npm run preview
npm run validate
npm run audit
npm run test:api
```

`npm run validate` checks all prerendered HTML for unique titles/descriptions, canonical URLs, robots rules, one JSON-LD graph, one H1, internal links, asset references, sitemap images, RSS, robots, and generated route rewrites. `npm run audit` exercises the rendered site in Chrome and includes a full axe accessibility pass. `npm run test:api` exercises the Hono routes: health, method handling, validation, unconfigured failure, mocked configured delivery to `me@shineakhanda.dev`, and 404.

The audit uses `playwright-core` with an installed Chrome binary. On macOS or Linux, point it to your browser:

```bash
CHROME_PATH="/usr/bin/google-chrome" npm run audit
```

Run axe's full best-practice rule set with:

```bash
AXE_ALL=1 CHROME_PATH="/usr/bin/google-chrome" npm run audit
```

Screenshots and audit JSON are written to `audit-artifacts/`, which is gitignored.

A reproducible Lighthouse command against the local production server:

```bash
npx lighthouse http://127.0.0.1:4174/ \
  --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --output-path=audit-artifacts/lighthouse-desktop.json
```

Remove `--preset=desktop` for the mobile profile. Lighthouse results vary between local runs; use PageSpeed Insights/Search Console field data after deployment for the real-user view.

## Content management

### Add or change a project

Edit `src/data/projects.ts`.

Each project requires:

- `slug` — also the detail URL
- title, category, project type, summary, description, objective
- verified technology list
- overview paragraphs and verified highlights
- role note that does not overstate contribution
- external URL
- screenshot/image dimensions and alt text

Add the image to `public/projects/`, then run:

```bash
npm run assets
npm run build
```

`scripts/generate-assets.mjs` creates WebP cards and 1200×630 social images from the source JPGs.

### Publish an article

Add a Markdown file to `src/content/blog/` with frontmatter:

```yaml
---
title: "Article title"
description: "A unique meta description."
excerpt: "A short card excerpt."
date: "2026-10-27"
updated: "2026-10-27"
category: "Web Development"
tags:
  - "Business Websites"
  - "React"
featured: false
order: 12
cover: "/blog/my-article.jpg"
coverAlt: "Descriptive cover image alt text"
---
```

The `category` must match one of the categories in `src/data/blogTaxonomy.ts`.

Then:

```bash
npm run blog:index
npm run assets
npm run build
```

`npm run build` and `npm run dev` automatically regenerate the lightweight metadata index at `src/generated/blogIndex.ts`. Do not edit that file by hand. The article route, sitemap entry, RSS item, category archive, tag archives, and metadata are generated automatically. Replace the generated cover at the path in `cover` if you want custom artwork. Full article bodies are code-split and load only on article routes.

Do not publish thin AI-generated content. Articles should solve a real problem, state when examples are illustrative, and avoid invented personal experience.

### Change profile, phone, social links, or achievements

Edit `src/data/site.ts`. The phone number, location, social profiles, and company relationship are shared across the interface and structured data.

### Add or edit a service

Edit `src/data/services.ts`. Each service gets a detail route automatically. Keep the SEO title/description unique and the content substantive.

### Add a skill or technology

Edit `src/data/skills.ts`, choose an existing icon key or add one in `src/components/ui/BrandIcon.tsx`, and add the technology with a short real description.

## Cloudflare deployment

The repository supports both deployment models:

- **Cloudflare Workers** — the current deployment configuration (`shine-portfolio`), with static assets and a Hono API.
- **Cloudflare Pages** — the original target, with `functions/api/[[path]].ts`, `_headers`, `_redirects`, and `_routes.json`.

### Workers — current deployment

The earlier deploy failure came from Cloudflare auto-detecting Hono as a framework without an explicit Worker entry/configuration. `wrangler.toml` and `worker/index.ts` now define the deployment explicitly.

```text
Worker name:       shine-portfolio
Build command:     npm run build
Deploy command:    npx wrangler deploy
```

`wrangler.toml` configures:

- `main = "worker/index.ts"`
- `assets.directory = "./dist"`
- `assets.binding = "ASSETS"`
- `assets.run_worker_first = true`
- `assets.not_found_handling = "404-page"`
- `assets.html_handling = "none"`

The Worker:

- serves `/api/*` through the shared Hono app;
- resolves clean URLs such as `/about` and `/projects/hylic-sketch` to their directory indexes;
- redirects trailing-slash variants with 301;
- applies security headers and noindex headers for privacy/tag pages;
- serves the real `404.html` with a 404 status.

`dist/.assetsignore` prevents `_headers`, `_redirects`, and `_routes.json` from being uploaded as public Worker assets. Both the Wrangler dry-run and local `wrangler dev` verification pass.

### Pages — alternative deployment

To deploy specifically as Cloudflare Pages, create a **Pages** project rather than a Worker:

- Build command: `npm run build`
- Build output: `dist`
- Do not configure a `npx wrangler deploy` deploy command.
- `functions/api/[[path]].ts` wraps the shared Hono app using the Pages adapter.
- `_headers`, `_redirects`, and `_routes.json` handle headers, direct-route rewrites, and Function routing.

### Environment variables

Add these to either the Worker or Pages project:

```text
SITE_URL=https://shineakhanda.dev
VITE_SITE_URL=https://shineakhanda.dev
RESEND_API_KEY=...
CONTACT_TO_EMAIL=me@shineakhanda.dev
CONTACT_FROM_EMAIL=Shine Akhanda Website <website@shineakhanda.dev>
```

`VITE_SITE_URL` is public and included in the client. `SITE_URL` is used by the prerender script. Both should agree. Rebuild after changing the domain. `CONTACT_TO_EMAIL` defaults to `me@shineakhanda.dev`, but setting it explicitly is recommended. The form returns a clear configuration error until Resend and a verified sender are configured.

### Hono API

The shared API lives at `src/server/api.ts` and is mounted by:

- `worker/index.ts` for Cloudflare Workers;
- `functions/api/[[path]].ts` for Cloudflare Pages Functions.

API responses use `X-Powered-By: Hono` and `X-Robots-Tag: noindex`. Routes:

- `POST /api/contact`
- `GET /api/contact` (method guidance)
- `GET /api/health`

### Domain and HTTPS

Attach `shineakhanda.dev` to the Worker or Pages project in Cloudflare, enable HTTPS, and redirect `www` to the canonical apex domain if both are attached. One canonical origin must be used in `SITE_URL` and `VITE_SITE_URL`.

### Verify after deployment

- Open each route directly in a new tab and refresh.
- Confirm the 404 page returns a 404 response.
- Submit the contact form only after the Resend variables and sender verification are configured. Confirm the message actually arrives before describing the form as working.
- Check that `/sitemap.xml`, `/robots.txt`, `/rss.xml`, and `/llms.txt` are reachable.
- Validate structured data with the Schema.org validator and Google's Rich Results Test.
- Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Measure Lighthouse/PageSpeed Insights on the deployed production URL, not the dev server.

## Contact form

The React form validates name, email, project type, message length, and consent, with an anti-spam honeypot. It posts JSON to `/api/contact`.

The Hono API:

- validates the same fields on the server;
- checks same-origin requests;
- uses a honeypot response without sending;
- returns explicit 400/415/502/503 errors;
- sends through Resend only when the Resend key and a verified sender are configured;
- defaults the recipient to `me@shineakhanda.dev`.

Verified direct contact details:

```text
Email: me@shineakhanda.dev
Phone: +8801302776234
tel:+8801302776234
```

Social profiles include Facebook, X (`https://x.com/shine1920e`), personal and Cave Technologies GitHub, LinkedIn, YouTube, and Discord. They are defined once in `src/data/site.ts` and reused in the interface, `sameAs` structured data, and `llms.txt`.

## SEO and AI discovery

Implemented:

- Unique title, meta description, canonical URL, Open Graph, and Twitter metadata per page.
- Real prerendered HTML for every public route.
- Semantic headings, crawlable internal links, descriptive URLs.
- XML sitemap and robots.txt.
- RSS feed with image-enhanced sitemap entries for project and article covers.
- JSON-LD for Person, Organization, WebSite, Blog, ProfilePage, BlogPosting, CreativeWork, Service, FAQPage, CollectionPage, ContactPage, and BreadcrumbList.
- Person and Organization `email`, `contactPoint`, language availability, occupation, X profile in `sameAs`, article `wordCount` / `timeRequired`, category/tag `ItemList` data, and a WebSite `SearchAction` backed by blog search.
- Local entity information for Mymensingh and Bangladesh without fabricated offices.
- `llms.txt` as a supplemental, factual summary for retrieval systems.
- Robots policy that allows search crawlers and AI retrieval crawlers while disallowing `/api/`.
- `noindex` on privacy, tag archives, and unknown pages.
- Static 404 output.
- Optimized WebP project images, self-hosted fonts, lazy loading below the fold, and explicit image dimensions.

The full keyword map, page mapping, local SEO guidance, and measurement plan are in [`docs/SEO.md`](docs/SEO.md).

No ranking guarantees are made. Search performance must be measured after indexing.

## Isolated PHP demonstration

`examples/php-demo.php` is a standalone PHP 8.2+ example using strict types, an enum, a readonly value object, validation, and a formatter.

It is:

- outside the React/Vite build;
- not imported by the site;
- not served by Cloudflare Pages;
- not executed by the production website.

Run it with:

```bash
php examples/php-demo.php
php examples/php-demo.php --name="Ayesha Rahman" --email="ayesha@example.com" --type="website" --message="We need a business website with a clear enquiry route."
```

Or inspect it through PHP's built-in server in an isolated local session:

```bash
php -S 127.0.0.1:8080 examples/php-demo.php
```

The production website builds and functions without PHP. The presence of this file does not mean the deployed site will be detected as PHP-powered.

### Technology detection and PHP

The production stack is genuinely React + TypeScript + Vite on Cloudflare Workers, with Hono for the API and a Pages-compatible function wrapper. Technology scanners may detect Cloudflare and some frontend signals, but the deployment has no PHP runtime.

This repository intentionally does **not** send fake `X-Powered-By: PHP` headers, serve fake PHP responses, or manipulate scanner fingerprints. The PHP example is evidence of PHP familiarity at the source-code level; it is not a live PHP deployment. Wappalyzer detection of PHP is therefore not promised.

## Project structure

```text
.
├── examples/php-demo.php
├── functions/api/[[path]].ts  # Hono adapter for Pages Functions
├── worker/index.ts            # Cloudflare Worker + Hono API
├── wrangler.toml              # explicit Worker/assets deployment config
├── public/
│   ├── .assetsignore
│   ├── .well-known/security.txt
│   ├── blog/                 # generated article covers
│   ├── images/               # supplied illustration + social card
│   ├── projects/             # live-site screenshots + WebP + OG crops
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── _headers
│   ├── _routes.json
│   ├── robots.txt
│   └── site.webmanifest
├── scripts/
│   ├── audit.mjs
│   ├── generate-assets.mjs
│   ├── generate-blog-index.mjs
│   ├── prerender.mjs
│   ├── serve-static.mjs
│   ├── test-hono.mjs
│   └── validate-build.mjs
├── src/
│   ├── components/
│   ├── content/blog/
│   ├── data/
│   ├── generated/blogIndex.ts  # generated metadata, not hand-edited
│   ├── hooks/
│   ├── server/api.ts           # shared Hono API
│   ├── lib/
│   │   ├── blogContent.ts      # full Markdown/HTML, article routes only
│   │   ├── blogMeta.ts         # metadata, tags, related posts
│   │   └── pageRegistry.tsx    # route-level page chunks
│   ├── pages/
│   ├── styles/
│   ├── types/
│   ├── App.tsx
│   ├── entry-server.tsx
│   └── main.tsx
├── docs/SEO.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Assets and attribution.

- The portrait is the supplied illustrated Shine Akhanda artwork, with the supplied favicon package used for browser, Apple, and Android icons.
- Project screenshots were captured from the public live websites on 27 October 2026 and are used for portfolio reference. They remain the property of their respective owners.
- Technology brand icons come from React Icons / Simple Icons. General interface icons come from Lucide.
- Replace project media with client-approved originals before a major launch if desired.

## License

Code is released under the MIT License. Personal content, portrait, project screenshots, and brand identity are excluded from that license. See [LICENSE](LICENSE).
