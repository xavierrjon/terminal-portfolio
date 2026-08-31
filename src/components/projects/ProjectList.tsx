import { projects } from "@/data/projects";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import ProjectDetails from "./ProjectDetails";

export default function ProjectList({
  initialId,
}: {
  initialId?: string;
}) {
  const selected: Project | undefined = initialId
    ? projects.find((p) => p.id === initialId)
    : undefined;

  if (selected) {
    return <ProjectDetails project={selected} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-accent">
        {projects.length} projetos encontrados.
      </p>
      <p className="text-muted-foreground">
        # use /projetos/&lt;nome&gt; para ver os detalhes de um projeto.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
