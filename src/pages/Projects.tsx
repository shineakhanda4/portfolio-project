import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { ProjectBook } from "@/components/projects/ProjectBook";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Projects() {
  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Selected work / 01—04"
          title={
            <>
              Work that has to <span className="italic text-muted">work.</span>
            </>
          }
          intro={
            <p>
              Four live projects across architecture, healthcare, education, and manufacturing. This
              is an editorial selection, not a claim that every detail of every engagement is public.
              Each case study records verified context and links to the real website.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">The collection</p>
              <ul className="mt-4 space-y-2">
                {PROJECTS.map((project) => (
                  <li
                    key={project.slug}
                    className="flex items-center justify-between gap-4 border-b border-line pb-2 text-xs"
                  >
                    <span>{project.title}</span>
                    <span className="text-muted">{project.category}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[0.65rem] leading-5 text-muted">
                Scroll through the project pages. On larger screens the selection moves like a
                portfolio book; on mobile and reduced-motion settings it becomes a straightforward
                stack.
              </p>
            </div>
          }
        />
      </div>

      <section className="container-editorial py-10 md:py-16" aria-labelledby="project-book-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
          <h2 id="project-book-heading" className="eyebrow text-muted">
            The book of work
          </h2>
          <p className="text-[0.62rem] uppercase tracking-[0.13em] text-muted">
            Scroll to turn the page
          </p>
        </div>
        <ProjectBook />
      </section>

      <section className="border-t border-line bg-paper-light py-14 md:py-20">
        <div className="container-editorial">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-muted">Project index</p>
              <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.6rem)]">
                All four, <span className="italic">in one place.</span>
              </h2>
            </div>
            <ButtonLink href="/contact" variant="outline">
              Discuss a project
            </ButtonLink>
          </div>

          <ul className="mt-10 border-t border-line">
            {PROJECTS.map((project) => (
              <li key={project.slug} className="border-b border-line">
                <div className="grid gap-4 py-5 md:grid-cols-12 md:items-center">
                  <span className="eyebrow text-muted md:col-span-1">{project.index}</span>
                  <div className="md:col-span-4">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="font-serif text-2xl font-normal tracking-[-0.02em] transition-opacity hover:opacity-55"
                    >
                      {project.title}
                    </Link>
                  </div>
                  <p className="text-xs text-muted md:col-span-4">{project.category}</p>
                  <div className="flex gap-4 md:col-span-3 md:justify-end">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="link-underline eyebrow text-ink"
                    >
                      Case study
                    </Link>
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline eyebrow text-ink"
                    >
                      Live <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
