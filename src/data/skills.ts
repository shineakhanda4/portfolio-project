import type { SkillCategory } from "@/types/content";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    slug: "frontend",
    title: "Frontend development",
    label: "01 — Interface",
    description:
      "Semantic, responsive interfaces built with modern JavaScript and component-driven architecture.",
    items: [
      {
        name: "HTML5",
        description: "Semantic structure, accessible document outlines, forms, and progressive enhancement.",
        icon: "html",
      },
      {
        name: "CSS3",
        description: "Layout, responsive systems, typography, motion, and careful visual craft.",
        icon: "css",
      },
      {
        name: "JavaScript",
        description: "Modern browser APIs, application logic, async workflows, and progressive enhancement.",
        icon: "javascript",
      },
      {
        name: "TypeScript",
        description: "Typed application code, safer refactors, clearer interfaces, and fewer runtime surprises.",
        icon: "typescript",
      },
      {
        name: "React.js",
        description: "Composable interfaces, state management, accessible interactions, and reusable components.",
        icon: "react",
      },
      {
        name: "Next.js",
        description: "Hybrid rendering, routing, image optimisation, metadata, and production web delivery.",
        icon: "nextjs",
      },
      {
        name: "Angular",
        description: "Structured frontend applications with components, services, dependency injection, and typed forms.",
        icon: "angular",
      },
    ],
  },
  {
    slug: "styling",
    title: "Styling & UI",
    label: "02 — Visual systems",
    description:
      "Design implementation with attention to hierarchy, consistency, accessibility, and maintainable style architecture.",
    items: [
      {
        name: "Tailwind CSS",
        description: "Utility-first styling with design tokens, responsive variants, and component-level consistency.",
        icon: "tailwind",
      },
      {
        name: "Bootstrap",
        description: "Production-ready responsive grids, navigation, forms, and accessible interface primitives.",
        icon: "bootstrap",
      },
      {
        name: "CSS",
        description: "Custom properties, flexbox, grid, container queries, fluid type, and layered architecture.",
        icon: "css",
      },
      {
        name: "HTML",
        description: "Structured content and accessible markup designed to work with browsers and assistive technology.",
        icon: "html",
      },
      {
        name: "Lucide React",
        description: "Consistent, accessible line icons for product and portfolio interfaces.",
        icon: "lucide",
      },
      {
        name: "shadcn/ui",
        description: "Accessible, composable primitives adapted to a project's own visual language when appropriate.",
        icon: "shadcn",
      },
    ],
  },
  {
    slug: "backend",
    title: "Backend development",
    label: "03 — Application",
    description:
      "APIs, content systems, and server-side logic sized to the actual needs of a project.",
    items: [
      {
        name: "Node.js",
        description: "Server-side JavaScript, build tooling, APIs, and integration work.",
        icon: "nodejs",
      },
      {
        name: "PHP",
        description: "Practical server-rendered applications, content systems, form handling, and existing-site maintenance.",
        icon: "php",
      },
      {
        name: "Hono",
        description: "Lightweight, standards-based HTTP applications suited to edge and serverless runtimes.",
        icon: "hono",
      },
    ],
  },
  {
    slug: "databases",
    title: "Databases",
    label: "04 — Data",
    description:
      "Structured storage choices made around the shape of the application, not a default stack.",
    items: [
      {
        name: "MongoDB",
        description: "Document storage for flexible content models and application data.",
        icon: "mongodb",
      },
      {
        name: "MySQL",
        description: "Relational data modelling, queries, indexing, and content-heavy application backends.",
        icon: "mysql",
      },
      {
        name: "PostgreSQL",
        description: "Relational modelling with strong constraints, SQL features, and dependable application data.",
        icon: "postgresql",
      },
    ],
  },
  {
    slug: "operating-systems",
    title: "Linux operating systems",
    label: "05 — Servers",
    description:
      "Hands-on Linux environments across the Debian/Ubuntu and RHEL family.",
    items: [
      {
        name: "Debian",
        description: "Stable server foundations, package management, services, and long-lived deployments.",
        icon: "debian",
      },
      {
        name: "Ubuntu",
        description: "Common cloud and bare-metal environments, LTS administration, and application hosting.",
        icon: "ubuntu",
      },
      {
        name: "AlmaLinux",
        description: "RHEL-compatible server administration for teams that need enterprise Linux stability.",
        icon: "almalinux",
      },
      {
        name: "CentOS",
        description: "Legacy and established server environments, maintenance, and migration awareness.",
        icon: "centos",
      },
      {
        name: "Red Hat Enterprise Linux",
        description: "RHEL administration concepts, system services, security, and package workflows.",
        icon: "rhel",
      },
      {
        name: "RHEL-based distributions",
        description: "Practical support across compatible enterprise Linux variants and their operational differences.",
        icon: "server",
      },
    ],
  },
  {
    slug: "infrastructure",
    title: "System administration & infrastructure",
    label: "06 — Operations",
    description:
      "The unglamorous work that keeps systems reachable, recoverable, and understood.",
    items: [
      {
        name: "Linux server setup",
        description: "Provisioning, hardening, users, services, firewalls, web servers, and deployment foundations.",
        icon: "terminal",
      },
      {
        name: "Bare-metal server setup",
        description: "Installing and configuring physical servers, storage, networking, and operating systems.",
        icon: "hard-drive",
      },
      {
        name: "Linux server administration",
        description: "Ongoing maintenance, package updates, monitoring, backups, and service management.",
        icon: "server",
      },
      {
        name: "Server troubleshooting",
        description: "Diagnosing boot, networking, storage, service, and performance problems methodically.",
        icon: "activity",
      },
      {
        name: "Linux recovery & rescue",
        description: "Approaching failed systems carefully, recovering access, and restoring services without guesswork.",
        icon: "life-buoy",
      },
      {
        name: "Configuration & maintenance",
        description: "Documented configuration, operational consistency, and reducing avoidable future failures.",
        icon: "wrench",
      },
    ],
  },
];
