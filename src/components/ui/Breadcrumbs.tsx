import { ChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  tone?: "light" | "dark";
  className?: string;
};

export function Breadcrumbs({ items, tone = "light", className }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
        tone === "dark" ? "text-paper/50" : "text-muted",
        className,
      )}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <Fragment key={`${item.label}-${index}`}>
              <li>
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className={cn(
                      "transition-colors",
                      tone === "dark" ? "hover:text-paper" : "hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={tone === "dark" ? "text-paper/70" : "text-ink"}
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden="true">
                  <ChevronRight size={12} strokeWidth={1.5} />
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
