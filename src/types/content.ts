export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  projectType: string;
  summary: string;
  description: string;
  objective: string;
  overview: string[];
  roleNote: string;
  stack: string[];
  highlights: string[];
  externalUrl: string;
  image: ImageAsset;
  ogImage?: string;
  index: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  deliverables: string[];
  process: Array<{ title: string; body: string }>;
  technologies: string[];
  idealFor: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedProjectSlugs: string[];
  relatedArticleSlugs: string[];
};

export type TechIconName =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "angular"
  | "tailwind"
  | "bootstrap"
  | "lucide"
  | "shadcn"
  | "nodejs"
  | "php"
  | "hono"
  | "mongodb"
  | "mysql"
  | "postgresql"
  | "debian"
  | "ubuntu"
  | "almalinux"
  | "centos"
  | "rhel"
  | "server"
  | "hard-drive"
  | "terminal"
  | "activity"
  | "wrench"
  | "life-buoy"
  | "shield";

export type TechItem = {
  name: string;
  description: string;
  icon: TechIconName;
};

export type SkillCategory = {
  slug: string;
  title: string;
  label: string;
  description: string;
  items: TechItem[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "facebook" | "x" | "discord" | "github" | "github-cave" | "linkedin" | "youtube";
};

export type Achievement = {
  value: string;
  label: string;
  detail: string;
};

export type BlogHeading = {
  id: string;
  text: string;
  depth: 2 | 3;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  updated: string;
  categorySlug: string;
  tags: string[];
  featured: boolean;
  cover: string;
  coverAlt: string;
  readingMinutes: number;
  wordCount: number;
  order: number;
};

export type BlogCategory = {
  slug: string;
  name: string;
  description: string;
  seoDescription: string;
};

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  articleTags?: string[];
};

export type RouteManifestItem = {
  path: string;
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  lastmod?: string;
  noindex?: boolean;
  sitemap?: boolean;
};

