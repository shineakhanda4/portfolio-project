import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "@/data/projects";
import { SERVICES, getServiceBySlug } from "@/data/services";
import { getPostBySlug } from "@/lib/blogMeta";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { PageHeader } from "@/components/ui/PageHeader";
import { NotFound } from "@/pages/NotFound";

export function ServiceDetail() {
  const { slug = "" } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

  const relatedProjects = service.relatedProjectSlugs
    .map((projectSlug) => getProjectBySlug(projectSlug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  const relatedPosts = service.relatedArticleSlugs
    .map((postSlug) => getPostBySlug(postSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const otherServices = SERVICES.filter((item) => item.slug !== service.slug);

  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: service.title },
          ]}
        />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow={service.eyebrow}
          title={service.title}
          intro={<p>{service.summary}</p>}
          meta={
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">Best suited to</p>
              <ul className="mt-4 space-y-3">
                {service.idealFor.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2 border-b border-line pb-3 text-xs leading-5 text-muted">
                    <Check size={13} strokeWidth={1.6} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/contact" className="mt-5">
                Discuss this service
              </ButtonLink>
            </div>
          }
        />
      </div>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">01 / The approach</p>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-5 font-serif text-[clamp(1.16rem,1.8vw,1.4rem)] font-normal leading-[1.7] text-ink-soft">
              {service.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="border border-line bg-paper-light p-5">
              <p className="eyebrow text-muted">Delivery</p>
              <p className="mt-4 text-sm leading-6 text-muted">
                Based in Mymensingh, Bangladesh. Remote collaboration available for projects
                throughout the country and internationally.
              </p>
              <a
                href="tel:+8801302776234"
                className="link-underline eyebrow mt-5 text-ink"
              >
                Call +8801302776234
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-light py-14 md:py-20">
        <div className="container-editorial grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-muted">02 / What can be included</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.6vw,4.3rem)]">
              A scope shaped around the <span className="italic">actual requirement.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              Not every item below is necessary for every engagement. The right scope is agreed
              before implementation, not assumed from a template.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid gap-0 border-t border-line sm:grid-cols-2">
              {service.deliverables.map((deliverable, index) => (
                <li
                  key={deliverable}
                  className="flex gap-4 border-b border-line py-4 text-sm leading-6 sm:odd:pr-6 sm:even:pl-6"
                >
                  <span className="eyebrow shrink-0 pt-0.5 text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">03 / Process</p>
          </div>
          <div className="lg:col-span-9">
            <div className="grid gap-0 border-t border-line md:grid-cols-4">
              {service.process.map((step, index) => (
                <div
                  key={step.title}
                  className="border-b border-line py-6 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="eyebrow text-muted">0{index + 1}</span>
                  <h2 className="mt-7 font-serif text-2xl font-normal tracking-[-0.025em]">
                    {step.title}
                  </h2>
                  <p className="mt-3 text-xs leading-6 text-muted">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-light py-12">
        <div className="container-editorial grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="eyebrow text-muted">Tools &amp; technologies</p>
          </div>
          <div className="lg:col-span-9">
            <ul className="flex flex-wrap gap-2">
              {service.technologies.map((technology) => (
                <li
                  key={technology}
                  className="border border-line bg-paper px-3 py-2 text-[0.63rem] font-semibold uppercase tracking-[0.1em] text-muted"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted">04 / Questions</p>
            <h2 className="display mt-4 text-[clamp(2.4rem,4.5vw,4rem)]">
              Straight <span className="italic">answers.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-line">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group border-b border-line py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-sm font-semibold leading-6 [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <span className="mt-1 shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProjects.length > 0 ? (
        <section className="border-y border-line bg-paper-light py-14 md:py-20">
          <div className="container-editorial">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-muted">Related work</p>
                <h2 className="display mt-4 text-[clamp(2.2rem,4.5vw,4rem)]">
                  Selected project <span className="italic">context.</span>
                </h2>
              </div>
              <Link to="/projects" className="link-underline eyebrow text-ink">
                All projects
              </Link>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link key={project.slug} to={`/projects/${project.slug}`} className="group block">
                  <div className="overflow-hidden border border-line bg-paper-deep">
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      loading="lazy"
                      decoding="async"
                      className="image-monochrome aspect-[1.5/1] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                  </div>
                  <p className="eyebrow mt-4 text-muted">{project.category}</p>
                  <h3 className="mt-2 font-serif text-2xl font-normal tracking-[-0.02em]">{project.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {relatedPosts.length > 0 ? (
        <section className="container-editorial py-14 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-muted">Related reading</p>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              <div className="border-t border-line">
                {relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group flex items-center justify-between gap-6 border-b border-line py-5"
                  >
                    <div>
                      <p className="eyebrow text-muted">{post.tags[0] ?? "Journal"}</p>
                      <h3 className="mt-2 font-serif text-2xl font-normal tracking-[-0.02em] transition-opacity group-hover:opacity-55">
                        {post.title}
                      </h3>
                    </div>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.3}
                      className="shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="container-editorial pb-16 md:pb-24">
        <div className="border border-line bg-paper-light p-7 md:p-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow text-muted">Other services</p>
              <h2 className="display mt-4 text-[clamp(2.2rem,4.8vw,4.2rem)]">
                Need a broader <span className="italic">scope?</span>
              </h2>
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {otherServices.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/services/${item.slug}`}
                    className="link-underline text-sm text-muted hover:text-ink"
                  >
                    {item.shortTitle}
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:col-span-4 md:text-right">
              <ButtonLink href="/contact">
                Start a project <ArrowRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
