import type { BlogCategory } from "@/types/content";

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: "web-development",
    name: "Web Development",
    description:
      "Practical notes on planning, building, shipping, and maintaining modern business websites.",
    seoDescription:
      "Practical web development guidance from Shine Akhanda, covering website planning, performance, accessibility, and maintainable implementation.",
  },
  {
    slug: "react-nextjs",
    name: "React & Next.js",
    description:
      "Component architecture, rendering decisions, and production lessons from the React ecosystem.",
    seoDescription:
      "React and Next.js articles covering rendering models, component architecture, performance, and choosing the right approach for a project.",
  },
  {
    slug: "typescript-javascript",
    name: "TypeScript & JavaScript",
    description:
      "Language-level thinking about type safety, maintainability, and reliable browser code.",
    seoDescription:
      "TypeScript and JavaScript articles on type systems, safer application code, and practical modern development.",
  },
  {
    slug: "backend-development",
    name: "Backend Development",
    description:
      "API design, server-side choices, content systems, and the application layer behind the interface.",
    seoDescription:
      "Backend development articles covering Node.js, PHP, Hono, APIs, databases, and practical application architecture.",
  },
  {
    slug: "digital-marketing",
    name: "Digital Marketing",
    description:
      "Budget-aware marketing systems for businesses that need evidence, not noise.",
    seoDescription:
      "Digital marketing guidance for small and growing businesses, including search, social, advertising, and measurement.",
  },
  {
    slug: "seo",
    name: "Search Engine Optimization",
    description:
      "Technical and content SEO for websites that deserve to be found.",
    seoDescription:
      "Technical and on-page SEO articles covering crawlability, metadata, local search, structured data, and sustainable organic growth.",
  },
  {
    slug: "business-growth",
    name: "Business Growth",
    description:
      "How digital decisions connect to sales, trust, and the practical work of building a company.",
    seoDescription:
      "Business growth articles about websites, digital presence, marketing budgets, and the decisions that help small companies grow.",
  },
  {
    slug: "linux-system-administration",
    name: "Linux & System Administration",
    description:
      "Server operations, troubleshooting, recovery, and the discipline behind dependable infrastructure.",
    seoDescription:
      "Linux server administration articles covering troubleshooting, recovery, configuration, and practical infrastructure operations.",
  },
  {
    slug: "bare-metal-infrastructure",
    name: "Bare-Metal Infrastructure",
    description:
      "Physical servers, hosting decisions, and the trade-offs behind owning the machine.",
    seoDescription:
      "Bare-metal infrastructure articles covering dedicated servers, VPS comparisons, setup, and operational trade-offs.",
  },
];

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryByName(name: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.name === name);
}

export function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
