import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skillCategories } from "@/data/skills";
import { experiences } from "@/data/experience";

export default function ResumeCommand() {
  const allSkills = skillCategories
    .flatMap((c) => c.skills.map((s) => s.name))
    .slice(0, 8)
    .join(", ");

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded border border-border bg-muted px-4 py-3">
        <p className="text-lg font-bold text-accent">{profile.name}</p>
        <p className="text-sm text-foreground">{profile.role}</p>
        <p className="text-sm text-muted-foreground">{profile.location} · {profile.timezone}</p>
      </div>

      <div>
        <p className="text-accent">RESUMO</p>
        <p className="text-sm text-foreground">
          Desenvolvedor full-stack em formação com foco em frontend e UI/UX.
          Experiência prática com React, Next.js, TypeScript e Tailwind CSS,
          construindo aplicações web funcionais e bem desenhadas.
        </p>
      </div>

      <div>
        <p className="text-accent">FORMAÇÃO</p>
        <p className="text-sm text-foreground">
          Engenharia de Software · UFAM
        </p>
        <p className="text-sm text-muted-foreground">
          WebAcademy · ICOMP × Motorola (capacitação full-stack)
        </p>
      </div>

      <div>
        <p className="text-accent">HABILIDADES</p>
        <p className="text-sm text-foreground">{allSkills}</p>
      </div>

      <div>
        <p className="text-accent">EXPERIÊNCIAS</p>
        <ul className="flex flex-col gap-1 text-sm text-foreground">
          {experiences.map((e, i) => (
            <li key={i}>• {e.title} — {e.org}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-accent">PROJETOS ({projects.length})</p>
        <p className="text-sm text-foreground">
          {projects.map((p) => p.name).join(" · ")}
        </p>
      </div>

      <div className="border-t border-border pt-3">
        <p className="text-xs text-muted-foreground">
          # versão em PDF em breve 🚧
        </p>
        <p className="text-xs text-muted-foreground">
          # emprego: abre /contato para conversar
        </p>
      </div>
    </div>
  );
}
