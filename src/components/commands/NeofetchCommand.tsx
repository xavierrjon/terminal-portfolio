import { profile } from "@/data/profile";

const ascii = [
  "      ██╗██╗  ██╗",
  "      ██║╚██╗██╔╝",
  "      ██║ ╚███╔╝ ",
  " ██   ██║ ██╔██╗ ",
  " ╚█████╔╝██╔╝ ██╗",
  "  ╚════╝ ╚═╝  ╚═╝",
];

export default function NeofetchCommand() {
  const info: [string, string][] = [
    ["Cargo", profile.role],
    ["Foco", profile.focus],
    ["Stack", profile.stack],
    ["Backend", profile.backend],
    ["Database", profile.database],
    ["Local", profile.location],
    ["Editor", profile.editor],
    ["Status", profile.status],
  ];

  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-6">
      <div className="shrink-0 text-accent whitespace-pre leading-[1.15]">
        {ascii.join("\n")}
      </div>
      <div className="flex flex-col justify-center gap-0.5">
        <p className="mb-1 text-foreground">{profile.handle}</p>
        <div className="h-px w-full max-w-xl bg-border mb-1" />
        {info.map(([k, v]) => (
          <p key={k} className="text-sm">
            <span className="w-20 inline-block text-muted-foreground">{k}</span>
            <span className="text-foreground">{v}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
