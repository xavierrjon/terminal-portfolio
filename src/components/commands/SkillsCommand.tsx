import { skillCategories } from "@/data/skills";

function SkillBar({ level }: { level: number }) {
  const width = `${level}%`;
  return (
    <div className="h-2.5 w-full max-w-[220px] overflow-hidden rounded-sm border border-border bg-muted">
      <div
        className="skill-bar h-full bg-accent"
        style={{ "--bar-width": width } as React.CSSProperties}
      />
    </div>
  );
}

export default function SkillsCommand() {
  return (
    <div className="flex flex-col gap-6">
      {skillCategories.map((cat) => (
        <div key={cat.title}>
          <p className="mb-2 text-accent">
            {cat.icon} {cat.title.toUpperCase()}
          </p>
          <div className="flex flex-col gap-1.5">
            {cat.skills.map((s) => (
              <div
                key={s.name}
                className="flex flex-col gap-1 text-sm md:flex-row md:items-center md:justify-between md:gap-6"
              >
                <span className="w-36 shrink-0 text-foreground">{s.name}</span>
                <SkillBar level={s.level} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        # as barras são apenas uma representação visual de familiaridade.
      </p>
    </div>
  );
}
