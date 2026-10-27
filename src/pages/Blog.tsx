import { Rss, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BLOG_CATEGORIES, slugifyTag } from "@/data/blogTaxonomy";
import { getAllPosts, getFeaturedPosts } from "@/lib/blogMeta";
import { BlogCard } from "@/components/ui/BlogCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";

export function Blog() {
  const posts = getAllPosts();
  const featured = getFeaturedPosts(3);
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const incomingQuery = new URLSearchParams(location.search).get("q");
    setQuery(incomingQuery ?? "");
  }, [location.search]);

  const tags = useMemo(() => {
    const map = new Map<string, { label: string; slug: string; count: number }>();
    for (const post of posts) {
      for (const tag of post.tags) {
        const slug = slugifyTag(tag);
        const existing = map.get(slug);
        if (existing) existing.count += 1;
        else map.set(slug, { label: tag, slug, count: 1 });
      }
    }
    return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
  }, [posts]);

  const isFiltering = query.trim().length > 0 || activeCategory !== "all";
  const filteredPosts = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.categorySlug === activeCategory;
      if (!matchesCategory) return false;
      if (!term) return true;
      const haystack = [post.title, post.excerpt, post.description, ...post.tags].join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }, [activeCategory, posts, query]);

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Journal / Notes from the work"
          title={
            <>
              Useful thinking, <span className="italic text-muted">written down.</span>
            </>
          }
          intro={
            <p>
              Practical articles about building websites, choosing technology, earning attention,
              and keeping the systems underneath running. Written by Shine Akhanda, with an emphasis
              on decisions that survive contact with real projects.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">The archive</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <dt className="text-muted">Articles</dt>
                  <dd className="font-serif text-2xl">{posts.length}</dd>
                </div>
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <dt className="text-muted">Categories</dt>
                  <dd className="font-serif text-2xl">{BLOG_CATEGORIES.length}</dd>
                </div>
                <div className="flex items-baseline justify-between">
                  <dt className="text-muted">Author</dt>
                  <dd>Shine Akhanda</dd>
                </div>
              </dl>
              <a
                href="/rss.xml"
                className="link-underline eyebrow mt-5 text-ink"
                type="application/rss+xml"
              >
                RSS feed <Rss size={13} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          }
        />
      </div>

      {!isFiltering ? (
        <section className="container-editorial py-12 md:py-16">
          <div className="mb-7 flex items-center justify-between border-b border-line pb-3">
            <h2 className="eyebrow text-muted">Start here</h2>
            <span className="text-[0.62rem] uppercase tracking-[0.12em] text-muted">
              Featured reading
            </span>
          </div>
          <div className="grid gap-10 lg:grid-cols-12">
            {featured[0] ? (
              <div className="lg:col-span-7">
                <BlogCard post={featured[0]} variant="featured" priority />
              </div>
            ) : null}
            <div className="lg:col-span-5">
              {featured.slice(1).map((post) => (
                <BlogCard key={post.slug} post={post} variant="compact" />
              ))}
              <div className="border-t border-line pt-5">
                <p className="text-sm leading-7 text-muted">
                  New articles are added as the work produces useful lessons. No automated content
                  dumps, no keyword pages with nothing to say.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-editorial border-t border-line py-12 md:py-16" aria-labelledby="all-articles">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-muted">Archive</p>
            <h2 id="all-articles" className="display mt-3 text-[clamp(2.2rem,4.5vw,4rem)]">
              All <span className="italic">articles.</span>
            </h2>
          </div>
          <p className="text-xs text-muted" aria-live="polite">
            {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
          </p>
        </div>

        <div className="mt-8 grid gap-6 border-y border-line py-5 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <label htmlFor="journal-search" className="eyebrow text-muted">
              Search the journal
            </label>
            <div className="relative mt-2">
              <Search
                size={15}
                strokeWidth={1.5}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                aria-hidden="true"
              />
              <input
                id="journal-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="TypeScript, SEO, Linux..."
                className="form-field pl-9"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <p className="eyebrow text-muted">Filter by category</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setActiveCategory("all")}
                aria-pressed={activeCategory === "all"}
                className={`border px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                  activeCategory === "all"
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:border-ink hover:text-ink"
                }`}
              >
                All
              </button>
              {BLOG_CATEGORIES.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  onClick={() => setActiveCategory(category.slug)}
                  aria-pressed={activeCategory === category.slug}
                  className={`border px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] transition-colors ${
                    activeCategory === category.slug
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="mt-10 border border-line bg-paper-light p-8 text-center">
            <p className="font-serif text-2xl">No articles match that search.</p>
            <p className="mt-2 text-sm text-muted">
              Try a broader term or clear the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
              className="button-outline mt-5"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="border-y border-line bg-paper-light py-12 md:py-16">
        <div className="container-editorial">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-muted">Categories</p>
              <h2 className="display mt-3 text-[clamp(2.1rem,4.2vw,3.6rem)]">
                Browse by <span className="italic">discipline.</span>
              </h2>
            </div>
            <p className="max-w-sm text-xs leading-5 text-muted">
              Category archives are indexable. Tag archives exist for discovery but are excluded
              from the sitemap to avoid thin duplicate pages.
            </p>
          </div>
          <div className="mt-8 grid gap-x-8 gap-y-0 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_CATEGORIES.map((category) => {
              const count = posts.filter((post) => post.categorySlug === category.slug).length;
              return (
                <Link
                  key={category.slug}
                  to={`/blog/categories/${category.slug}`}
                  className="group flex items-start justify-between gap-5 border-b border-line py-4"
                >
                  <span>
                    <span className="block text-sm font-semibold transition-opacity group-hover:opacity-55">
                      {category.name}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-muted">{category.description}</span>
                  </span>
                  <span className="eyebrow shrink-0 text-muted">{String(count).padStart(2, "0")}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-editorial py-12">
        <div className="grid gap-8 border-t border-line pt-5 lg:grid-cols-12">
          <p className="eyebrow text-muted lg:col-span-2">Tags</p>
          <div className="flex flex-wrap gap-2 lg:col-span-8">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                to={`/blog/tags/${tag.slug}`}
                className="border border-line px-2.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:border-ink hover:text-ink"
              >
                {tag.label} <span className="text-muted">({tag.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
