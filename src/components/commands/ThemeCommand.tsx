import { themes, type ThemeId } from "@/data/themes";

export default function ThemeCommand({ current }: { current: ThemeId }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-accent">Temas disponíveis:</p>

      <div className="flex flex-col gap-1">
        {themes.map((t, i) => {
          const active = t.id === current;
          return (
            <div
              key={t.id}
              className={`flex items-center gap-3 rounded px-2 py-1 text-sm ${
                active ? "bg-muted text-accent" : "text-foreground"
              }`}
            >
              <span className="w-6 text-right text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{t.label}</span>
              <span className="text-xs text-muted-foreground">
                · {t.description}
              </span>
              {active && <span className="ml-auto text-accent">●</span>}
            </div>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground">
        # use /tema &lt;nome&gt; para alternar, ex.: /tema matrix
      </p>
    </div>
  );
}
