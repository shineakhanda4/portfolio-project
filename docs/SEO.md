# SEO, Local Search, and AI Discoverability Plan

This document is the working SEO strategy for `shineakhanda.dev`. It separates what has been implemented from what can only be measured after deployment and indexing.

**No search volumes, keyword difficulty scores, ranking positions, traffic figures, or AI-answer inclusion have been invented here.** Those must be validated with real tools and first-party data.

## 1. Entity definition

Primary entity:

- **Name:** Shine Akhanda
- **Professional identity:** Web developer and digital marketing expert
- **Leadership role:** Founder & CEO, Cave Technologies
- **Location:** Mymensingh, Bangladesh
- **Verified telephone:** +8801302776234
- **Verified email:** me@shineakhanda.dev
- **X profile:** https://x.com/shine1920e
- **Canonical website:** https://shineakhanda.dev
- **Company relationship:** Shine Akhanda founded and leads Cave Technologies, a business-building agency focused on websites, digital marketing, online advertising, and digital growth.

Entity identifiers in JSON-LD:

- Person: `https://shineakhanda.dev/#person`
- Organization: `https://shineakhanda.dev/#cave-technologies`
- WebSite: `https://shineakhanda.dev/#website`
- Blog: `https://shineakhanda.dev/blog#blog`

The personal entity and the company entity are related with `worksFor` / `founder`, not merged. There is no invented street address, business registration, rating, review, award, or certification. Person and Organization contact points include the verified email, telephone, and English/Bengali language availability.

## 2. Canonical domain and metadata rules

Production origin: `https://shineakhanda.dev`

- One origin, one canonical form.
- Every indexable page has a self-referencing canonical.
- `SITE_URL` and `VITE_SITE_URL` must be set to the production domain at build time.
- Add a permanent redirect from `www` if that hostname is attached.
- Ensure Cloudflare serves HTTPS and does not create a duplicate `http` indexable version.
- Do not use a canonical from the home page on every other page.
- Tag archives and the privacy page are deliberately `noindex, follow`.
- Unknown URLs use a real 404 response.

### Metadata patterns

| Page | Title intent | Primary search purpose |
|---|---|---|
| `/` | Shine Akhanda + web developer + digital marketing expert | Personal brand, primary professional entity |
| `/about` | About Shine Akhanda + founder + Linux | Branded background and credibility |
| `/projects` | Selected projects + web developer Bangladesh | Portfolio and commercial proof |
| `/projects/:slug` | Project name + category + Shine Akhanda | Project-name searches and long-tail commercial research |
| `/skills` | Skills + technology stack + Shine Akhanda | React, TypeScript, Next.js, Linux, and stack expertise |
| `/services` | Web development and digital marketing services | Commercial service hub |
| `/services/website-development` | Website development services Bangladesh | National commercial intent |
| `/services/react-nextjs-development` | React and Next.js developer Bangladesh | Technical hiring intent |
| `/services/digital-marketing` | Digital marketing services Bangladesh | Marketing commercial intent |
| `/services/seo-services` | SEO services Mymensingh / Bangladesh | Local and national SEO intent |
| `/services/linux-infrastructure` | Linux server setup, recovery, administration | Infrastructure support intent |
| `/blog` | Journal + web development + marketing + Linux | Editorial hub |
| `/blog/:slug` | Article title + Shine Akhanda | Informational search intent |
| `/blog/categories/:slug` | Topic archive | Topical relevance and internal linking |
| `/blog/tags/:slug` | Tag archive | User navigation; excluded from indexing and sitemap |
| `/infrastructure` | Linux and bare-metal infrastructure | Systems expertise intent |
| `/contact` | Contact Shine Akhanda + Mymensingh | Contact and local intent |

Every public page has a unique meta description, Open Graph metadata, Twitter card metadata, and a social image.

## 3. Keyword map

These are research candidates and page assignments, not guaranteed targets. Search demand, SERP intent, competition, and realistic opportunity must be validated before prioritising content expansion.

### 3.1 Personal brand

| Priority | Query | Intent | Target | Why this page |
|---|---|---|---|---|
| 1 | Shine Akhanda | Branded | `/` | Primary entity page |
| 1 | Shine Akhanda web developer | Branded | `/` and `/about` | Identity confirmation |
| 1 | Shine Akhanda digital marketing expert | Branded | `/` and `/about` | Identity confirmation |
| 1 | Shine Akhanda developer Bangladesh | Branded | `/about` | Location and profession |
| 1 | Shine Akhanda Mymensingh | Branded + local | `/` and `/contact` | Local entity confirmation |
| 2 | Shine Akhanda portfolio | Branded | `/projects` | Work evidence |
| 2 | Shine Akhanda Cave Technologies | Branded relationship | `/about#cave-technologies` | Founder/company relationship |
| 2 | Shine Akhanda Linux | Branded + technical | `/infrastructure` | Systems expertise |

