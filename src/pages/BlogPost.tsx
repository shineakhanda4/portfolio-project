import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getCategoryBySlug, slugifyTag } from "@/data/blogTaxonomy";
import { SITE } from "@/data/site";
import {
  formatPostDate,
  getAdjacentPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blogMeta";
import { getPostContent } from "@/lib/blogContent";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BlogCard } from "@/components/ui/BlogCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { NotFound } from "@/pages/NotFound";

export function BlogPost() {
  const { slug = "" } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  const content = getPostContent(post.slug);
  if (!content) {
    return <NotFound />;
  }

  const category = getCategoryBySlug(post.categorySlug);
  const { previous, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post, 3);
  const showToc = content.headings.length >= 3;
  const wasUpdated = post.updated !== post.date;

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Journal", href: "/blog" },
            ...(category ? [{ label: category.name, href: `/blog/categories/${category.slug}` }] : []),
            { label: post.title },
          ]}
        />
      </div>

      <article>
        <header className="container-editorial pb-10 pt-10 md:pb-14 md:pt-16">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-9">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {category ? (
                  <Link
                    to={`/blog/categories/${category.slug}`}
                    className="eyebrow text-muted transition-colors hover:text-ink"
                  >
                    {category.name}
                  </Link>
                ) : null}
                <span className="hidden h-3 w-px bg-line sm:block" aria-hidden="true" />
                <span className="flex items-center gap-1.5 text-[0.63rem] uppercase tracking-[0.12em] text-muted">
                  <Clock3 size={12} strokeWidth={1.5} aria-hidden="true" />
                  {post.readingMinutes} min read
                </span>
              </div>
              <h1 className="display mt-6 max-w-5xl text-[clamp(2.9rem,7vw,7rem)]">{post.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{post.excerpt}</p>
            </div>
            <div className="lg:col-span-3">
              <div className="border-t border-ink pt-4 text-xs">
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <span className="text-muted">Author</span>
                  <span>{SITE.name}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-3 pt-3">
                  <span className="text-muted">Published</span>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </div>
                <div className="flex justify-between gap-4 pt-3">
                  <span className="text-muted">{wasUpdated ? "Updated" : "Edition"}</span>
                  <time dateTime={post.updated}>
                    {wasUpdated ? formatPostDate(post.updated) : "Launch edition"}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </header>

        <figure className="container-editorial">
          <div className="overflow-hidden border border-line bg-paper-deep">
            <img
              src={post.cover}
              alt={post.coverAlt}
              width={1200}
              height={675}
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/8] w-full object-cover"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-4 border-t border-line pt-3 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
            <span>Shine Akhanda / Journal</span>
            <span>{category?.name}</span>
          </figcaption>
        </figure>

        <section className="container-editorial py-12 md:py-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <aside className="order-2 lg:order-1 lg:col-span-2">
              <div className="lg:sticky lg:top-28">
                <ShareLinks title={post.title} path={`/blog/${post.slug}`} />
              </div>
            </aside>

            <div className="order-1 lg:order-2 lg:col-span-7">
              {showToc ? (
                <details className="mb-8 border border-line bg-paper-light p-5 lg:hidden">
                  <summary className="eyebrow cursor-pointer list-none text-ink [&::-webkit-details-marker]:hidden">
                    Table of contents
                  </summary>
                  <ol className="mt-4 space-y-2">
                    {content.headings.map((heading) => (
                      <li key={heading.id} className={heading.depth === 3 ? "pl-4" : undefined}>
                        <a
                          href={`#${heading.id}`}
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </details>
              ) : null}

              <div className="article-prose" dangerouslySetInnerHTML={{ __html: content.html }} />

              <div className="mt-12 border-t border-line pt-5">
                <p className="eyebrow text-muted">Filed under</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {category ? (
                    <Link
                      to={`/blog/categories/${category.slug}`}
                      className="border border-ink bg-ink px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-paper"
                    >
                      {category.name}
                    </Link>
                  ) : null}
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/blog/tags/${slugifyTag(tag)}`}
                      className="border border-line px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:border-ink hover:text-ink"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 border border-line bg-paper-light p-5">
                <p className="text-xs leading-6 text-muted">
                  This is an educational article, not a client case study. Examples are illustrative
                  unless they link to a documented project. For verified project context, see the{" "}
                  <Link to="/projects" className="underline underline-offset-2 hover:text-ink">
                    selected work
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={SITE.portrait.src}
                    alt=""
                    width={48}
                    height={48}
                    loading="lazy"
                    className="h-12 w-12 rounded-full border border-line object-cover object-center"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold">{SITE.name}</p>
                    <p className="text-xs text-muted">
                      Web developer, digital marketer, founder of Cave Technologies.
                    </p>
                  </div>
                </div>
                <ButtonLink href="/contact" variant="outline">
                  Discuss a project
                </ButtonLink>
              </div>
            </div>

            <aside className="order-3 lg:col-span-3">
              {showToc ? (
                <nav aria-labelledby="toc-heading" className="hidden lg:sticky lg:top-28 lg:block">
                  <p id="toc-heading" className="eyebrow border-t border-ink pt-3 text-muted">
                    On this page
                  </p>
                  <ol className="mt-4 space-y-2.5 border-l border-line">
                    {content.headings.map((heading) => (
                      <li key={heading.id} className={heading.depth === 3 ? "pl-7" : "pl-4"}>
                        <a
                          href={`#${heading.id}`}
                          className="block text-[0.72rem] leading-5 text-muted transition-colors hover:text-ink"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-8 border-t border-line pt-5">
                    <p className="eyebrow text-muted">Author</p>
                    <p className="mt-2 font-serif text-xl">Shine Akhanda</p>
                    <p className="mt-1 text-xs leading-5 text-muted">
                      Web developer and digital marketing professional in Mymensingh, Bangladesh.
                    </p>
                    <Link to="/about" className="link-underline eyebrow mt-3 text-ink">
                      About
                    </Link>
                  </div>
                </nav>
              ) : (
                <div className="hidden border-t border-line pt-4 lg:block">
                  <p className="eyebrow text-muted">Author</p>
                  <p className="mt-2 font-serif text-xl">Shine Akhanda</p>
                  <Link to="/about" className="link-underline eyebrow mt-3 text-ink">
                    About
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </section>

        <section className="border-y border-line bg-paper-light py-12 md:py-16">
          <div className="container-editorial">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-muted">Continue reading</p>
                <h2 className="display mt-3 text-[clamp(2.1rem,4.2vw,3.8rem)]">
                  Related <span className="italic">notes.</span>
                </h2>
              </div>
              <ButtonLink href="/blog" variant="outline">
                All articles
              </ButtonLink>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((relatedPost, index) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} priority={index === 0} />
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="Article pagination" className="container-editorial py-12">
          <div className="grid gap-5 md:grid-cols-2">
            {previous ? (
              <Link
                to={`/blog/${previous.slug}`}
                className="group border border-line bg-paper-light p-6 transition-colors hover:border-ink"
              >
                <span className="eyebrow flex items-center gap-2 text-muted">
                  <ArrowLeft size={12} strokeWidth={1.5} aria-hidden="true" /> Previous article
                </span>
                <span className="mt-5 block font-serif text-2xl leading-tight transition-opacity group-hover:opacity-55">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="group border border-line bg-paper-light p-6 text-right transition-colors hover:border-ink"
              >
                <span className="eyebrow flex items-center justify-end gap-2 text-muted">
                  Next article <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="mt-5 block font-serif text-2xl leading-tight transition-opacity group-hover:opacity-55">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </article>
    </>
  );
}
