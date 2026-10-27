export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const MAIN_NAV: NavItem[] = [
  { label: "Work", href: "/projects", description: "Selected live projects" },
  { label: "About", href: "/about", description: "Background and approach" },
  { label: "Services", href: "/services", description: "How I can help" },
  { label: "Skills", href: "/skills", description: "Technology and infrastructure" },
  { label: "Journal", href: "/blog", description: "Notes, guides, and ideas" },
  { label: "Contact", href: "/contact", description: "Start a conversation" },
];

export const FOOTER_NAV: Array<{ title: string; items: NavItem[] }> = [
  {
    title: "Explore",
    items: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Selected work", href: "/projects" },
      { label: "Journal", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Practice",
    items: [
      { label: "Website development", href: "/services/website-development" },
      { label: "React & Next.js", href: "/services/react-nextjs-development" },
      { label: "Digital marketing", href: "/services/digital-marketing" },
      { label: "SEO services", href: "/services/seo-services" },
      { label: "Linux infrastructure", href: "/services/linux-infrastructure" },
    ],
  },
  {
    title: "More",
    items: [
      { label: "Skills & stack", href: "/skills" },
      { label: "Infrastructure", href: "/infrastructure" },
      { label: "All services", href: "/services" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];
