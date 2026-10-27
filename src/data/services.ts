import type { Service } from "@/types/content";

export const SERVICES: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    shortTitle: "Website development",
    eyebrow: "Design, build, ship",
    summary:
      "Business websites built around a clear purpose, a maintainable codebase, and the way real customers make decisions.",
    description:
      "Shine Akhanda builds custom business websites with modern frontend technology, practical content structure, and a strong performance and accessibility baseline.",
    seoTitle: "Website Development Services in Bangladesh — Shine Akhanda",
    seoDescription:
      "Custom website development in Mymensingh and Bangladesh. Shine Akhanda builds fast, accessible business websites that support real growth.",
    intro: [
      "A business website has to do more than look current. It needs to explain what the company offers, reduce uncertainty for a potential customer, and make the next step obvious. I start with those decisions before choosing components or writing a line of code.",
      "The result is a custom website built with a clear content structure, responsive layouts, semantic HTML, and a codebase that can be maintained after launch. Whether the project is a first professional presence or a replacement for an outdated site, the work is shaped around the business objective rather than a template.",
    ],
    deliverables: [
      "Content and page-structure planning",
      "Custom responsive interface design",
      "Frontend development with React, TypeScript, or a suitable static approach",
      "Contact, enquiry, and conversion flows",
      "Technical SEO foundations and structured metadata",
      "Performance, accessibility, and cross-device checks",
      "Deployment setup and launch support",
    ],
    process: [
      {
        title: "Clarify the job",
        body: "We define who the website serves, what visitors need to understand, and which actions matter. This prevents the visual design from arriving before the strategy.",
      },
      {
        title: "Structure the content",
        body: "Page outlines, messaging hierarchy, and internal links are planned before implementation. Good content architecture makes both the design and the SEO work easier.",
      },
      {
        title: "Design and build",
        body: "The interface is designed and implemented as one coherent system: typography, spacing, components, responsive states, interactions, and accessible markup.",
      },
      {
        title: "Test and launch",
        body: "The production build is checked across routes and screen sizes, then deployed with canonical URLs, sitemap, robots.txt, analytics readiness, and a documented handover.",
      },
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "HTML5", "CSS3", "PHP", "Cloudflare"],
    idealFor: [
      "Small and growing businesses that need a credible first website",
      "Organizations replacing an outdated or difficult-to-maintain site",
      "Service businesses that depend on enquiries and trust",
      "Companies that need a stronger performance and SEO foundation",
    ],
    faqs: [
      {
        question: "How much does a business website cost?",
        answer:
          "Scope determines the cost. Shine Akhanda's completed project experience includes work with budgets starting around ৳20,000 BDT, but a custom quotation depends on page count, content, functionality, and integrations.",
      },
      {
        question: "Can you work with a business anywhere in Bangladesh?",
        answer:
          "Yes. The base is in Mymensingh, and the project process is designed to work remotely with clients elsewhere in Bangladesh and abroad.",
      },
      {
        question: "Do you use templates?",
        answer:
          "The implementation is custom, although appropriate open-source libraries and accessible UI primitives may be used where they reduce unnecessary work. The goal is a site that fits the business rather than a reused generic layout.",
      },
      {
        question: "What happens after launch?",
        answer:
          "The handover includes the deployment configuration and documentation needed to maintain the site. Ongoing changes can be discussed separately.",
      },
    ],
    relatedProjectSlugs: ["hylic-sketch", "moushafi-hospital", "wig-vend"],
    relatedArticleSlugs: [
      "choosing-the-right-technology-stack",
      "business-website-mistakes",
      "technical-seo-fundamentals",
    ],
  },
  {
    slug: "react-nextjs-development",
    title: "React & Next.js Development",
    shortTitle: "React & Next.js",
    eyebrow: "Modern frontend",
    summary:
      "Typed, component-driven frontends for websites and applications that need more than a simple page builder can offer.",
    description:
      "React and Next.js development with TypeScript, thoughtful state management, accessible interactions, and production-focused performance.",
    seoTitle: "React & Next.js Developer in Bangladesh — Shine Akhanda",
    seoDescription:
      "Hire a React and Next.js developer in Bangladesh. Shine Akhanda builds typed, accessible, high-performance frontends and business applications.",
    intro: [
      "React is a good fit when an interface has reusable parts, meaningful interaction, or data that changes. Next.js adds routing, rendering choices, image handling, and deployment conventions for projects that benefit from a fuller framework.",
      "I use TypeScript across these projects and keep the architecture proportional to the problem. A marketing site does not need the same state model as a dashboard, and a small team does not benefit from layers of abstraction it will never maintain.",
    ],
    deliverables: [
      "React and Next.js application development",
      "TypeScript interfaces and application architecture",
      "Reusable component systems and design implementation",
      "API integration and typed data flows",
      "Routing, rendering, and page metadata",
      "Performance profiling and production build optimisation",
      "Accessible interactive states and reduced-motion support",
    ],
    process: [
      {
        title: "Choose the rendering model",
        body: "Not every project needs the same Next.js strategy. Marketing pages, authenticated views, and frequently updated data can have different requirements.",
      },
      {
        title: "Model the data",
        body: "Types, boundaries, and component contracts are designed before the interface grows around them.",
      },
      {
        title: "Build accessible components",
        body: "Interactions are implemented with keyboard use, focus states, reduced motion, and semantic structure in mind.",
      },
      {
        title: "Measure the production build",
        body: "The result is checked in its built form, not only in development, with attention to bundle size, images, and route behaviour.",
      },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Node.js", "Hono"],
    idealFor: [
      "Companies with a frontend that has outgrown a page builder",
      "SaaS marketing sites and lightweight product interfaces",
      "Businesses that need typed integrations with an API or CMS",
      "Teams looking for maintainable React architecture",
    ],
    faqs: [
      {
        question: "Should I choose React or Next.js?",
        answer:
          "Next.js is usually a better starting point for public, content-heavy websites that benefit from routing, metadata, image optimisation, and prerendering. Plain React is often enough for a smaller embedded interface or an application that does not need those features.",
      },
      {
        question: "Do you use TypeScript on every project?",
        answer:
          "TypeScript is the default for application code because it makes data contracts and refactors clearer. A small static site may not need the same level of type machinery.",
      },
      {
        question: "Can you improve an existing React codebase?",
        answer:
          "Yes, provided the current architecture can be understood and tested. The first step is identifying whether the larger risk is performance, accessibility, maintainability, or product scope.",
      },
    ],
    relatedProjectSlugs: ["hylic-sketch", "wig-vend"],
    relatedArticleSlugs: ["react-vs-nextjs", "why-typescript-matters", "website-performance-optimization"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    shortTitle: "Digital marketing",
    eyebrow: "Attention to action",
    summary:
      "Practical search, social, and paid marketing for businesses that need a measurable return from a limited budget.",
    description:
      "Digital marketing services focused on campaign structure, useful creative, landing-page alignment, and measurement that supports better decisions.",
    seoTitle: "Digital Marketing Services in Bangladesh — Shine Akhanda",
    seoDescription:
      "Digital marketing in Bangladesh with a focus on budget-conscious campaigns, search visibility, Facebook and Google advertising, and measurable business outcomes.",
    intro: [
      "Digital marketing works best when the message, the destination, and the measurement agree. A strong ad sent to a confusing page, or a beautiful website with no acquisition plan, leaves value on the table.",
      "I approach marketing as a system: a clear audience, a relevant offer, content and creative that earn attention, landing pages that reduce friction, and reporting that answers what happened. For smaller budgets, focus matters more than channel count.",
    ],
    deliverables: [
      "Campaign objective and audience planning",
      "Facebook and Google advertising setup guidance",
      "Landing-page and offer alignment",
      "Content planning for organic discovery",
      "Conversion tracking and campaign measurement",
      "Search visibility and local marketing coordination",
      "Budget allocation and iteration recommendations",
    ],
    process: [
      {
        title: "Define the outcome",
        body: "A lead, a call, a sale, and brand awareness require different creative, landing pages, and success metrics.",
      },
      {
        title: "Build the route",
        body: "The campaign promise is matched to a focused page with a clear next step. Tracking is checked before spend begins.",
      },
      {
        title: "Run a controlled test",
        body: "Small budgets reveal which audience and message deserve more investment. Broad assumptions are not treated as evidence.",
      },
      {
        title: "Read the data",
        body: "Reports are reviewed for cost, quality, and follow-through. Decisions are documented so the next cycle starts informed.",
      },
    ],
    technologies: ["Google Ads", "Meta Ads", "Google Analytics", "Search Console", "SEO", "Content Strategy"],
    idealFor: [
      "Local service businesses that need a steadier enquiry flow",
      "Small teams with limited advertising budgets",
      "Companies whose website gets traffic but few enquiries",
      "Businesses entering a new market or launching a service",
    ],
    faqs: [
      {
        question: "How much should a small business spend on advertising?",
        answer:
          "There is no universal figure. A useful starting budget is large enough to test a focused audience over a meaningful period without risking money the business cannot afford to learn from. The offer and margin matter more than a percentage rule.",
      },
      {
        question: "Which is better, SEO or paid advertising?",
        answer:
          "They solve different time problems. Paid advertising can produce faster feedback; SEO builds a slower, compounding asset. A business often benefits from both, but not necessarily at the same intensity.",
      },
      {
        question: "Do you guarantee sales or leads?",
        answer:
          "No. Marketing outcomes depend on the offer, market, competition, budget, sales process, and time. What can be controlled is the quality of the setup, the clarity of the measurement, and the speed of learning.",
      },
    ],
    relatedProjectSlugs: ["moushafi-hospital", "wig-vend"],
    relatedArticleSlugs: [
      "digital-marketing-limited-budgets",
      "seo-for-businesses-in-bangladesh",
      "business-website-mistakes",
    ],
  },
  {
    slug: "seo-services",
    title: "SEO Services",
    shortTitle: "SEO",
    eyebrow: "Earned visibility",
    summary:
      "Technical, local, and content SEO that makes a website easier to crawl, understand, and choose.",
    description:
      "SEO services covering technical foundations, page-level metadata, local relevance, content architecture, structured data, and search performance measurement.",
    seoTitle: "SEO Services in Mymensingh & Bangladesh — Shine Akhanda",
    seoDescription:
      "Technical, local, and content SEO services for businesses in Mymensingh and Bangladesh. Build a crawlable, trustworthy website and measure real search performance.",
    intro: [
      "SEO is not a plugin or a block of keywords. Search engines need to crawl the site, understand what each page is for, and find enough evidence that the page deserves to be shown. Visitors need the page to answer their question once they arrive.",
      "The work therefore spans rendering, URLs, metadata, internal links, content quality, structured data, performance, and measurement. For local businesses, it also includes consistent contact information and genuine local relevance — not hundreds of near-duplicate city pages.",
    ],
    deliverables: [
      "Technical crawl and indexation review",
      "Title, description, and heading architecture",
      "Canonical, sitemap, robots.txt, and redirect checks",
      "Schema.org structured data",
      "Local SEO foundations for Mymensingh businesses",
      "Blog and content-cluster planning",
      "Core Web Vitals coordination",
      "Search Console and Bing Webmaster Tools setup guidance",
    ],
    process: [
      {
        title: "Audit the foundation",
        body: "Rendering, crawlability, canonicals, metadata, and duplicate routes are checked before content expansion.",
      },
      {
        title: "Map intent to pages",
        body: "Each important page gets a clear search purpose. Keywords are grouped by intent rather than forced into every paragraph.",
      },
      {
        title: "Improve the evidence",
        body: "Useful content, project detail, internal links, structured data, and genuine local information make the site easier to trust.",
      },
      {
        title: "Measure and refine",
        body: "Search Console data reveals which queries, pages, and snippets are working, and where the next content opportunity is.",
      },
    ],
    technologies: ["Technical SEO", "Schema.org", "Search Console", "Analytics", "Core Web Vitals", "Content Strategy"],
    idealFor: [
      "Businesses with a website that is not appearing in search",
      "Local companies targeting Mymensingh and Bangladesh",
      "Organizations planning a content or blog programme",
      "Sites with technical indexing or canonical problems",
    ],
    faqs: [
      {
        question: "Can you guarantee first-page rankings?",
        answer:
          "No. Rankings depend on competition, authority, content quality, technical health, user behaviour, and time. A credible programme improves the foundations and measures progress instead of promising a fixed position.",
      },
      {
        question: "How long does SEO take?",
        answer:
          "Technical fixes can be quick, but search visibility is cumulative. New pages need to be discovered, indexed, and tested against real queries. Meaningful movement usually requires sustained work rather than a one-week intervention.",
      },
      {
        question: "Do you build backlinks?",
        answer:
          "The focus is on legitimate discoverability, useful content, and profiles that genuinely represent the business. Manipulative link schemes are not part of the service.",
      },
    ],
    relatedProjectSlugs: ["moushafi-hospital", "madinatul-quran"],
    relatedArticleSlugs: [
      "technical-seo-fundamentals",
      "seo-for-businesses-in-bangladesh",
      "website-performance-optimization",
    ],
  },
  {
    slug: "linux-infrastructure",
    title: "Linux Server & Infrastructure",
    shortTitle: "Linux infrastructure",
    eyebrow: "The systems layer",
    summary:
      "Linux server setup, administration, troubleshooting, and recovery for teams that need the machine underneath the website to be dependable.",
    description:
      "Linux and bare-metal infrastructure support covering server setup, configuration, troubleshooting, recovery, and routine maintenance.",
    seoTitle: "Linux Server Setup, Recovery & Administration — Shine Akhanda",
    seoDescription:
      "Linux server administration in Bangladesh: bare-metal setup, troubleshooting, rescue and recovery, configuration, and routine maintenance by Shine Akhanda.",
    intro: [
      "Websites are usually discussed at the browser layer, but the operational layer is where many failures begin: a full disk, an expired certificate, a broken firewall rule, a service that will not restart, or a boot process that never reaches the login prompt.",
      "I work with Debian/Ubuntu and RHEL-family systems, from fresh server setup to diagnosing production problems and recovering access to a failed machine. The emphasis is on careful evidence gathering, reversible changes, and documentation rather than applying commands until something happens to work.",
    ],
    deliverables: [
      "Linux server provisioning and baseline hardening",
      "Bare-metal installation and configuration",
      "Web server, database, DNS, and service setup",
      "Firewall, user, SSH, and access review",
      "Boot, storage, networking, and service troubleshooting",
      "Rescue and recovery support for failed systems",
      "Backup, update, and maintenance planning",
    ],
    process: [
      {
        title: "Establish access and evidence",
        body: "The current state is recorded before changes are made. Logs, disk usage, services, network state, and recent changes provide the starting point.",
      },
      {
        title: "Protect what still works",
        body: "Backups, console access, and recovery paths are considered before risky maintenance. A fix that removes the ability to recover is not a fix.",
      },
      {
        title: "Diagnose the actual failure",
        body: "Symptoms are separated from causes. Assumptions are tested with the least disruptive command that can confirm or reject them.",
      },
      {
        title: "Restore, document, and prevent",
        body: "Service is restored, the cause is explained, and the configuration or monitoring gap that allowed the failure is addressed.",
      },
    ],
    technologies: ["Debian", "Ubuntu", "AlmaLinux", "CentOS", "RHEL", "nginx", "Apache", "Bash", "SSH"],
    idealFor: [
      "Businesses inheriting an undocumented Linux server",
      "Teams that need a bare-metal machine configured correctly",
      "Sites recovering from a failed service or lost access",
      "Organizations that need practical maintenance without a full-time sysadmin",
    ],
    faqs: [
      {
        question: "Do you work on production servers?",
        answer:
          "Yes, with a clear scope, current backup status, and an agreed maintenance window where possible. Destructive commands are not used as a shortcut without understanding the recovery path.",
      },
      {
        question: "Can you recover a server that will not boot?",
        answer:
          "Often, but the outcome depends on the failure, available console access, storage health, and backups. A rescue attempt starts with diagnosis and the least invasive recovery option.",
      },
      {
        question: "Which Linux distributions do you support?",
        answer:
          "Practical experience spans Debian, Ubuntu, AlmaLinux, CentOS, RHEL, and compatible distributions. The right choice depends on support requirements, team familiarity, and application constraints.",
      },
    ],
    relatedProjectSlugs: ["moushafi-hospital", "wig-vend"],
    relatedArticleSlugs: ["linux-server-troubleshooting", "bare-metal-vs-vps"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
