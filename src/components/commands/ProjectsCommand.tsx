import ProjectList from "@/components/projects/ProjectList";

export default function ProjectsCommand({ projectId }: { projectId?: string }) {
  return <ProjectList initialId={projectId} />;
}
