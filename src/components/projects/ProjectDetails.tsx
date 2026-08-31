import Image from "next/image";
import type { Project } from "@/types/project";

const statusLabel: Record<Project["status"], string> = {
  completed: "Concluído",
  "in-progress": "Em andamento",
  archived: "Arquivado",
};

const statusColor: Record<Project["status"], string> = {
  completed: "text-accent",
  "in-progress": "text-highlight",
  archived: "text-muted-foreground",
};

export default function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded border border-border bg-muted px-4 py-3">
        <p className="text-lg font-bold uppercase text-accent">
          {project.emoji} {project.name}
        </p>
        <p className="text-sm text-foreground">{project.tagline}</p>
      </div>

      {project.image && (
        <div className="relative h-48 w-full max-w-xl overflow-hidden rounded border border-border">
          <Image
            src={project.image}
            alt={project.name}
            width={1000}
            height={600}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {project.problem && (
        <div>
          <p className="text-accent">PROBLEMA</p>
          <p className="text-foreground">{project.problem}</p>
        </div>
      )}

      {project.solution && (
        <div>
          <p className="text-accent">SOLUÇÃO</p>
          <p className="text-foreground">{project.solution}</p>
        </div>
      )}

      <div>
        <p className="text-accent">TECNOLOGIAS</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded border border-border px-1.5 py-0.5 text-xs text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-accent">RECURSOS</p>
        <ul className="mt-1 flex flex-col gap-1 text-foreground">
          {project.features.map((f) => (
            <li key={f}>• {f}</li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-muted-foreground">
        status: <span className={statusColor[project.status]}>
          {statusLabel[project.status]}
        </span>
      </p>

      <div className="pt-2">
        <p className="text-accent">
          ─{" "}
          {project.liveUrl || project.githubUrl ? "LINKS" : ""}
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-accent bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground no-underline transition hover:brightness-110"
            >
              VISITAR SITE ↗
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-border bg-muted px-4 py-2 text-sm text-foreground no-underline transition hover:border-accent hover:text-accent"
            >
              GITHUB ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