### 3.2 Mymensingh and local commercial intent

| Priority | Query theme | Intent | Target | Why this page |
|---|---|---|---|---|
| 1 | web developer in Mymensingh | Local commercial | `/` | Clear identity, location, services |
| 1 | best web developer in Mymensingh | Local commercial | `/` | Entity + proof + services |
| 2 | website development in Mymensingh | Local commercial | `/services/website-development` | Service specificity |
| 2 | web development company in Mymensingh | Local commercial | `/services` | Service hub |
| 2 | React developer Mymensingh | Local technical | `/services/react-nextjs-development` | Specialised capability |
| 3 | business website development Mymensingh | Local commercial | `/services/website-development` | Business outcome language |
| 3 | SEO expert Mymensingh | Local commercial | `/services/seo-services` | Service + location |
| 3 | digital marketing Mymensingh | Local commercial | `/services/digital-marketing` | Service + location |
| 3 | Linux server administrator Mymensingh | Local technical | `/services/linux-infrastructure` | Specialist service |

Do not create separate city pages with duplicated content. Genuine local relevance belongs on the primary pages, the Contact page, the About page, and a qualifying Google Business Profile if one is eligible.

### 3.3 National commercial intent — Bangladesh

| Priority | Query theme | Intent | Target | Why this page |
|---|---|---|---|---|
| 1 | web developer in Bangladesh | National commercial | `/` | Professional entity and location |
| 1 | web development services Bangladesh | National commercial | `/services` | Service catalogue |
| 2 | website development company Bangladesh | National commercial | `/services/website-development` | Service depth |
| 2 | custom website development Bangladesh | National commercial | `/services/website-development` | Custom positioning |
| 2 | business website development Bangladesh | National commercial | `/services/website-development` | Business outcome |
| 2 | React developer Bangladesh | Technical commercial | `/services/react-nextjs-development` | React specialism |
| 2 | Next.js developer Bangladesh | Technical commercial | `/services/react-nextjs-development` | Next.js specialism |
| 2 | TypeScript developer Bangladesh | Technical commercial | `/services/react-nextjs-development` and `/skills` | Typed frontend evidence |
| 3 | full-stack web developer Bangladesh | National commercial | `/about` and `/skills` | Frontend + backend + infrastructure |
| 3 | e-commerce website development Bangladesh | National commercial | `/services/website-development` | Only once e-commerce evidence is added |
| 3 | website performance optimization Bangladesh | Technical commercial | `/services/seo-services` | Performance and CWV |
| 3 | website redesign Bangladesh | National commercial | `/services/website-development` | Replacement/improvement intent |

### 3.4 Digital marketing

| Priority | Query theme | Intent | Target | Why this page |
|---|---|---|---|---|
| 1 | digital marketing expert Bangladesh | Commercial | `/` and `/services/digital-marketing` | Identity + service |
| 1 | digital marketing services Bangladesh | Commercial | `/services/digital-marketing` | Service page |
| 2 | digital marketing for small businesses Bangladesh | Commercial | `/services/digital-marketing` | Budget-aware positioning |
| 2 | Facebook Ads specialist Bangladesh | Commercial | `/services/digital-marketing` | Paid social relevance |
| 2 | Google Ads specialist Bangladesh | Commercial | `/services/digital-marketing` | Paid search relevance |
| 2 | SEO expert Bangladesh | Commercial | `/services/seo-services` | SEO service |
| 2 | SEO services Bangladesh | Commercial | `/services/seo-services` | SEO service |
| 3 | budget-friendly digital marketing Bangladesh | Commercial | `/services/digital-marketing` and article | Supplied business experience |
| 3 | online advertising services Bangladesh | Commercial | `/services/digital-marketing` | Advertising relevance |
| 3 | digital marketing in Bangladesh | Informational/commercial | `/blog` cluster | Article-led support |

### 3.5 Technical and infrastructure

