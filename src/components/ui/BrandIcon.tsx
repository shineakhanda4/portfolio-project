import {
  Activity,
  HardDrive,
  LifeBuoy,
  Server,
  ShieldCheck,
  SquareTerminal,
  Wrench,
} from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiAlmalinux,
  SiAngular,
  SiBootstrap,
  SiCentos,
  SiCss,
  SiDebian,
  SiHono,
  SiHtml5,
  SiJavascript,
  SiLucide,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiRedhat,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiUbuntu,
} from "react-icons/si";
import type { TechIconName } from "@/types/content";

const BRAND_ICONS: Record<
  Exclude<TechIconName, "server" | "hard-drive" | "terminal" | "activity" | "wrench" | "life-buoy" | "shield">,
  IconType
> = {
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  angular: SiAngular,
  tailwind: SiTailwindcss,
  bootstrap: SiBootstrap,
  lucide: SiLucide,
  shadcn: SiShadcnui,
  nodejs: SiNodedotjs,
  php: SiPhp,
  hono: SiHono,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  debian: SiDebian,
  ubuntu: SiUbuntu,
  almalinux: SiAlmalinux,
  centos: SiCentos,
  rhel: SiRedhat,
};

const LUCIDE_ICONS = {
  server: Server,
  "hard-drive": HardDrive,
  terminal: SquareTerminal,
  activity: Activity,
  wrench: Wrench,
  "life-buoy": LifeBuoy,
  shield: ShieldCheck,
} as const;

type BrandIconProps = {
  name: TechIconName;
  size?: number;
  className?: string;
};

export function BrandIcon({ name, size = 22, className }: BrandIconProps) {
  if (name in LUCIDE_ICONS) {
    const Icon = LUCIDE_ICONS[name as keyof typeof LUCIDE_ICONS];
    return <Icon size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
  }

  const Icon = BRAND_ICONS[name as keyof typeof BRAND_ICONS];
  return <Icon size={size} className={className} aria-hidden="true" />;
}
