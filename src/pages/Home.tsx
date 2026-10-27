import { ArrowDown, ArrowUpRight, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { ACHIEVEMENTS, EXPERTISE, PRINCIPLES, SITE } from "@/data/site";
import { PROJECTS } from "@/data/projects";
import { SKILL_CATEGORIES } from "@/data/skills";
import { getFeaturedPosts } from "@/lib/blogMeta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { BlogCard } from "@/components/ui/BlogCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const homeStack = [
  "react",
  "typescript",
  "nextjs",
  "nodejs",
  "php",
  "hono",
  "mongodb",
  "mysql",
  "postgresql",
  "debian",
  "ubuntu",
  "rhel",
] as const;

const homeStackItems = homeStack
  .map((icon) => {
    for (const category of SKILL_CATEGORIES) {
      const item = category.items.find((entry) => entry.icon === icon);
      if (item) return item;
    }
    return undefined;
  })
  .filter((item): item is NonNullable<typeof item> => Boolean(item));

export function Home() {
  const featuredPosts = getFeaturedPosts(3);

  return (
    <div className="home-page">
      <section className="container-editorial">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted">
          <span>Independent portfolio / 2026</span>
          <span className="hidden sm:inline">Web development · Marketing · Infrastructure</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={11} strokeWidth={1.5} aria-hidden="true" />
            {SITE.location.display}
          </span>
        </div>

        <div className="grid gap-10 pb-12 pt-9 md:pt-14 lg:grid-cols-12 lg:gap-8 lg:pb-16">
          <div className="flex flex-col justify-between lg:col-span-8">
            <div>
              <p className="eyebrow flex items-center gap-3 text-muted">
                <span className="h-px w-8 bg-ink" aria-hidden="true" />
                Web developer &amp; digital marketing expert
              </p>
              <h1 className="display mt-5 text-[clamp(4.6rem,11.5vw,10.5rem)]">
                Shine{" "}
                <span className="block italic text-ink-soft">Akhanda</span>
              </h1>
              <div className="mt-7 flex max-w-2xl flex-col gap-6 border-t border-line pt-5 sm:flex-row sm:items-start sm:justify-between">
                <p className="max-w-md text-base leading-7 text-ink-soft md:text-lg md:leading-8">
                  I build websites that carry a business, and marketing systems that help the right
                  people find them. Founder &amp; CEO of{" "}
                  <span className="font-semibold text-ink">Cave Technologies</span>.
                </p>
                <p className="max-w-[13rem] text-xs leading-5 text-muted">
                  Web development is my profession; system administration is my passion.
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects">Explore selected work</ButtonLink>
              <ButtonLink href="/about" variant="outline">
                About my practice
              </ButtonLink>
              <a
                href={SITE.phone.href}
                className="ml-1 inline-flex items-center gap-2 py-3 text-[0.67rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:text-ink"
              >
                <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
                {SITE.phone.display}
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <figure className="relative">
              <div className="portrait-frame overflow-hidden rounded-full border border-line">
                <img
                  src={SITE.portrait.src}
                  alt={SITE.portrait.alt}
                  width={SITE.portrait.width}
                  height={SITE.portrait.height}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-square w-full rounded-full object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 flex items-start justify-between gap-4 border-t border-line pt-3">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  Shine Akhanda
                  <span className="mt-1 block font-normal tracking-normal normal-case text-muted">
                    Mymensingh, Bangladesh
                  </span>
                </span>
                <span className="text-right text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  Founder / CEO
                  <span className="mt-1 block normal-case tracking-normal text-muted">
                    Cave Technologies
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-light">
        <div className="container-editorial grid gap-6 py-8 md:grid-cols-12 md:items-center md:py-10">
          <div className="md:col-span-3">
            <p className="eyebrow text-muted">In practice</p>
          </div>
          <blockquote className="md:col-span-7">
            <p className="font-serif text-[clamp(1.55rem,3vw,2.6rem)] font-light leading-[1.15] tracking-[-0.025em]">
              “Web development is my profession;{" "}
              <span className="italic text-muted">system administration is my passion.</span>”
            </p>
          </blockquote>
          <div className="md:col-span-2 md:text-right">
            <a href="#selected-work" className="eyebrow inline-flex items-center gap-2 text-muted hover:text-ink">
              Scroll <ArrowDown size={13} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="container-editorial py-10 md:py-14">
        <div className="grid grid-cols-2 gap-y-8 border-b border-line pb-10 md:grid-cols-4">
          {ACHIEVEMENTS.map((achievement) => (
            <div key={achievement.label} className="border-r border-line px-4 first:pl-0 last:border-r-0 md:px-7">
              <p className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-none tracking-[-0.04em]">
                {achievement.value}
              </p>
              <p className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink">
                {achievement.label}
              </p>
              <p className="mt-2 hidden max-w-[15rem] text-xs leading-5 text-muted lg:block">
                {achievement.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="selected-work" className="container-editorial scroll-mt-24 pb-16 md:pb-24">
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Real websites. <span className="italic">Live businesses.</span>
            </>
          }
          description="A small selection of client work across architecture, healthcare, education, and international manufacturing. Each project page includes verified context and a direct link to the live site."
          link={{ label: "All projects", href: "/projects" }}
          className="mb-10 md:mb-14"
        />
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="dark-texture bg-charcoal py-16 text-paper md:py-24">
        <div className="container-editorial">
          <SectionHeading
            index="02"
            eyebrow="Practice"
            title={
              <>
                Three disciplines. <span className="italic text-paper/65">One outcome.</span>
              </>
            }
            description="A website is easier to improve when the interface, the acquisition plan, and the server it runs on are understood together."
            tone="dark"
            link={{ label: "Services", href: "/services" }}
            className="mb-12 md:mb-16"
          />
          <div className="grid gap-0 border-t border-line-dark md:grid-cols-3">
            {EXPERTISE.map((item) => (
              <article
                key={item.number}
                className="group flex min-h-[19rem] flex-col border-b border-line-dark py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-paper/60">{item.number}</span>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.2}
                    className="text-paper/30 transition-all group-hover:text-paper"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-12 font-serif text-[clamp(2rem,3.5vw,3.2rem)] font-light leading-none tracking-[-0.03em]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-7 text-paper/65">{item.body}</p>
                <Link
                  to={item.href}
                  className="link-underline eyebrow mt-auto pt-0 text-paper/65 group-hover:text-paper"
                >
                  {item.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted">03 / Profile</p>
            <h2 className="display mt-5 text-[clamp(2.8rem,5vw,4.8rem)]">
              A developer with a <span className="italic">business owner&apos;s</span> vantage point.
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-5 text-base leading-8 text-ink-soft">
              <p>
                I&apos;m Shine Akhanda, a web developer and digital marketing professional based in
                Mymensingh, Bangladesh. Through Cave Technologies, I work with businesses that need
                a credible digital presence, a clearer route to customers, and a site they can
                actually maintain.
              </p>
              <p>
                My work sits between design, engineering, and growth. I care about typography and
                frontend craft, but I care just as much about whether a page answers the right
                question and whether the system underneath it stays online. That is where the Linux
                side of my practice comes in: server setup, bare-metal infrastructure,
                troubleshooting, and recovery.
              </p>
            </div>
            <dl className="mt-9 grid gap-x-8 gap-y-6 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="eyebrow text-muted">Company</dt>
                <dd className="mt-2 font-serif text-xl">Cave Technologies — Founder &amp; CEO</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Based in</dt>
                <dd className="mt-2 font-serif text-xl">Mymensingh, Bangladesh</dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Focus</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">
                  Modern websites, digital marketing, technical SEO, Linux infrastructure.
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-muted">Working style</dt>
                <dd className="mt-2 text-sm leading-6 text-muted">
                  Direct communication, considered implementation, documented handover.
                </dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/about" variant="outline">
                Read the full story
              </ButtonLink>
              <ButtonLink href="/infrastructure" variant="outline">
                Infrastructure work
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-light py-16 md:py-20">
        <div className="container-editorial grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted">04 / Stack</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.5vw,4rem)]">
              Deliberate tools. <span className="italic">No theatre.</span>
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
              The stack changes with the problem. These are the technologies I use most often across
              frontend, backend, data, and infrastructure work.
            </p>
            <Link to="/skills" className="link-underline eyebrow mt-6 text-ink">
              Full skills &amp; stack <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-4">
              {homeStackItems.map((item) => (
                <li
                  key={item.name}
                  className="group flex min-h-[7rem] flex-col justify-between border-b border-r border-line p-4 transition-colors hover:bg-paper"
                >
                  <BrandIcon
                    name={item.icon}
                    size={22}
                    className="text-ink transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <span className="mt-4 text-xs font-semibold tracking-[-0.01em]">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <div className="grid overflow-hidden border border-line lg:grid-cols-12">
          <div className="bg-charcoal p-7 text-paper md:p-10 lg:col-span-5">
            <p className="eyebrow text-paper/60">05 / Systems</p>
            <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.5vw,4.4rem)] font-light leading-[0.98] tracking-[-0.04em]">
              The work after <span className="italic">launch.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-paper/65">
              Linux administration is not a side interest in the marketing sense. It is the layer
              that decides whether the website is reachable, recoverable, and understood when
              something breaks.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              {["Debian", "Ubuntu", "AlmaLinux", "CentOS", "RHEL"].map((name) => (
                <span
                  key={name}
                  className="border border-line-dark px-2.5 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-paper/65"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-paper-light lg:col-span-7">
            <div className="grid h-full sm:grid-cols-2">
              {[
                ["Server setup", "Bare-metal installation, Linux provisioning, services, firewalls, and deployment foundations."],
                ["Troubleshooting", "Methodical diagnosis of boot, network, storage, service, and performance problems."],
                ["Recovery", "Rescue access, service restoration, and careful recovery when a machine fails."],
                ["Maintenance", "Updates, backups, documentation, and the operational habits that prevent repeats."],
              ].map(([title, body], index) => (
                <div
                  key={title}
                  className="border-b border-line p-6 last:border-b-0 sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0 md:p-8"
                >
                  <span className="eyebrow text-muted">0{index + 1}</span>
                  <h3 className="mt-8 font-serif text-2xl font-normal tracking-[-0.02em]">{title}</h3>
                  <p className="mt-3 text-xs leading-6 text-muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <ButtonLink href="/infrastructure" variant="outline">
            Explore infrastructure
          </ButtonLink>
        </div>
      </section>

      <section className="container-editorial border-t border-line py-16 md:py-24">
        <SectionHeading
          index="06"
          eyebrow="Journal"
          title={
            <>
              Notes from the <span className="italic">work.</span>
            </>
          }
          description="Practical writing on web development, marketing, and the infrastructure behind both."
          link={{ label: "All articles", href: "/blog" }}
          className="mb-10 md:mb-14"
        />
        <div className="grid gap-10 lg:grid-cols-12">
          {featuredPosts[0] ? (
            <div className="lg:col-span-7">
              <BlogCard post={featuredPosts[0]} variant="featured" />
            </div>
          ) : null}
          <div className="lg:col-span-5">
            {featuredPosts.slice(1).map((post) => (
              <BlogCard key={post.slug} post={post} variant="compact" />
            ))}
            <div className="border-t border-line pt-5">
              <p className="max-w-sm text-sm leading-7 text-muted">
                Longer guides for the decisions that come before a redesign, a campaign, or a server
                migration.
              </p>
              <ButtonLink href="/blog" variant="outline" className="mt-5">
                Read the journal
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-light">
        <div className="container-editorial grid gap-8 py-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-muted">Direct line</p>
            <p className="mt-4 font-serif text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-tight tracking-[-0.03em]">
              Have a website, campaign, or stubborn server to discuss?
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <ButtonLink href="/contact">Start a conversation</ButtonLink>
            <a
              href={SITE.phone.href}
              className="inline-flex min-h-[3rem] items-center gap-2 border border-line px-4 text-[0.66rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-ink"
            >
              <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12">
        <div className="grid gap-8 border-t border-line pt-5 md:grid-cols-12">
          <p className="eyebrow text-muted md:col-span-3">Principles</p>
          <div className="grid gap-5 sm:grid-cols-2 md:col-span-9">
            {PRINCIPLES.slice(0, 2).map((principle) => (
              <div key={principle.title}>
                <h2 className="text-sm font-semibold">{principle.title}</h2>
                <p className="mt-2 text-xs leading-6 text-muted">{principle.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
