import { BLOG_CATEGORIES, slugifyTag } from "@/data/blogTaxonomy";
import { BLOG_INDEX } from "@/generated/blogIndex";
import type { BlogPostSummary } from "@/types/content";

const posts = BLOG_INDEX;

export function getAllPosts(): BlogPostSummary[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPostSummary | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByCategory(categorySlug: string): BlogPostSummary[] {
  return posts.filter((post) => post.categorySlug === categorySlug);
}

export function getPostsByTag(tagSlug: string): BlogPostSummary[] {
  return posts.filter((post) => post.tags.some((tag) => slugifyTag(tag) === tagSlug));
}

export function getFeaturedPosts(limit = 3): BlogPostSummary[] {
  return posts.filter((post) => post.featured).slice(0, limit);
}

export function getTagArchives() {
  const tags = new Map<string, { tag: string; slug: string; posts: BlogPostSummary[] }>();
  for (const post of posts) {
    for (const tag of post.tags) {
      const slug = slugifyTag(tag);
      const existing = tags.get(slug);
      if (existing) {
        existing.posts.push(post);
      } else {
        tags.set(slug, { tag, slug, posts: [post] });
      }
    }
  }
  return [...tags.values()].sort((a, b) => a.tag.localeCompare(b.tag));
}

export function getAdjacentPosts(slug: string): {
  previous: BlogPostSummary | null;
  next: BlogPostSummary | null;
} {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getRelatedPosts(post: BlogPostSummary, limit = 3): BlogPostSummary[] {
  return posts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      let score = candidate.categorySlug === post.categorySlug ? 3 : 0;
      for (const tag of candidate.tags) {
        if (post.tags.some((postTag) => slugifyTag(postTag) === slugifyTag(tag))) score += 2;
      }
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.order - b.candidate.order)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function formatPostDate(value: string): string {
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function getCategoryName(categorySlug: string): string {
  return BLOG_CATEGORIES.find((category) => category.slug === categorySlug)?.name ?? "Journal";
}
