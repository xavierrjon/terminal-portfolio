import { experiences } from "@/data/experience";

const typeLabel = {
  academic: "Acadêmico",
  program: "Programa",
  project: "Projeto",
  volunteer: "Voluntário",
} as const;

export default function ExperienceCommand() {
  return (
    <div className="flex flex-col gap-5">
      {experiences.map((exp, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <p className="font-semibold text-accent">{exp.title}</p>
            <span className="text-xs text-muted-foreground">
              [{typeLabel[exp.type]}]
            </span>
          </div>
          <p className="text-sm text-foreground">
            {exp.org} · <span className="text-dim">{exp.period}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{exp.description}</p>
          <ul className="mt-1 flex flex-col gap-0.5 text-sm text-foreground">
            {exp.highlights.map((h) => (
              <li key={h}>• {h}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
