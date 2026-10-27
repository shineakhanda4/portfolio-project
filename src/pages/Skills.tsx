import { Link } from "react-router-dom";
import { SKILL_CATEGORIES } from "@/data/skills";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PageHeader } from "@/components/ui/PageHeader";

export function Skills() {
  return (
    <>
      <div className="container-editorial pt-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Skills" }]} />
      </div>

      <div className="container-editorial">
        <PageHeader
          eyebrow="Capabilities / Technology"
          title={
            <>
              Built with the right tools, <span className="italic text-muted">not the loudest ones.</span>
            </>
          }
          intro={
            <p>
              A practical stack spanning frontend engineering, backend development, data, Linux
              operating systems, and server administration. No proficiency percentages, no invented
              certifications — just the technologies and the work they support.
            </p>
          }
          meta={
            <div className="border-t border-ink pt-4">
              <p className="eyebrow text-muted">Explore</p>
              <ul className="mt-4 space-y-2">
                {SKILL_CATEGORIES.map((category) => (
                  <li key={category.slug}>
                    <a
                      href={`#${category.slug}`}
                      className="flex items-center justify-between gap-3 border-b border-line pb-2 text-xs text-muted transition-colors hover:text-ink"
                    >
                      <span>{category.title}</span>
                      <span className="text-[0.6rem] uppercase tracking-[0.1em]">
                        {category.items.length}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </div>

      <div className="container-editorial py-14 md:py-20">
        {SKILL_CATEGORIES.map((category) => (
          <section
            key={category.slug}
            id={category.slug}
            className="scroll-mt-28 border-t border-line py-10 first:pt-0 md:py-14"
          >
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <p className="eyebrow text-muted">{category.label}</p>
                <h2 className="display mt-4 text-[clamp(2rem,3.8vw,3.4rem)]">{category.title}</h2>
                <p className="mt-4 max-w-xs text-sm leading-7 text-muted">{category.description}</p>
              </div>
              <div className="lg:col-span-9">
                <ul className="grid border-l border-t border-line sm:grid-cols-2 xl:grid-cols-3">
                  {category.items.map((item) => (
                    <li
                      key={`${category.slug}-${item.name}`}
                      className="group flex min-h-[10.5rem] flex-col border-b border-r border-line p-5 transition-colors hover:bg-paper-light"
                    >
                      <div className="flex items-start justify-between">
                        <span className="flex h-10 w-10 items-center justify-center border border-line bg-paper-light text-ink transition-colors group-hover:border-ink">
                          <BrandIcon name={item.icon} size={20} />
                        </span>
                        <span className="text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                          {category.label.split(" — ")[0]}
                        </span>
                      </div>
                      <h3 className="mt-6 text-sm font-semibold">{item.name}</h3>
                      <p className="mt-2 text-xs leading-5 text-muted">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="border-y border-line bg-paper-light py-14 md:py-20">
        <div className="container-editorial grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-muted">The full picture</p>
            <h2 className="display mt-4 text-[clamp(2.3rem,4.6vw,4.2rem)]">
              Software skill is only half of a reliable <span className="italic">website.</span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-5 text-sm leading-7 text-muted">
              <p>
                A project can be beautifully implemented and still fail operationally. That is why
                this stack includes Linux distributions and the practical work around them: server
                setup, bare-metal infrastructure, maintenance, troubleshooting, and recovery.
              </p>
              <p>
                The operating-system work is not presented as a list of logos. It is a working
                interest in understanding what is running, why it failed, and how to make the next
                failure less likely. For businesses, that means a website is supported by someone
                who can move from the interface to the machine underneath.
              </p>
              <p>
                Technologies are selected per project. A simple content site does not need a
                distributed database, and a small business does not benefit from a stack its team
                cannot maintain.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="link-underline eyebrow text-ink"
              >
                See how these skills become services
              </Link>
              <Link
                to="/infrastructure"
                className="link-underline eyebrow text-muted"
              >
                Infrastructure experience
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-muted">Next step</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5.2rem)]">
              Need the right stack for a real <span className="italic">business problem?</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <ButtonLink href="/contact">Start a project</ButtonLink>
            <ButtonLink href="/projects" variant="outline">
              See the work
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
