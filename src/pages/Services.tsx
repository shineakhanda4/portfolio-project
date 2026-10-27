import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SERVICES } from "@/data/services";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";

const engagement = [
  {
    title: "Clarify",
    body: "Define the business objective, audience, content, and the action that matters before proposing a build.",
  },
  {
    title: "Design",
    body: "Shape the content structure and interface as one system, with responsive and accessible states from the start.",
  },
  {
    title: "Build",
    body: "Implement the frontend, integrations, metadata, and deployment foundation with maintainability in mind.",
  },
  {
    title: "Measure",
    body: "Check the production result, establish search and analytics visibility, and leave a documented handover.",
  },
];

export function Services() {
  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Practice / Services"
          title={
            <>
              Digital work with a <span className="italic text-muted">commercial point.</span>
            </>
          }
          intro={
            <p>
              Website development, React and Next.js engineering, digital marketing, technical SEO,
              and Linux infrastructure. Based in Mymensingh, working with businesses throughout
              Bangladesh and beyond.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">Direct contact</p>
              <p className="mt-4 font-serif text-2xl leading-snug">
                Tell me what the business needs to achieve.
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                The useful conversation starts with the objective, not a list of technologies.
              </p>
              <ButtonLink href="/contact" className="mt-5">
                Start a conversation
              </ButtonLink>
            </div>
          }
        />
      </div>

      <section className="container-editorial py-14 md:py-20">
        <div className="border-t border-line">
          {SERVICES.map((service, index) => (
            <article
              key={service.slug}
              className="group grid gap-6 border-b border-line py-7 md:grid-cols-12 md:items-start md:py-9"
            >
              <div className="md:col-span-1">
                <span className="eyebrow text-muted">0{index + 1}</span>
              </div>
              <div className="md:col-span-4">
                <p className="eyebrow text-muted">{service.eyebrow}</p>
                <h2 className="display mt-3 text-[clamp(2.2rem,4vw,3.7rem)]">
                  <Link
                    to={`/services/${service.slug}`}
                    className="transition-opacity group-hover:opacity-55"
                  >
                    {service.title}
                  </Link>
                </h2>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm leading-7 text-muted">{service.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 5).map((technology) => (
                    <li
                      key={technology}
                      className="border border-line px-2 py-1 text-[0.57rem] font-semibold uppercase tracking-[0.1em] text-muted"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex md:col-span-2 md:justify-end">
                <Link
                  to={`/services/${service.slug}`}
                  className="link-underline eyebrow text-ink"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Explore <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dark-texture bg-charcoal py-16 text-paper md:py-24">
        <div className="container-editorial">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-paper/60">Method / 01—04</p>
              <h2 className="display mt-4 text-[clamp(2.6rem,5vw,4.6rem)]">
                A clear route from brief to <span className="italic text-paper/65">launch.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-7 text-paper/65">
                The exact process changes with the scope. The discipline does not: define the job,
                make the work understandable, verify the result.
              </p>
            </div>
            <div className="grid gap-0 sm:grid-cols-2 lg:col-span-8">
              {engagement.map((step, index) => (
                <div
                  key={step.title}
                  className="border-t border-line-dark py-6 sm:px-6 sm:first:pl-0 sm:[&:nth-child(2n)]:pr-0 sm:[&:nth-child(3)]:pl-0"
                >
                  <p className="eyebrow text-paper/55">0{index + 1}</p>
                  <h3 className="mt-8 font-serif text-3xl font-light tracking-[-0.025em]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-paper/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">Local &amp; national</p>
          </div>
          <div className="lg:col-span-7">
            <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)]">
              Rooted in Mymensingh. <span className="italic">Useful anywhere.</span>
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-muted">
              <p>
                The professional base is Mymensingh, Bangladesh. Projects can be delivered remotely
                for businesses elsewhere in the country and internationally. Local knowledge is an
                advantage where it matters, but the underlying standard does not change with a city
                name.
              </p>
              <p>
                I do not claim offices in cities where none exist, and I do not build near-duplicate
                location pages to manufacture local relevance. The website, project pages, and
                service content are the factual record of the work.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/projects">Selected projects</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Discuss your requirement
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className="eyebrow text-muted">Also explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/skills" className="link-underline text-muted hover:text-ink">
                  Skills &amp; stack
                </Link>
              </li>
              <li>
                <Link to="/infrastructure" className="link-underline text-muted hover:text-ink">
                  Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/blog" className="link-underline text-muted hover:text-ink">
                  Journal
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline text-muted hover:text-ink">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
