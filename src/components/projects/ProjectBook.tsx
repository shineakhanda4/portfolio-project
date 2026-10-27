import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type BookPageProps = {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  animate: boolean;
};

function BookPage({ project, index, total, progress, animate }: BookPageProps) {
  const isLast = index === total - 1;
  const segment = 1 / total;
  const start = segment * (index + 1) - segment * 0.34;
  const end = segment * (index + 1);
  const transformStart = isLast ? 0 : start;
  const transformEnd = isLast ? 1 : end;

  const rotateX = useTransform(progress, [transformStart, transformEnd], [0, isLast ? 0 : 4.5]);
  const rotateY = useTransform(
    progress,
    [transformStart, transformEnd],
    [0, isLast ? 0 : index % 2 === 0 ? -3.2 : 3.2],
  );
  const scale = useTransform(progress, [transformStart, transformEnd], [1, isLast ? 1 : 0.94]);
  const y = useTransform(progress, [transformStart, transformEnd], [0, isLast ? 0 : -26]);
  const opacity = useTransform(progress, [transformStart, transformEnd], [1, isLast ? 1 : 0.42]);

  const imageFirst = index % 2 === 1;

  return (
    <div
      id={`project-page-${project.slug}`}
      className="project-book-card relative z-[var(--page-z)] mb-12 lg:sticky lg:top-[100px] lg:mb-[20vh]"
      style={{ "--page-z": index + 1 } as React.CSSProperties}
    >
      <motion.article
        className="book-page overflow-hidden"
        style={animate ? { rotateX, rotateY, scale, y, opacity } : undefined}
        aria-labelledby={`project-title-${project.slug}`}
      >
        <div className="book-page-inner grid h-full min-h-[600px] lg:min-h-0 lg:grid-cols-12">
          <div
            className={cn(
              "relative flex flex-col p-5 sm:p-7 md:p-8 lg:col-span-5 lg:p-9",
              imageFirst ? "lg:order-2" : "lg:order-1",
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow text-muted">
                Project {project.index} / {String(total).padStart(2, "0")}
              </p>
              <p className="text-right text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-muted">
                {project.category}
              </p>
            </div>

            <div className="my-auto py-9 lg:py-6">
              <h2
                id={`project-title-${project.slug}`}
                className="font-serif text-[clamp(2.8rem,5.4vw,5.8rem)] font-light leading-[0.92] tracking-[-0.045em]"
              >
                {project.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-muted">{project.summary}</p>

              <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Verified technologies">
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="border border-line px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-2">
                <Link
                  to={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 border border-ink bg-ink px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-transparent hover:text-ink"
                >
                  Read case study
                </Link>
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-ink"
                >
                  Live site <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-3">
              <span className="text-[0.58rem] uppercase tracking-[0.14em] text-muted">
                {project.projectType}
              </span>
              <span className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.14em] text-muted">
                {isLast ? "End of selection" : "Continue"}
                {isLast ? null : <ArrowDown size={12} strokeWidth={1.5} aria-hidden="true" />}
              </span>
            </div>
          </div>

          <figure
            className={cn(
              "relative min-h-[18rem] overflow-hidden border-t border-line bg-paper-deep lg:col-span-7 lg:min-h-0 lg:border-t-0",
              imageFirst
                ? "order-first border-b border-t-0 lg:order-1 lg:border-b-0 lg:border-r"
                : "lg:order-2 lg:border-l",
            )}
          >
            <img
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full object-cover grayscale transition-[filter,transform] duration-700 hover:scale-[1.015] hover:grayscale-0 lg:absolute lg:inset-0"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-3 border-t border-white/20 bg-black/55 px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.12em] text-white/70 backdrop-blur-[2px]">
              <span>{project.title}</span>
              <span>{project.projectType}</span>
            </figcaption>
          </figure>
        </div>
        <span className="page-corner" aria-hidden="true" />
      </motion.article>
    </div>
  );
}

export function ProjectBook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <>
      <noscript>
        <style>{`.project-book-card{position:static !important;margin-bottom:2rem !important;}`}</style>
      </noscript>
      <div className="relative" style={{ perspective: "1800px" }} ref={containerRef}>
        {PROJECTS.map((project, index) => (
          <BookPage
            key={project.slug}
            project={project}
            index={index}
            total={PROJECTS.length}
            progress={scrollYProgress}
            animate={isDesktop && !reduceMotion}
          />
        ))}
      </div>
    </>
  );
}
