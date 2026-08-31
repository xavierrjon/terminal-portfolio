"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/types/project";
import ProjectDetails from "./ProjectDetails";

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="self-start rounded border border-border bg-muted px-3 py-1.5 text-xs text-muted-foreground transition hover:border-accent hover:text-accent"
        >
          ← voltar para lista
        </button>
        <ProjectDetails project={project} />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setExpanded(true)}
      className="flex flex-col overflow-hidden rounded border border-border bg-terminal text-left transition hover:border-accent active:border-accent"
      aria-label={`Ver detalhes de ${project.name}`}
    >
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
        <span className="mt-2 inline-block rounded border border-accent px-3 py-1.5 text-center text-xs font-semibold text-accent">
          Ver projeto →
        </span>
      </div>
    </button>
  );
}