| Priority | Query theme | Intent | Target | Why this page |
|---|---|---|---|---|
| 1 | Linux server administrator Bangladesh | Commercial/technical | `/services/linux-infrastructure` | Service and location |
| 2 | Linux server setup | Technical commercial | `/services/linux-infrastructure` | Service |
| 2 | Linux server recovery | Technical commercial | `/services/linux-infrastructure` | Recovery experience |
| 2 | bare-metal server setup | Technical commercial | `/infrastructure` | Bare-metal experience |
| 2 | Linux server troubleshooting | Informational | `/blog/linux-server-troubleshooting` | Article depth |
| 3 | bare-metal vs VPS | Informational | `/blog/bare-metal-vs-vps` | Comparison intent |
| 3 | technical SEO services | Commercial | `/services/seo-services` | Technical SEO |
| 3 | website speed optimization | Informational/commercial | `/blog/website-performance-optimization` | Performance guide |
| 3 | React vs Next.js | Informational | `/blog/react-vs-nextjs` | Framework comparison |

### 3.6 Business and education topics

| Priority | Query theme | Intent | Target |
|---|---|---|---|
| 2 | technology stack for business website | Informational | `/blog/choosing-the-right-technology-stack` |
| 2 | TypeScript for modern web development | Informational | `/blog/why-typescript-matters` |
| 2 | technical SEO fundamentals | Informational | `/blog/technical-seo-fundamentals` |
| 2 | SEO for businesses in Bangladesh | Informational/local | `/blog/seo-for-businesses-in-bangladesh` |
| 2 | digital marketing with limited budget | Informational | `/blog/digital-marketing-limited-budgets` |
| 3 | business website mistakes | Informational | `/blog/business-website-mistakes` |
| 3 | Node.js vs Hono vs PHP | Informational | `/blog/backend-choices-node-hono-php` |

## 4. Technical SEO implementation

Implemented in the codebase:

- Static HTML for all public routes through a custom Vite SSR prerender.
- Route-specific `<title>`, description, canonical, robots, Open Graph, Twitter, and article metadata.
- Semantic `header`, `main`, `nav`, `article`, `section`, and heading hierarchy.
- One H1 on each inspected page.
- Descriptive URLs and internal links.
- XML sitemap generated from the route manifest, with image sitemap entries for project and article covers.
- `robots.txt` generated with sitemap reference and AI crawler policy.
- `rss.xml`.
- `llms.txt` as a supplemental entity summary.
- `404.html` and explicit 404 behavior documentation.
- `_redirects` 200 rewrites for direct route access.
- `_headers` security headers, cache rules, and `X-Robots-Tag` noindex headers for privacy, tag archives, and the API.
- Verified email and X profile in entity data; `SearchAction` blog search; article word count/time required; category/tag `ItemList`; project image metadata.
- WebP project images, explicit dimensions, descriptive alt text, and below-the-fold lazy loading.
- Self-hosted variable fonts with the three critical Latin files preloaded.
- Route-level JavaScript chunks, on-demand article bodies, and project animation loaded only on the project route.
- Deferred production hydration after first paint, with fully prerendered content available before JavaScript runs.
- `content-visibility` for off-screen home sections to reduce initial style/layout work.
- Reduced-motion support and a static project-book fallback.
- No scroll hijacking.
- No accidental production `noindex` on important pages.
- Privacy and tag archives deliberately excluded from indexing.

Deployment-dependent checks still required:

- Actual HTTPS and host redirect behavior.
- Cloudflare Pages status codes for missing URLs.
- Header behavior on the live domain.
- Rendered HTML fetched from the deployed URL.
- Search Console/Bing verification.
- PageSpeed Insights field data.
- Indexation and canonical selection.

## 5. Structured data

The site emits one JSON-LD graph per route.

Global entities:

- `Person`
- `Organization` for Cave Technologies
- `WebSite`

Page-specific types:

- `ProfilePage` on home
- `AboutPage` on About
- `CollectionPage` and `ItemList` for work, blog, and services
- `CreativeWork` for project pages
- `Service` and `FAQPage` for service pages
- `Blog` and `BlogPosting` for articles
- `ContactPage`
- `BreadcrumbList` on internal pages

Rules followed:

- Use only verified name, phone, location, profiles, and company relationship.
- No invented awards, ratings, reviews, certifications, addresses, or business registration data.
- Person and Organization are separate nodes with stable `@id` references.
- `sameAs` contains only authentic public profiles, including X at `https://x.com/shine1920e`.
- Person and Organization expose the verified `me@shineakhanda.dev` contact point.
- Article schema includes word count and ISO 8601 reading time; category and tag archives include `ItemList` data.
- The sitemap includes image entries for project screenshots and article covers.
- FAQ answers match visible page content.
- Project pages do not claim verified client outcomes.

