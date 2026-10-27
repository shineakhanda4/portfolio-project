import { PROJECTS, getProjectBySlug } from "@/data/projects";
import { getServiceBySlug } from "@/data/services";
import { getCategoryBySlug, slugifyTag } from "@/data/blogTaxonomy";
import { SITE } from "@/data/site";
import { getPostBySlug, getPostsByTag } from "@/lib/blogMeta";
import { stripTrailingSlash } from "@/lib/utils";
import type { PageSeo } from "@/types/content";

function normalisePath(pathname: string): string {
  const cleaned = stripTrailingSlash(pathname.split("?")[0].split("#")[0]);
  return cleaned === "" ? "/" : cleaned;
}

export function getPageSeo(inputPath: string): PageSeo {
  const path = normalisePath(inputPath);

  if (path === "/") {
    return {
      title: "Shine Akhanda | Web Developer & Digital Marketing Expert",
      description:
        "Shine Akhanda is a web developer, digital marketing expert, and founder of Cave Technologies in Mymensingh, Bangladesh. Explore selected work and services.",
      path,
      type: "website",
      image: SITE.defaultImage,
      imageAlt: SITE.defaultImageAlt,
    };
  }

  if (path === "/about") {
    return {
      title: "About Shine Akhanda | Developer, Founder & Linux Enthusiast",
      description:
        "The professional background of Shine Akhanda: web development, digital marketing, Cave Technologies leadership, and hands-on Linux infrastructure experience.",
      path,
      type: "profile",
      image: SITE.defaultImage,
      imageAlt: SITE.defaultImageAlt,
    };
  }

  if (path === "/projects") {
    return {
      title: "Selected Projects | Shine Akhanda — Web Developer in Bangladesh",
      description:
        "Explore selected live websites by Shine Akhanda across architecture, healthcare, education, and international manufacturing — with verified details and project context.",
      path,
      image: PROJECTS[0]?.image.src,
      imageAlt: PROJECTS[0]?.image.alt,
    };
  }

  if (path.startsWith("/projects/")) {
    const slug = path.split("/")[2] ?? "";
    const project = getProjectBySlug(slug);
    if (!project) return notFoundSeo(path);
    return {
      title: `${project.title} — ${project.category} Website | Shine Akhanda`,
      description: project.summary,
      path,
      image: project.ogImage ?? project.image.src,
      imageAlt: project.image.alt,
    };
  }

  if (path === "/skills") {
    return {
      title: "Skills & Technology Stack | Shine Akhanda",
      description:
        "Shine Akhanda's stack spans React, Next.js, TypeScript, Angular, Node.js, Hono, PHP, databases, and Debian, Ubuntu, AlmaLinux, CentOS, and RHEL.",
      path,
    };
  }

  if (path === "/services") {
    return {
      title: "Web Development & Digital Marketing Services | Shine Akhanda",
      description:
        "Website development, React and Next.js engineering, digital marketing, SEO, and Linux infrastructure services from Shine Akhanda in Mymensingh, Bangladesh.",
      path,
    };
  }

  if (path.startsWith("/services/")) {
    const slug = path.split("/")[2] ?? "";
    const service = getServiceBySlug(slug);
    if (!service) return notFoundSeo(path);
    return {
      title: service.seoTitle,
      description: service.seoDescription,
      path,
    };
  }

  if (path === "/blog") {
    return {
      title: "Journal — Web Development, Marketing & Linux | Shine Akhanda",
      description:
        "Practical articles by Shine Akhanda on web development, React and Next.js, TypeScript, backend engineering, digital marketing, SEO, and Linux server administration.",
      path,
      type: "website",
    };
  }

  if (path.startsWith("/blog/categories/")) {
    const slug = path.split("/")[3] ?? "";
    const category = getCategoryBySlug(slug);
    if (!category) return notFoundSeo(path);
    return {
      title: `${category.name} Articles | Shine Akhanda Journal`,
      description: category.seoDescription,
      path,
      type: "website",
    };
  }

  if (path.startsWith("/blog/tags/")) {
    const slug = path.split("/")[3] ?? "";
    const posts = getPostsByTag(slug);
    if (posts.length === 0) return notFoundSeo(path);
    const tag = posts[0]?.tags.find((item) => slugifyTag(item) === slug) ?? slug;
    return {
      title: `Tagged: ${tag} | Shine Akhanda Journal`,
      description: `Articles tagged ${tag} from Shine Akhanda's journal on web development, digital marketing, and infrastructure.`,
      path,
      noindex: true,
    };
  }

  if (path.startsWith("/blog/")) {
    const slug = path.split("/")[2] ?? "";
    const post = getPostBySlug(slug);
    if (!post) return notFoundSeo(path);
    return {
      title: post.title.length > 52 ? post.title : `${post.title} | Shine Akhanda`,
      description: post.description,
      path,
      type: "article",
      image: post.cover,
      imageAlt: post.coverAlt,
      publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(),
      modifiedTime: new Date(`${post.updated}T00:00:00Z`).toISOString(),
      articleTags: post.tags,
    };
  }

  if (path === "/infrastructure") {
    return {
      title: "Linux & Bare-Metal Infrastructure | Shine Akhanda",
      description:
        "Linux server setup, bare-metal infrastructure, troubleshooting, and recovery experience from Shine Akhanda — the systems work behind dependable websites.",
      path,
    };
  }

  if (path === "/contact") {
    return {
      title: "Contact Shine Akhanda | Web Developer in Mymensingh",
      description:
        "Contact Shine Akhanda for web development, digital marketing, SEO, or Linux infrastructure work. Call +8801302776234, email me@shineakhanda.dev, or use the enquiry form.",
      path,
    };
  }

  if (path === "/privacy") {
    return {
      title: "Privacy | Shine Akhanda",
      description:
        "How this portfolio handles contact-form information, hosting logs, external links, and privacy choices.",
      path,
      noindex: true,
    };
  }

  return notFoundSeo(path);
}

export function notFoundSeo(path: string): PageSeo {
  return {
    title: "Page Not Found | Shine Akhanda",
    description: "The page you requested could not be found. Explore Shine Akhanda's selected work, services, and journal instead.",
    path,
    noindex: true,
  };
}

export function getSeoAlternates(path: string): Array<{ hreflang: string; href: string }> {
  return [{ hreflang: "en-BD", href: `${SITE.url}${path === "/" ? "/" : path}` }];
}
