import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "inverse";
  external?: boolean;
  className?: string;
  icon?: ReactNode;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external,
  className,
  icon,
}: ButtonLinkProps) {
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  const classes = cn(
    variant === "primary" ? "button-primary" : variant === "inverse" ? "button-inverse" : "button-outline",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon ?? <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden="true" />}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={classes}>
      {content}
    </Link>
  );
}
