import type { Achievement, SocialLink } from "@/types/content";

const configuredUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE = {
  name: "Shine Akhanda",
  shortName: "Shine Akhanda",
  url: (configuredUrl || "https://shineakhanda.dev").replace(/\/$/, ""),
  title: "Web Developer & Digital Marketing Expert",
  tagline: "Web development is my profession; system administration is my passion.",
  description:
    "Shine Akhanda is a web developer, digital marketing expert, and founder of Cave Technologies in Mymensingh, Bangladesh. He builds business websites and helps organizations grow online.",
  location: {
    city: "Mymensingh",
    country: "Bangladesh",
    display: "Mymensingh, Bangladesh",
  },
  phone: {
    display: "+8801302776234",
    href: "tel:+8801302776234",
    e164: "+8801302776234",
  },
  email: {
    display: "me@shineakhanda.dev",
    href: "mailto:me@shineakhanda.dev",
  },
  company: {
    name: "Cave Technologies",
    role: "Founder & CEO",
    description:
      "Cave Technologies is a business-building agency focused on websites, digital marketing, online advertising, and sustainable digital growth.",
  },
  portrait: {
    src: "/images/shine-akhanda-portrait.webp",
    fallback: "/images/shine-akhanda.jpg",
    alt: "Illustrated portrait of Shine Akhanda, web developer and founder of Cave Technologies",
    width: 512,
    height: 512,
  },
  defaultImage: "/images/og-default.jpg",
  defaultImageAlt: "Shine Akhanda — web developer and digital marketing expert in Bangladesh",
  currentYear: 2026,
  languages: ["English", "Bangla"],
} as const;

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://fb.me/shine1920.me",
    icon: "facebook",
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/shine1920e",
    icon: "x",
  },
  {
    label: "GitHub — Shine Akhanda",
    href: "https://github.com/shineakhanda4",
    icon: "github",
  },
  {
    label: "GitHub — Cave Technologies",
    href: "https://github.com/caveweb1920",
    icon: "github-cave",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/shineakhanda",
    icon: "linkedin",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@lws-1920",
    icon: "youtube",
  },
  {
    label: "Discord",
    href: "https://discord.com/users/1289181620653396100",
    icon: "discord",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    value: "25+",
    label: "Client projects",
    detail: "Websites and digital work delivered across different business needs.",
  },
  {
    value: "7+",
    label: "Companies helped",
    detail: "Sales-focused support through practical, budget-conscious marketing.",
  },
  {
    value: "4",
    label: "Selected live projects",
    detail: "Public work spanning architecture, healthcare, education, and manufacturing.",
  },
  {
    value: "1",
    label: "Company founded",
    detail: "Cave Technologies, built to help organizations establish and grow online.",
  },
];

export const EXPERTISE = [
  {
    number: "01",
    title: "Web development",
    body: "Modern, fast, maintainable websites built with React, TypeScript, Next.js, and a practical approach to the business problem behind the interface.",
    href: "/services/website-development",
    linkLabel: "Website development",
  },
  {
    number: "02",
    title: "Digital marketing",
    body: "Search, social, and paid campaigns designed around clear objectives, careful budgets, and measurable business outcomes rather than vanity metrics.",
    href: "/services/digital-marketing",
    linkLabel: "Digital marketing",
  },
  {
    number: "03",
    title: "Linux infrastructure",
    body: "Bare-metal servers, Linux administration, and recovery work — the systems layer that keeps a website dependable after launch.",
    href: "/services/linux-infrastructure",
    linkLabel: "Linux infrastructure",
  },
] as const;

export const PRINCIPLES = [
  {
    title: "Business before decoration",
    body: "A website is a working asset. Clarity, trust, and conversion matter more than adding another effect for its own sake.",
  },
  {
    title: "Simple systems last longer",
    body: "I prefer maintainable architectures, honest content, and tools that a business can keep using without unnecessary operational weight.",
  },
  {
    title: "Performance is part of design",
    body: "Fast delivery, accessible interfaces, sensible image budgets, and stable layouts are design decisions, not afterthoughts.",
  },
  {
    title: "Own the whole problem",
    body: "From the first content structure to DNS, email, server recovery, and search visibility, the useful work rarely stops at the browser.",
  },
] as const;
