import { marked } from "marked";
import type { BlogHeading } from "@/types/content";

const rawFiles = import.meta.glob("../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

type PostContent = {
  body: string;
  html: string;
  headings: BlogHeading[];
};

const cache = new Map<string, PostContent>();

function decodeEntities(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function makeHeadingId(text: string, seen: Map<string, number>): string {
  const base = decodeEntities(text)
    .replace(/<[^>]+>/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function renderBody(markdown: string): { html: string; headings: BlogHeading[] } {
  const rendered = marked.parse(markdown, {
    gfm: true,
    breaks: false,
  }) as string;

  const headings: BlogHeading[] = [];
  const seen = new Map<string, number>();
  let headingIndex = 0;

  const html = rendered.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_match, depthValue: string, inner: string) => {
      const depth = Number(depthValue) as 2 | 3;
      const plainText = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
      const id = makeHeadingId(inner, seen);
      headings.push({ id, text: plainText, depth });
      headingIndex += 1;
      return `<h${depth} id="${id}">${inner}<a class="heading-anchor" href="#${id}" aria-label="Link to ${plainText.replace(
        /"/g,
        "&quot;",
      )}" data-heading-index="${headingIndex}"></a></h${depth}>`;
    },
  );

  return { html, headings };
}

export function getPostContent(slug: string): PostContent | null {
  const cached = cache.get(slug);
  if (cached) return cached;

  const path = Object.keys(rawFiles).find((file) => file.endsWith(`/${slug}.md`));
  if (!path) return null;

  const source = rawFiles[path];
  const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(source);
  if (!match) return null;

  const body = source.slice(match[0].length).trim();
  const rendered = renderBody(body);
  const content: PostContent = { body, ...rendered };
  cache.set(slug, content);
  return content;
}