Validation steps after deployment:

1. Copy the live URL into the Schema.org validator.
2. Run Google's Rich Results Test for article and breadcrumb markup.
3. Confirm no errors, and review warnings in context.
4. Revalidate after changing content or entity data.

Valid markup does not guarantee rich results, rankings, or AI citations.

## 6. Local SEO — Mymensingh

Current implementation:

- Location stated consistently as Mymensingh, Bangladesh.
- Phone number consistent across interface, contact page, footer, and structured data.
- Services and project context are tied to the real professional base.
- No fake office address or branch network.
- No duplicate city landing pages.
- Local relevance is included naturally on home, about, contact, services, and articles.

Google Business Profile guidance:

1. Confirm the business is eligible under Google's current guidelines. A personal portfolio is not automatically eligible as a local business.
2. If Cave Technologies has a qualifying public location or service-area operation, claim the profile through Google's verification flow.
3. Use the real business name, not a keyword-stuffed variant.
4. Choose the most accurate primary category.
5. Publish accurate hours, phone, website, and service area or address.
6. Add genuine photographs of the team, work, and location where applicable.
7. Keep the website NAP consistent with the profile.
8. Ask customers for honest reviews without incentives or fake accounts.
9. Respond to reviews and questions.
10. Do not create multiple profiles for the same business to target cities.

Local measurement:

- Branded searches containing Mymensingh.
- Local pack impressions and calls/direction requests if a profile is eligible.
- Contact-page calls in a consented analytics setup.
- Search Console queries containing Mymensingh.
- Referrals from genuine local directories and profiles.

## 7. National SEO and language

The site uses English as the primary language (`en-BD` in metadata). Bengali client websites are represented in the portfolio, but this personal site does not currently publish full Bengali equivalents, so no `hreflang` alternates are declared beyond the self-referencing `en-BD`.

If Bengali pages are added later:

- Use `/bn/...` URLs or a clearly separated subdomain.
- Add `lang="bn"` to the page content.
- Add genuine reciprocal `hreflang` entries.
- Do not machine-translate and publish thin duplicates.
- Ensure the Bengali content serves a real audience need, not only a keyword variant.

National service content should stay on the actual service pages. Do not create near-identical city pages.

## 8. Blog and content strategy

The blog is a real Markdown publishing system:

- frontmatter-driven metadata;
- categories and tags;
- reading time;
- article covers;
- table of contents;
- related articles;
- previous/next navigation;
- RSS, sitemap, canonical, and BlogPosting schema;
- visible educational disclaimer;
- no invented personal project claims.

Initial category coverage:

1. Web Development
2. React & Next.js
3. TypeScript & JavaScript
4. Backend Development
5. Digital Marketing
6. Search Engine Optimization
7. Business Growth
8. Linux & System Administration
9. Bare-Metal Infrastructure

Next content priorities should come from Search Console impressions, sales questions, and genuine project lessons. Good topics will answer a specific question with examples, not repeat a keyword.

Do not publish large volumes of auto-generated articles. One useful article that earns links and answers a query is more valuable than twenty thin variations.

## 9. AI search and discoverability

Implemented:

- Clear factual identity, services, location, and company relationship.
- Consistent entity names and contact information.
- HTML content available without interaction.
- Structured data with stable identifiers.
- Accessible project and article content.
- Sitemap, canonical URLs, RSS, and crawlable internal links.
- `llms.txt` as a human-readable supplemental summary.
- Robots policy allowing search and AI retrieval crawlers, with `/api/` disallowed.
- No hidden text, prompt injection, fake authority, or deceptive markup.

Policy notes:

- Search indexing, AI-training access, and user-triggered retrieval are different behaviours. The current robots file allows the named crawlers listed; review provider documentation periodically because policies and user-agent names change.
- `llms.txt` is not an official guarantee of inclusion in any AI product. It is a convenience summary.
- AI systems may still misstate or omit information. Accurate, consistent public content improves the chance of correct retrieval but cannot guarantee it.
- Monitor AI referrals separately from organic search where analytics allows.
- Keep the phone number and professional identity consistent everywhere.

Questions the content is designed to answer:

