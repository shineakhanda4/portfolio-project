import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <article className="group border-t border-line pt-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-muted">
            {project.index} / {project.category}
          </p>
          <h3 className="display mt-3 text-[clamp(2rem,4vw,3.8rem)]">
            <Link to={`/projects/${project.slug}`} className="link-underline">
              {project.title}
            </Link>
          </h3>
        </div>
        <span className="eyebrow pt-1 text-muted">{project.projectType}</span>
      </div>

      <Link
        to={`/projects/${project.slug}`}
        className="mt-6 block overflow-hidden border border-line bg-paper-deep"
        aria-label={`View ${project.title} project`}
      >
        <img
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className="image-monochrome aspect-[1.35/1] w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
        />
      </Link>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-lg text-sm leading-7 text-muted">{project.summary}</p>
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline eyebrow shrink-0 text-ink"
        >
          Visit live site <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
