import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MAIN_NAV } from "@/data/navigation";
import { SITE } from "@/data/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/utils";

function BrandMark() {
  return (
    <Link to="/" className="group flex flex-col">
      <span className="font-serif text-[1.45rem] font-medium leading-none tracking-[-0.04em] md:text-[1.65rem]">
        Shine Akhanda
      </span>
      <span className="mt-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-ink">
        Web developer / Digital marketer
      </span>
      <span className="sr-only"> — Home</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const menuLinks = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
      const focusable = [menuButtonRef.current, ...menuLinks].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      if (focusable.length < 2) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95">
      <div className="container-editorial flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
        <BrandMark />

        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "group relative py-2 text-[0.62rem] font-semibold uppercase tracking-[0.15em] transition-colors",
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300",
                      isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SITE.phone.href}
            className="hidden items-center gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink xl:flex"
            aria-label={`Call Shine Akhanda at ${SITE.phone.display}`}
          >
            <Phone size={13} strokeWidth={1.6} aria-hidden="true" />
            {SITE.phone.display}
          </a>
          <Link
            to="/contact"
            className="hidden border border-ink bg-ink px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-transparent hover:text-ink sm:inline-flex"
          >
            Start a project
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="mobile-menu-enter fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto border-t border-line bg-paper md:top-[84px] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
            <div className="container-editorial flex min-h-full flex-col py-8">
              <nav aria-label="Mobile navigation">
                <ul className="divide-y divide-line border-b border-line">
                  {MAIN_NAV.map((item, index) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className="group flex items-baseline justify-between gap-4 py-5"
                        aria-current={isActive(item.href) ? "page" : undefined}
                      >
                        <span className="display text-[clamp(2rem,8vw,3.4rem)] group-hover:opacity-55">
                          {item.label}
                        </span>
                        <span className="eyebrow text-muted">0{index + 1}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto grid gap-8 pt-10 sm:grid-cols-2">
                <div>
                  <p className="eyebrow text-muted">Direct</p>
                  <a href={SITE.phone.href} className="mt-3 block font-serif text-2xl">
                    {SITE.phone.display}
                  </a>
                  <a href={SITE.email.href} className="mt-1 block break-all font-serif text-lg">
                    {SITE.email.display}
                  </a>
                  <p className="mt-1 text-sm text-muted">{SITE.location.display}</p>
                </div>
                <div>
                  <p className="eyebrow text-muted">Profiles</p>
                  <SocialLinks className="mt-3" />
                </div>
              </div>
            </div>
        </div>
      ) : null}
    </header>
  );
}
