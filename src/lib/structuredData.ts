import { BLOG_CATEGORIES, getCategoryBySlug, slugifyTag } from "@/data/blogTaxonomy";
import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { SITE, SOCIAL_LINKS } from "@/data/site";
import { getAllPosts, getPostBySlug, getPostsByCategory, getPostsByTag } from "@/lib/blogMeta";
import { absoluteUrl } from "@/lib/utils";

type JsonLd = Record<string, unknown>;

const PERSON_ID = `${SITE.url}/#person`;
const ORGANISATION_ID = `${SITE.url}/#cave-technologies`;
const WEBSITE_ID = `${SITE.url}/#website`;
const BLOG_ID = `${SITE.url}/blog#blog`;

const personalProfiles = SOCIAL_LINKS.filter((link) => link.icon !== "github-cave").map(
  (link) => link.href,
);

const organisationProfile = SOCIAL_LINKS.find((link) => link.icon === "github-cave")?.href;

const person: JsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.name,
  url: SITE.url,
  image: absoluteUrl(SITE.portrait.fallback, SITE.url),
  jobTitle: ["Web Developer", "Digital Marketing Expert", "Founder & CEO"],
  description:
    "Shine Akhanda is a web developer, digital marketing expert, and the founder and CEO of Cave Technologies in Mymensingh, Bangladesh.",
  telephone: SITE.phone.e164,
  email: SITE.email.display,
  address: {
    "@type": "PostalAddress",
    addressLocality: SITE.location.city,
    addressCountry: "BD",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "professional inquiries",
    telephone: SITE.phone.e164,
    email: SITE.email.display,
    availableLanguage: ["English", "Bengali"],
    areaServed: [
      { "@type": "City", name: "Mymensingh" },
      { "@type": "Country", name: "Bangladesh" },
    ],
  },
  knowsLanguage: ["English", "Bengali"],
  hasOccupation: {
    "@type": "Occupation",
    name: "Web Developer",
    occupationLocation: { "@type": "City", name: "Mymensingh" },
    skills:
      "React, Next.js, TypeScript, JavaScript, Angular, Node.js, Hono, PHP, MongoDB, MySQL, PostgreSQL, Linux, bare-metal infrastructure",
  },
  worksFor: { "@id": ORGANISATION_ID },
  knowsAbout: [
    "Web development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Angular",
    "Node.js",
    "Hono",
    "PHP",
    "Digital marketing",
    "Search engine optimization",
    "Linux server administration",
    "Bare-metal infrastructure",
    "Server recovery",
  ],
  sameAs: personalProfiles,
};

