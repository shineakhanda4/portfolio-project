import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { label: string; href: string };
  className?: string;
  tone?: "light" | "dark";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  link,
  className,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "grid gap-8 border-t pt-5 md:grid-cols-12 md:gap-6",
        tone === "dark" ? "border-line-dark" : "border-line",
        className,
      )}
    >
      <div className="md:col-span-3">
        <p
          className={cn(
            "eyebrow flex items-center gap-3",
            tone === "dark" ? "text-paper/60" : "text-muted",
          )}
        >
          {index ? <span>{index}</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      </div>
      <div className="md:col-span-6">
        <h2
          className={cn(
            "display text-[clamp(2.2rem,5vw,4.2rem)]",
            tone === "dark" ? "text-paper" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-sm leading-7",
              tone === "dark" ? "text-paper/60" : "text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {link ? (
        <div className="flex items-start md:col-span-3 md:justify-end">
          <Link
            to={link.href}
            className={cn(
              "link-underline eyebrow",
              tone === "dark" ? "text-paper/70" : "text-ink",
            )}
          >
            {link.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
