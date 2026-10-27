import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonLink } from "@/components/ui/ButtonLink";

const links = [
  { label: "Selected work", href: "/projects", detail: "Four live client websites" },
  { label: "Services", href: "/services", detail: "Web, marketing, SEO, infrastructure" },
  { label: "Journal", href: "/blog", detail: "Practical writing and guides" },
  { label: "Contact", href: "/contact", detail: "Start a conversation" },
];

export function NotFound() {
  return (
    <section className="container-editorial py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-muted">Error 404 / Page not found</p>
          <h1 className="display mt-5 text-[clamp(5rem,16vw,14rem)] leading-[0.8]">
            404
          </h1>
          <h2 className="mt-8 max-w-xl font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.08] tracking-[-0.03em]">
            This page has moved, changed its name, or never existed.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            The rest of the site is still here. Explore the selected work, the practice, or the
            journal — or start a conversation directly.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/">Return home</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Useful pages" className="lg:col-span-5">
          <p className="eyebrow border-t border-ink pt-3 text-muted">Try one of these</p>
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="group flex items-center justify-between gap-4 border-b border-line py-5"
                >
                  <span>
                    <span className="block text-sm font-semibold transition-opacity group-hover:opacity-55">
                      {link.label}
                    </span>
                    <span className="mt-1 block text-xs text-muted">{link.detail}</span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.3}
                    className="text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