const organisation: JsonLd = {
  "@type": "Organization",
  "@id": ORGANISATION_ID,
  name: SITE.company.name,
  description: SITE.company.description,
  founder: { "@id": PERSON_ID },
  url: `${SITE.url}/about#cave-technologies`,
  email: SITE.email.display,
  areaServed: [
    { "@type": "City", name: "Mymensingh" },
    { "@type": "Country", name: "Bangladesh" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "business enquiries",
    telephone: SITE.phone.e164,
    email: SITE.email.display,
    availableLanguage: ["English", "Bengali"],
  },
  sameAs: organisationProfile ? [organisationProfile] : [],
};

const website: JsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: `${SITE.name} — Web Developer & Digital Marketing Expert`,
  description: SITE.description,
  inLanguage: "en-BD",
  publisher: { "@id": PERSON_ID },
  copyrightHolder: { "@id": PERSON_ID },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const blog: JsonLd = {
  "@type": "Blog",
  "@id": BLOG_ID,
  name: "Shine Akhanda Journal",
  description:
    "Practical writing on web development, digital marketing, SEO, Linux, and building dependable digital systems.",
  url: `${SITE.url}/blog`,
  publisher: { "@id": PERSON_ID },
  isPartOf: { "@id": WEBSITE_ID },
  inLanguage: "en-BD",
};

function pageId(path: string): string {
  return `${SITE.url}${path === "/" ? "/" : path}#webpage`;
}

function breadcrumbItems(path: string): Array<{ name: string; url: string }> {
  const items = [{ name: "Home", url: `${SITE.url}/` }];

  if (path.startsWith("/projects")) {
    items.push({ name: "Projects", url: `${SITE.url}/projects` });
    if (path !== "/projects") {
      const project = getProjectBySlug(path.split("/")[2] ?? "");
      if (project) items.push({ name: project.title, url: `${SITE.url}${path}` });
    }
  } else if (path.startsWith("/services")) {
    items.push({ name: "Services", url: `${SITE.url}/services` });
    if (path !== "/services") {
      const service = getServiceBySlug(path.split("/")[2] ?? "");
      if (service) items.push({ name: service.title, url: `${SITE.url}${path}` });
    }
  } else if (path.startsWith("/blog")) {
    items.push({ name: "Journal", url: `${SITE.url}/blog` });
    if (path.startsWith("/blog/categories/")) {
      const category = getCategoryBySlug(path.split("/")[3] ?? "");
      if (category) {
        items.push({
          name: category.name,
          url: `${SITE.url}/blog/categories/${category.slug}`,
        });
      }
    } else if (path.startsWith("/blog/tags/")) {
      const tagSlug = path.split("/")[3] ?? "";
      const posts = getPostsByTag(tagSlug);
      const tag = posts[0]?.tags.find((item) => slugifyTag(item) === tagSlug);
      if (tag) items.push({ name: tag, url: `${SITE.url}${path}` });
    } else if (path !== "/blog") {
      const post = getPostBySlug(path.split("/")[2] ?? "");
      if (post) items.push({ name: post.title, url: `${SITE.url}${path}` });
    }
  } else if (path !== "/") {
    const names: Record<string, string> = {
      "/about": "About",
      "/skills": "Skills",
      "/infrastructure": "Infrastructure",
      "/contact": "Contact",
      "/privacy": "Privacy",
    };
    const name = names[path];
    if (name) items.push({ name, url: `${SITE.url}${path}` });
  }

  return items;
}

function makeBreadcrumb(path: string): JsonLd | null {
  const items = breadcrumbItems(path);
  if (items.length < 2) return null;

  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}${path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function makeWebPage(path: string, name: string, description: string, type = "WebPage"): JsonLd {
  return {
    "@type": type,
    "@id": pageId(path),
    url: `${SITE.url}${path === "/" ? "/" : path}`,
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": PERSON_ID },
    inLanguage: "en-BD",
    breadcrumb: path === "/" ? undefined : { "@id": `${SITE.url}${path}#breadcrumb` },
  };
}

export function getStructuredData(path: string): JsonLd {
  const graph: JsonLd[] = [person, organisation, website];
  const breadcrumb = makeBreadcrumb(path);
  if (breadcrumb) graph.push(breadcrumb);

  if (path === "/") {
    graph.push({
      "@type": "ProfilePage",
      "@id": pageId("/"),
      url: SITE.url,
      name: "Shine Akhanda — Web Developer & Digital Marketing Expert",
      description: SITE.description,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: { "@id": PERSON_ID },
      about: { "@id": PERSON_ID },
      inLanguage: "en-BD",
    });
  } else if (path === "/about") {
    graph.push(
      makeWebPage(
        path,
        "About Shine Akhanda",
        "Professional background, web development practice, digital marketing experience, and Cave Technologies leadership.",
        "AboutPage",
      ),
    );
  } else if (path === "/projects") {
    graph.push(
      makeWebPage(
        path,
        "Selected Projects by Shine Akhanda",
        "Selected live websites spanning architecture, healthcare, education, and manufacturing.",
        "CollectionPage",
      ),
      {
        "@type": "ItemList",
        "@id": `${SITE.url}/projects#itemlist`,
        name: "Selected projects",
        numberOfItems: PROJECTS.length,
        itemListElement: PROJECTS.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE.url}/projects/${project.slug}`,
          name: project.title,
        })),
      },
    );
  } else if (path.startsWith("/projects/")) {
    const project = getProjectBySlug(path.split("/")[2] ?? "");
    if (project) {
      graph.push(
        makeWebPage(path, `${project.title} — ${project.category}`, project.description, "WebPage"),
        {
          "@type": "CreativeWork",
          "@id": `${SITE.url}${path}#project`,
          name: project.title,
          description: project.description,
          url: project.externalUrl,
          sameAs: project.externalUrl,
          image: {
            "@type": "ImageObject",
            url: absoluteUrl(project.image.src, SITE.url),
            caption: project.image.alt,
            width: project.image.width,
            height: project.image.height,
          },
          genre: project.category,
          keywords: project.stack.join(", "),
          inLanguage: "en",
          isPartOf: { "@id": pageId(path) },
        },
      );
    }
  } else if (path === "/services") {
    graph.push(
      makeWebPage(
        path,
        "Web Development, Marketing & Infrastructure Services",
        "Services from Shine Akhanda covering website development, React and Next.js, digital marketing, SEO, and Linux infrastructure.",
        "CollectionPage",
      ),
      {
        "@type": "OfferCatalog",
        "@id": `${SITE.url}/services#catalog`,
        name: "Shine Akhanda — services",
        itemListElement: SERVICES.map((service, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            url: `${SITE.url}/services/${service.slug}`,
            provider: { "@id": PERSON_ID },
          },
        })),
      },
    );
  } else if (path.startsWith("/services/")) {
    const service = getServiceBySlug(path.split("/")[2] ?? "");
    if (service) {
      graph.push(
        makeWebPage(path, service.title, service.description, "WebPage"),
        {
          "@type": "Service",
          "@id": `${SITE.url}${path}#service`,
          name: service.title,
          serviceType: service.title,
          description: service.description,
          url: `${SITE.url}${path}`,
          provider: { "@id": PERSON_ID },
          areaServed: [
            { "@type": "City", name: "Mymensingh" },
            { "@type": "Country", name: "Bangladesh" },
          ],
          availableChannel: {
            "@type": "ServiceChannel",
            serviceUrl: `${SITE.url}/contact`,
            servicePhone: {
              "@type": "ContactPoint",
              telephone: SITE.phone.e164,
              email: SITE.email.display,
              contactType: "project enquiries",
              availableLanguage: ["English", "Bengali"],
            },
          },
          isPartOf: { "@id": pageId(path) },
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE.url}${path}#faq`,
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        },
      );
    }
  } else if (path === "/skills") {
    graph.push(
      makeWebPage(
        path,
        "Skills & Technology Stack",
        "Frontend, backend, database, Linux, and infrastructure capabilities.",
      ),
    );
  } else if (path === "/infrastructure") {
    graph.push(
      makeWebPage(
        path,
        "Linux & Bare-Metal Infrastructure",
        "Linux administration, server setup, troubleshooting, and recovery experience.",
      ),
    );
  } else if (path === "/blog") {
    const posts = getAllPosts();
    graph.push(
      makeWebPage(
        path,
        "Shine Akhanda Journal",
        "Practical writing on web development, digital marketing, SEO, Linux, and infrastructure.",
        "CollectionPage",
      ),
      blog,
      {
        "@type": "ItemList",
        "@id": `${SITE.url}/blog#itemlist`,
        numberOfItems: posts.length,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE.url}/blog/${post.slug}`,
          name: post.title,
        })),
      },
    );
  } else if (path.startsWith("/blog/categories/")) {
    const category = getCategoryBySlug(path.split("/")[3] ?? "");
    if (category) {
      const categoryPosts = getPostsByCategory(category.slug);
      graph.push(
        makeWebPage(path, `${category.name} Articles`, category.description, "CollectionPage"),
        blog,
        {
          "@type": "ItemList",
          "@id": `${SITE.url}${path}#itemlist`,
          name: `${category.name} articles`,
          numberOfItems: categoryPosts.length,
          itemListElement: categoryPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE.url}/blog/${post.slug}`,
            name: post.title,
          })),
        },
      );
    }
  } else if (path.startsWith("/blog/tags/")) {
    const tagSlug = path.split("/")[3] ?? "";
    const posts = getPostsByTag(tagSlug);
    const tag = posts[0]?.tags.find((item) => slugifyTag(item) === tagSlug);
    if (tag) {
      graph.push(
        makeWebPage(path, `${tag} Articles`, `Articles tagged ${tag}.`, "CollectionPage"),
        blog,
        {
          "@type": "ItemList",
          "@id": `${SITE.url}${path}#itemlist`,
          name: `${tag} articles`,
          numberOfItems: posts.length,
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE.url}/blog/${post.slug}`,
            name: post.title,
          })),
        },
      );
    }
  } else if (path.startsWith("/blog/")) {
    const post = getPostBySlug(path.split("/")[2] ?? "");
    if (post) {
      const category = BLOG_CATEGORIES.find((item) => item.slug === post.categorySlug);
      graph.push(
        makeWebPage(path, post.title, post.description, "WebPage"),
        {
          "@type": "BlogPosting",
          "@id": `${SITE.url}${path}#article`,
          headline: post.title,
          description: post.description,
          image: [absoluteUrl(post.cover, SITE.url)],
          datePublished: new Date(`${post.date}T00:00:00Z`).toISOString(),
          dateModified: new Date(`${post.updated}T00:00:00Z`).toISOString(),
          author: { "@id": PERSON_ID },
          publisher: { "@id": PERSON_ID },
          copyrightHolder: { "@id": PERSON_ID },
          copyrightYear: 2026,
          mainEntityOfPage: { "@id": pageId(path) },
          isPartOf: { "@id": BLOG_ID },
          articleSection: category?.name,
          keywords: post.tags.join(", "),
          wordCount: post.wordCount,
          timeRequired: `PT${post.readingMinutes}M`,
          isAccessibleForFree: true,
          inLanguage: "en-BD",
        },
      );
    }
  } else if (path === "/contact") {
    graph.push(
      makeWebPage(
        path,
        "Contact Shine Akhanda",
        "Contact information and project enquiry form for web development, digital marketing, SEO, and Linux infrastructure work.",
        "ContactPage",
      ),
    );
  } else if (path === "/privacy") {
    graph.push(makeWebPage(path, "Privacy", "How this website handles personal information.", "WebPage"));
  } else {
    graph.push(makeWebPage(path, "Page not found", "The requested page could not be found."));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph.filter((item) => Object.keys(item).length > 0),
  };
}

export function serializeStructuredData(path: string): string {
  return JSON.stringify(getStructuredData(path)).replace(/</g, "\\u003c");
}