- Who is Shine Akhanda?
- What does Shine Akhanda do?
- Where is Shine Akhanda based?
- What services does Shine Akhanda offer?
- What is Cave Technologies, and how is Shine Akhanda connected to it?
- What technologies does Shine Akhanda use?
- What projects has Shine Akhanda worked on?
- How can someone contact Shine Akhanda?

These are answered through normal page content, not question-stuffed blocks.

## 10. Measurement and setup

### Google Search Console

1. Add a Domain property for `shineakhanda.dev`.
2. Verify through DNS TXT at the domain provider. This avoids adding a temporary HTML file to the site.
3. Submit `https://shineakhanda.dev/sitemap.xml`.
4. Check the Page indexing report for excluded routes and unexpected canonicals.
5. Inspect the home, About, projects, each service, and articles with URL Inspection.
6. Review the Performance report by query, page, country, and device.
7. Segment branded vs non-branded and Mymensingh vs national queries.
8. Review Core Web Vitals after field data is available.

### Bing Webmaster Tools

1. Add the site.
2. Import from Google Search Console or verify through DNS.
3. Submit the sitemap.
4. Review index and crawl errors.

### Analytics

The site currently has no third-party analytics script. If analytics is added:

- update the privacy notice;
- implement consent where required;
- track calls, contact-form starts, successful submissions, and project-page engagement;
- do not collect form content in analytics;
- verify that the analytics does not regress Core Web Vitals.

### Useful baseline metrics

- Indexed canonical URLs / expected sitemap URLs.
- Branded impressions and clicks.
- Mymensingh queries with impressions.
- National service-page impressions.
- Article impressions and assisted conversions.
- Contact-page calls and verified form deliveries.
- Core Web Vitals field status.
- Crawl errors and 404 volume.
- AI referral traffic where identifiable.

## 11. Post-launch optimisation sequence

No fixed calendar is promised. Work in evidence order.

### Phase 1 — Deploy and verify

- Deploy to Cloudflare Pages.
- Attach the domain and enforce HTTPS/one canonical host.
- Test all routes, refresh behavior, 404 status, sitemap, robots, RSS, and headers.
- Configure Resend and confirm an actual form delivery before calling the form functional.
- Verify Search Console and Bing.

### Phase 2 — Establish the entity

- Publish the accurate Person/Organization relationship through the live structured data.
- Make social profiles consistent with the website.
- Confirm the portrait, phone, location, and company description.
- Earn genuine mentions through existing clients and professional relationships.
- Avoid mass directory submissions.

### Phase 3 — Read search data

- Identify branded query variants.
- Identify Mymensingh pages/queries with impressions and low CTR.
- Find service queries where the site is eligible but not ranking.
- Find article queries with impressions but weak engagement.
- Improve titles, snippets, internal links, and page depth based on those observations.

### Phase 4 — Build topical depth

- Expand service pages only where there is a genuine service and enough detail.
- Add articles that answer real sales and support questions.
- Create project case studies only with client-approved scope and outcomes.
- Link articles to relevant services and projects with descriptive anchors.

### Phase 5 — Improve conversion and authority

- Test contact-page clarity and call prominence.
- Add verified project outcomes only when evidence is available.
- Pursue legitimate editorial links, partnerships, and client permissions.
- Monitor form quality and spam.
- Improve the slowest templates with real field data.

## 12. Acceptance criteria status

| Criterion | Status |
|---|---|
| Unique metadata for important pages | Implemented and prerendered |
| Correct canonical URLs | Implemented; verify on live domain |
| Crawler-accessible content | Implemented through static HTML |
| Sitemap and robots.txt | Generated and locally inspected |
| Valid, accurate structured data | Implemented; live validation pending |
| No unintended duplicate indexable routes | Route manifest and noindex rules implemented |
| Blog metadata and internal links | Implemented |
| Local and national keyword mapping | Documented above |
| Performance and mobile usability | Local Lighthouse desktop 98–100; mobile home 81 latest (77–87 across runs); aux categories 100. Field data pending deployment |
| Search Console / Bing instructions | Included |
| AI discoverability foundation | Implemented without guarantees |
| Realistic post-launch improvement plan | Included above |

## 13. Honest limitations

- No organic ranking can be guaranteed.
- No AI assistant inclusion can be guaranteed.
- No live deployment or indexing has been verified from this repository state.
- No analytics or field Core Web Vitals data exists until configured.
- Contact-form delivery depends on external configuration.
- The four project pages intentionally avoid unverified client claims and metrics.
- The site's current content is in English; a Bengali edition would require real translation and review, not automatic duplication.
