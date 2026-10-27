import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPostDate, getCategoryName } from "@/lib/blogMeta";
import { cn } from "@/lib/utils";
import type { BlogPostSummary } from "@/types/content";

type BlogCardProps = {
  post: BlogPostSummary;
  variant?: "default" | "featured" | "compact";
  priority?: boolean;
};

export function BlogCard({ post, variant = "default", priority = false }: BlogCardProps) {
  if (variant === "compact") {
    return (
      <article className="group border-t border-line py-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-baseline">
          <div>
            <p className="eyebrow text-muted">
              {getCategoryName(post.categorySlug)} / {post.readingMinutes} min read
            </p>
            <h3 className="mt-2 max-w-xl font-serif text-2xl font-normal leading-tight tracking-[-0.02em]">
              <Link to={`/blog/${post.slug}`} className="transition-opacity hover:opacity-55">
                {post.title}
              </Link>
            </h3>
          </div>
          <span className="eyebrow text-muted">{formatPostDate(post.date)}</span>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex h-full flex-col border-t border-line pt-5",
        variant === "featured" && "md:border-t-0 md:pt-0",
      )}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block overflow-hidden border border-line bg-paper-deep"
        aria-label={`Read ${post.title}`}
      >
        <img
          src={post.cover}
          alt={post.coverAlt}
          width={1200}
          height={675}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={cn(
            "w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]",
            variant === "featured" ? "aspect-[16/10]" : "aspect-[16/10]",
          )}
        />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="eyebrow text-muted">
          {getCategoryName(post.categorySlug)}
          <span className="mx-2">/</span>
          {post.readingMinutes} min read
        </p>
        <h3
          className={cn(
            "mt-3 font-serif font-normal leading-[1.08] tracking-[-0.03em]",
            variant === "featured" ? "text-[clamp(2rem,4vw,3.4rem)]" : "text-[clamp(1.55rem,2.4vw,2.2rem)]",
          )}
        >
          <Link to={`/blog/${post.slug}`} className="transition-opacity hover:opacity-55">
            {post.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="eyebrow text-muted">{formatPostDate(post.date)}</span>
          <Link
            to={`/blog/${post.slug}`}
            className="link-underline eyebrow text-ink"
            aria-label={`Read ${post.title}`}
          >
            Read <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
