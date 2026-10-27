import type { IconType } from "react-icons";
import {
  FaDiscord,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { SOCIAL_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types/content";

const SOCIAL_ICONS: Record<SocialLink["icon"], IconType> = {
  facebook: FaFacebookF,
  x: FaXTwitter,
  discord: FaDiscord,
  github: FaGithub,
  "github-cave": FaGithub,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

type SocialLinksProps = {
  tone?: "light" | "dark";
  showLabels?: boolean;
  className?: string;
  linkClassName?: string;
};

export function SocialLinks({
  tone = "light",
  showLabels = false,
  className,
  linkClassName,
}: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {SOCIAL_LINKS.map((link) => {
        const Icon = SOCIAL_ICONS[link.icon];
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className={cn(
                "group inline-flex items-center gap-2 border p-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.12em] transition-colors",
                tone === "dark"
                  ? "border-line-dark text-paper/65 hover:border-paper/50 hover:text-paper"
                  : "border-line text-muted hover:border-ink hover:text-ink",
                showLabels && "px-3",
                linkClassName,
              )}
            >
              <Icon size={14} aria-hidden="true" />
              {showLabels ? <span>{link.label}</span> : null}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
