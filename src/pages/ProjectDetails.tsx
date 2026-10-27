import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug, getProjectNeighbours } from "@/data/projects";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { NotFound } from "@/pages/NotFound";

export function ProjectDetails() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <NotFound />;
  }

  const { previous, next } = getProjectNeighbours(project.slug);

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />
      </div>

      <article>
        <header className="container-editorial pb-10 pt-10 md:pb-14 md:pt-16">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow text-muted">
                Project {project.index} / {project.category}
              </p>
              <h1 className="display mt-5 text-[clamp(4rem,10vw,9rem)]">{project.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{project.summary}</p>
            </div>
            <div className="md:col-span-4">
              <div className="border-t border-ink pt-4">
                <dl className="space-y-3 text-xs">
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-muted">Type</dt>
                    <dd>{project.projectType}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-muted">Sector</dt>
                    <dd>{project.category}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Status</dt>
                    <dd className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" aria-hidden="true" />
                      Live
                    </dd>
                  </div>
                </dl>
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-between border border-ink bg-ink px-4 py-3 text-[0.64rem] font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-transparent hover:text-ink"
                >
                  Visit live website
                  <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </header>

        <figure className="container-editorial">
          <div className="overflow-hidden border border-line bg-paper-deep">
            <img
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              fetchPriority="high"
              decoding="async"
              className="max-h-[78vh] w-full object-cover object-top grayscale transition-[filter] duration-700 hover:grayscale-0"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
            <span>Public website screenshot / {project.title}</span>
            <span>{project.externalUrl.replace("https://", "")}</span>
          </figcaption>
        </figure>

        <section className="container-editorial py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-muted">01 / Overview</p>
            </div>
            <div className="lg:col-span-6">
              <div className="space-y-5 text-base leading-8 text-ink-soft">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <aside className="lg:col-span-3">
              <div className="border-t border-line pt-4">
                <p className="eyebrow text-muted">Verified technology</p>
                <ul className="mt-4 space-y-2">
                  {project.stack.map((technology) => (
                    <li
                      key={technology}
                      className="flex items-center gap-2 border-b border-line pb-2 text-sm"
                    >
                      <span className="h-1 w-1 rounded-full bg-ink" aria-hidden="true" />
                      {technology}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.65rem] leading-5 text-muted">
                  Every technology listed here is supported by public website evidence or the
                  project&rsquo;s visible implementation.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-line bg-paper-light py-14 md:py-20">
          <div className="container-editorial grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-muted">02 / Objective</p>
              <h2 className="display mt-4 text-[clamp(2.3rem,4.5vw,4.2rem)]">
                What the website needed to <span className="italic">achieve.</span>
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="font-serif text-[clamp(1.35rem,2.4vw,2rem)] font-light leading-[1.45] tracking-[-0.02em]">
                {project.objective}
              </p>
              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                {project.highlights.map((highlight, index) => (
                  <div key={highlight} className="border-t border-line pt-3">
                    <span className="eyebrow text-muted">0{index + 1}</span>
                    <p className="mt-3 text-sm leading-6 text-ink-soft">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container-editorial py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-muted">03 / Role &amp; scope</p>
            </div>
            <div className="lg:col-span-7">
              <div className="border border-line bg-paper-light p-6 md:p-8">
                <Info size={20} strokeWidth={1.4} className="text-muted" aria-hidden="true" />
                <h2 className="mt-5 font-serif text-2xl font-normal tracking-[-0.02em]">
                  A note on this case study
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted">{project.roleNote}</p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  No client testimonial, performance metric, or business result has been invented
                  for this page. For a detailed, client-approved scope breakdown, please make a
                  direct enquiry.
                </p>
                <ButtonLink href="/contact" variant="outline" className="mt-6">
                  Request project details
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-2">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <span className="eyebrow text-muted">Live project</span>
                <span className="mt-4 block font-serif text-2xl leading-tight group-hover:opacity-55">
                  {project.title}
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.3}
                  className="mt-4 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </section>

        <section className="container-editorial pb-16 md:pb-24">
          <div className="grid gap-5 md:grid-cols-2">
            {previous ? (
              <Link
                to={`/projects/${previous.slug}`}
                className="group border border-line bg-paper-light p-6 transition-colors hover:border-ink md:p-8"
              >
                <span className="eyebrow flex items-center gap-2 text-muted">
                  <ArrowLeft size={12} strokeWidth={1.5} aria-hidden="true" /> Previous project
                </span>
                <span className="mt-6 block font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-none tracking-[-0.03em] transition-opacity group-hover:opacity-55">
                  {previous.title}
                </span>
                <span className="mt-3 block text-xs text-muted">{previous.category}</span>
              </Link>
            ) : null}
            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                className="group border border-line bg-paper-light p-6 text-right transition-colors hover:border-ink md:p-8"
              >
                <span className="eyebrow flex items-center justify-end gap-2 text-muted">
                  Next project <ArrowRight size={12} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="mt-6 block font-serif text-[clamp(2rem,4vw,3.4rem)] font-light leading-none tracking-[-0.03em] transition-opacity group-hover:opacity-55">
                  {next.title}
                </span>
                <span className="mt-3 block text-xs text-muted">{next.category}</span>
              </Link>
            ) : null}
          </div>
        </section>
      </article>
    </>
  );
}
