import { Check, Link2 } from "lucide-react";
import { useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { SITE } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type ShareLinksProps = {
  title: string;
  path: string;
  compact?: boolean;
};

export function ShareLinks({ title, path, compact = false }: ShareLinksProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const url = absoluteUrl(path, SITE.url);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 2200);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2600);
    }
  }

  const linkClass =
    "inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-ink hover:text-ink";

  return (
    <div>
      {!compact ? <p className="eyebrow mb-3 text-muted">Share</p> : null}
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <button
            type="button"
            className={linkClass}
            onClick={copyLink}
            aria-label={copyState === "copied" ? "Link copied" : "Copy article link"}
          >
            {copyState === "copied" ? (
              <Check size={15} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Link2 size={15} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </li>
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="Share on Facebook"
          >
            <FaFacebookF size={13} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label="Share on LinkedIn"
          >
            <FaLinkedinIn size={13} aria-hidden="true" />
          </a>
        </li>
      </ul>
      <p className="mt-2 min-h-4 text-[0.62rem] text-muted" aria-live="polite">
        {copyState === "copied" ? "Link copied." : copyState === "failed" ? "Copy unavailable." : ""}
      </p>
      <span className="sr-only">{encodedTitle}</span>
    </div>
  );
}
