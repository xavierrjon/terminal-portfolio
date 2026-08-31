import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col overflow-hidden rounded border border-border bg-terminal">
      {project.image && (
        <div className="relative h-36 w-full overflow-hidden border-b border-border">
          <Image
            src={project.image}
            alt={project.name}
            width={800}
            height={500}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center justify-between">
          <p className="font-bold text-accent">
            {project.emoji} {project.name}
          </p>
        </div>
        <p className="line-clamp-2 text-xs text-foreground">{project.tagline}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded border border-border px-1 py-0.5 text-[10px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
