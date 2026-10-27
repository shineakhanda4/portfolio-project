import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { FOOTER_NAV } from "@/data/navigation";
import { SITE } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-charcoal text-paper">
      <div className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 border-b border-line-dark pb-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-paper/60">A working portfolio</p>
            <Link
              to="/contact"
              className="group mt-6 block max-w-3xl font-serif text-[clamp(2.6rem,7vw,6.2rem)] font-light leading-[0.95] tracking-[-0.045em]"
            >
              Let&apos;s build something
              <span className="italic"> that lasts.</span>
              <ArrowUpRight
                className="ml-3 inline-block align-top transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                size={30}
                strokeWidth={1}
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className="lg:col-span-5 lg:pl-12">
            <p className="max-w-md text-sm leading-7 text-paper/65">
              Web development is my profession; system administration is my passion. Based in
              Mymensingh, working with businesses throughout Bangladesh and beyond.
            </p>
            <div className="mt-7 flex flex-col items-start gap-3">
              <a
                href={SITE.phone.href}
                className="inline-flex items-center gap-3 border-b border-paper/25 pb-2 font-serif text-2xl text-paper transition-colors hover:border-paper"
              >
                <Phone size={16} strokeWidth={1.4} aria-hidden="true" />
                {SITE.phone.display}
              </a>
              <a
                href={SITE.email.href}
                className="inline-flex break-all items-center gap-3 border-b border-paper/25 pb-2 font-serif text-xl text-paper transition-colors hover:border-paper"
              >
                <Mail size={16} strokeWidth={1.4} aria-hidden="true" />
                {SITE.email.display}
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12">
          {FOOTER_NAV.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <p className="eyebrow text-paper/60">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-[0.8rem] text-paper/65 transition-colors hover:text-paper"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="eyebrow text-paper/60">Elsewhere</p>
            <p className="mt-4 text-sm leading-6 text-paper/65">
              Follow the work, experiments, and occasional infrastructure notes.
            </p>
            <SocialLinks tone="dark" className="mt-5" />
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-line-dark pt-6 text-[0.65rem] uppercase tracking-[0.12em] text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>© {SITE.currentYear} Shine Akhanda. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Founder &amp; CEO, Cave Technologies</span>
            <Link to="/privacy" className="transition-colors hover:text-paper">
              Privacy
            </Link>
            <span>Mymensingh, Bangladesh</span>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-[0.65rem] leading-5 text-paper/55">
          This is the independent professional portfolio of Shine Akhanda. Cave Technologies is a
          separate agency venture. Project screenshots are shown for portfolio reference and remain
          the property of their respective owners.
        </p>
      </div>
    </footer>
  );
}
