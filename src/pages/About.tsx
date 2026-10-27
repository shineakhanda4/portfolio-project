import { ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { ACHIEVEMENTS, PRINCIPLES, SITE } from "@/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function About() {
  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="About / Shine Akhanda"
          title={
            <>
              A builder of websites, businesses, and the systems{" "}
              <span className="italic text-muted">behind them.</span>
            </>
          }
          intro={
            <p>
              I&rsquo;m a web developer and digital marketing professional in Mymensingh, Bangladesh.
              I founded Cave Technologies to help businesses establish a digital presence that is
              useful, credible, and built to grow.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">At a glance</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-muted">Based in</dt>
                  <dd>Mymensingh, BD</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-muted">Company</dt>
                  <dd>Cave Technologies</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-3">
                  <dt className="text-muted">Role</dt>
                  <dd>Founder &amp; CEO</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Projects</dt>
                  <dd>25+ delivered</dd>
                </div>
              </dl>
            </div>
          }
        />
      </div>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">01 / The short version</p>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-6 font-serif text-[clamp(1.08rem,1.6vw,1.3rem)] font-normal leading-[1.75] text-ink-soft">
              <p className="first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:font-serif first-letter:text-[4.6rem] first-letter:font-light first-letter:leading-[0.72]">
                My work began where most web work begins: with a business that needed a better way
                to be found, understood, and trusted online. Over time, that work expanded from
                building interfaces into shaping the strategy around them and taking responsibility
                for the infrastructure underneath.
              </p>
              <p>
                Today I lead Cave Technologies, a business-building agency focused on websites,
                digital marketing, online advertising, and digital growth. I also continue to work
                directly on client projects — from frontend implementation and SEO foundations to
                server setup and recovery.
              </p>
              <p>
                That combination is deliberate. A website is not only a visual artifact. It is a
                business asset that has to answer customer questions, survive real traffic, stay
                maintainable, and support the next stage of growth.
              </p>
            </div>
          </div>
          <aside className="lg:col-span-3">
            <figure>
              <img
                src={SITE.portrait.src}
                alt={SITE.portrait.alt}
                width={SITE.portrait.width}
                height={SITE.portrait.height}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-full border border-line object-cover object-center"
              />
              <figcaption className="mt-3 border-t border-line pt-3 text-[0.65rem] leading-5 text-muted">
                Shine Akhanda, Mymensingh. Web development is the profession; Linux and bare-metal
                systems are the persistent interest.
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>

      <section className="border-y border-line bg-paper-light py-14 md:py-20">
        <div className="container-editorial grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">02 / The practice</p>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <h2 className="display text-[clamp(2.5rem,5vw,4.8rem)]">
              I care about the whole route from <span className="italic">attention to action.</span>
            </h2>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow text-ink">Build</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  I develop business websites with React, Next.js, TypeScript, and practical
                  server-rendered approaches where they fit. The work includes content structure,
                  responsive interfaces, performance, accessibility, and clean deployment.
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-ink">Grow</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  I work on search visibility, digital advertising, landing pages, and measurement.
                  The aim is not to run every channel. It is to make the offer visible to the right
                  people and learn from what happens.
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-ink">Operate</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Linux administration, bare-metal setup, troubleshooting, and recovery keep the
                  system dependable. I am comfortable moving from a browser console to a server
                  console when the problem requires it.
                </p>
              </div>
              <div>
                <h3 className="eyebrow text-ink">Explain</h3>
                <p className="mt-3 text-sm leading-7 text-muted">
                  A digital system should be understandable to the people who own it. I document
                  decisions, leave usable handovers, and avoid hiding the operating model behind
                  unnecessary complexity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cave-technologies" className="container-editorial scroll-mt-28 py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">03 / The company</p>
          </div>
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.5rem,5vw,4.8rem)]">
              Cave <span className="italic">Technologies.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted">
              Cave Technologies is a business-building agency that helps new and growing companies
              establish their digital presence, attract customers, improve their marketing, and grow.
              Its work relates to website development, digital marketing, online advertising, and
              digital business growth.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              I founded and lead the company. This portfolio is my personal professional site; it is
              distinct from the agency&apos;s own corporate presence, although the work and
              perspective overlap.
            </p>
            <a
              href="https://github.com/caveweb1920"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline eyebrow mt-6 text-ink"
            >
              Cave Technologies on GitHub <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">Measured by</p>
              <p className="mt-4 font-serif text-2xl leading-snug">
                25+ client projects. 7+ companies helped. A focus on useful digital foundations.
              </p>
              <p className="mt-4 text-xs leading-6 text-muted">
                These are delivered project counts and business outcomes supplied for this
                portfolio. No ranking, revenue, or certification claims are implied.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-texture bg-charcoal py-16 text-paper md:py-24">
        <div className="container-editorial grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-paper/60">04 / The systems layer</p>
          </div>
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2.6rem,5.5vw,5.2rem)]">
              Linux, bare metal, and the <span className="italic text-paper/65">unglamorous work.</span>
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-7 text-paper/60">
              <p>
                System administration is where my technical curiosity becomes tangible. I enjoy
                working close to the machine: installing a bare-metal server, configuring services,
                finding the reason a site is unreachable, or recovering a system after a failed boot.
              </p>
              <p>
                The value is not in using a terminal for its own sake. It is in being able to answer
                operational questions that sit outside the browser: what happens when the disk fills,
                the certificate expires, the service manager gives up, or the network path changes?
              </p>
              <p>
                I have experience rescuing and recovering Linux servers, and I keep that work
                grounded in evidence, backups, and reversible changes rather than confident guesses.
              </p>
            </div>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <ul className="border-t border-line-dark">
              {["Debian", "Ubuntu", "AlmaLinux", "CentOS", "RHEL", "RHEL-based systems"].map((item, index) => (
                <li
                  key={item}
                  className="flex items-center justify-between border-b border-line-dark py-3 text-sm text-paper/65"
                >
                  <span>{item}</span>
                  <span className="eyebrow text-paper/55">0{index + 1}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/infrastructure"
              className="link-underline eyebrow mt-6 text-paper/65"
            >
              Infrastructure work <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">05 / How I work</p>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {PRINCIPLES.map((principle, index) => (
                <article key={principle.title} className="border-t border-line pt-4">
                  <span className="eyebrow text-muted">0{index + 1}</span>
                  <h2 className="mt-5 font-serif text-2xl font-normal tracking-[-0.025em]">
                    {principle.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{principle.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-light">
        <div className="container-editorial grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4">
          {ACHIEVEMENTS.map((achievement) => (
            <div key={achievement.label} className="border-r border-line px-4 first:pl-0 last:border-r-0 md:px-7">
              <p className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] font-light leading-none tracking-[-0.04em]">
                {achievement.value}
              </p>
              <p className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.14em]">
                {achievement.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted">{achievement.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-muted">Next</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5.4rem)]">
              See the work, or start a <span className="italic">conversation.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <ButtonLink href="/projects">Selected projects</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact
            </ButtonLink>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-5 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-xs text-muted">
            <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
            {SITE.location.display}
            <span aria-hidden="true">/</span>
            <a href={SITE.phone.href} className="transition-colors hover:text-ink">
              {SITE.phone.display}
            </a>
            <span aria-hidden="true">/</span>
            <a href={SITE.email.href} className="break-all transition-colors hover:text-ink">
              {SITE.email.display}
            </a>
          </div>
          <SocialLinks />
        </div>
      </section>
    </>
  );
}
