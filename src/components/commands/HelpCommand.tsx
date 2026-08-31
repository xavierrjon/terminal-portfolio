import type { Command } from "@/lib/commands";

export default function HelpCommand({ all = [] }: { all?: Command[] }) {
  const main = all.filter((c) => c.group === "main");
  const legacy = all.filter((c) => c.group === "legacy");
  const easter = all.filter((c) => c.group === "easter");

  return (
    <div className="flex flex-col gap-4">
      <p className="text-accent">Comandos disponíveis:</p>

      <div className="flex flex-col gap-1">
        {main.map((c) => (
          <div key={c.name} className="flex flex-col gap-0.5 md:flex-row md:gap-4">
            <span className="w-40 shrink-0 text-foreground">{c.name}</span>
            <span className="text-muted-foreground">{c.description}</span>
          </div>
        ))}
      </div>

      <div className="mt-2 border-t border-border pt-3">
        <p className="text-muted-foreground">Aliases em inglês:</p>
        <div className="mt-1 flex flex-col gap-0.5">
          {main
            .filter((c) => c.aliases && c.aliases.length > 0)
            .map((c) => (
              <div key={c.name} className="flex gap-4">
                <span className="w-40 shrink-0 text-foreground">
                  {c.aliases?.join(" / ")}
                </span>
                <span className="text-muted-foreground">→ {c.name}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="border-t border-border pt-3">
        <p className="text-muted-foreground">Comandos tradicionais:</p>
        <div className="mt-1 flex flex-wrap gap-2">
          {legacy.map((c) => (
            <span key={c.name} className="text-foreground">
              {c.name}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-3">
        <p className="text-muted-foreground">
          Easter eggs <span className="text-dim">(segredo 😉)</span>:
        </p>
        <div className="mt-1 flex flex-wrap gap-2">
          {easter.map((c) => (
            <span key={c.name} className="text-foreground">
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
