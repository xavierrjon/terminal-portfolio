import type { ReactNode } from "react";

import type { ThemeId } from "@/data/themes";
import { themes } from "@/data/themes";
import { projects } from "@/data/projects";

import HelpCommand from "@/components/commands/HelpCommand";
import AboutCommand from "@/components/commands/AboutCommand";
import SkillsCommand from "@/components/commands/SkillsCommand";
import ProjectsCommand from "@/components/commands/ProjectsCommand";
import ExperienceCommand from "@/components/commands/ExperienceCommand";
import ContactCommand from "@/components/commands/ContactCommand";
import ResumeCommand from "@/components/commands/ResumeCommand";
import NeofetchCommand from "@/components/commands/NeofetchCommand";
import ThemeCommand from "@/components/commands/ThemeCommand";

export type CommandContext = {
  currentTheme: ThemeId;
  setTheme: (t: ThemeId) => void;
};

export type CommandResult = {
  ok: boolean;
  output?: ReactNode;
  error?: string;
  action?: "clear";
};

export type Command = {
  name: string;
  aliases?: string[];
  description: string;
  group: "main" | "legacy" | "easter";
  hidden?: boolean;
  execute: (args: string[], ctx: CommandContext) => CommandResult;
};

function renderLines(lines: string[]): ReactNode {
  return (
    <div className="flex flex-col gap-1 whitespace-pre-wrap">
      {lines.map((line, i) =>
        line === "" ? (
          <div key={i} className="h-4" />
        ) : (
          <p key={i} className="text-foreground">
            {line}
          </p>
        ),
      )}
    </div>
  );
}

function notFound(name: string): CommandResult {
  return {
    ok: false,
    error: `comando não encontrado: ${name}`,
  };
}

export const commands: Command[] = [
  {
    name: "/ajuda",
    description: "Exibe todos os comandos",
    group: "main",
    execute: () => ({ ok: true, output: <HelpCommand all={commands} /> }),
  },
  {
    name: "/sobre",
    description: "Sobre mim",
    group: "main",
    execute: () => ({ ok: true, output: <AboutCommand /> }),
  },
  {
    name: "/habilidades",
    description: "Tecnologias e conhecimentos",
    group: "main",
    execute: () => ({ ok: true, output: <SkillsCommand /> }),
  },
  {
    name: "/projetos",
    description: "Meus projetos",
    group: "main",
    execute: (args) => ({
      ok: true,
      output: <ProjectsCommand projectId={args[0]} />,
    }),
  },
  {
    name: "/experiencia",
    description: "Experiências profissionais e acadêmicas",
    group: "main",
    execute: () => ({ ok: true, output: <ExperienceCommand /> }),
  },
  {
    name: "/contato",
    description: "Formas de contato",
    group: "main",
    execute: () => ({ ok: true, output: <ContactCommand /> }),
  },
  {
    name: "/curriculo",
    description: "Currículo",
    group: "main",
    execute: (args) => {
      if (args[0] === "baixar" || args[0] === "download") {
        return {
          ok: true,
          output: renderLines([
            "A versão em PDF do currículo ainda está sendo preparada. 🚧",
            "",
            "Que tal adicionar este projeto ao seu TODO? 😅",
            "",
            "Enquanto isso, use /contato para falar comigo ou /curriculo para a versão resumida.",
          ]),
        };
      }
      return { ok: true, output: <ResumeCommand /> };
    },
  },
  {
    name: "/neofetch",
    description: "Informações do sistema (perfil)",
    group: "main",
    execute: () => ({ ok: true, output: <NeofetchCommand /> }),
  },
  {
    name: "/tema",
    description: "Alterar tema",
    group: "main",
    execute: (args, ctx) => {
      const arg = args[0]?.toLowerCase();
      if (!arg) {
        return {
          ok: true,
          output: <ThemeCommand current={ctx.currentTheme} />,
        };
      }

      const match = themes.find(
        (t) => t.label.toLowerCase() === arg || t.id === arg,
      );
      if (!match) {
        return {
          ok: false,
          error: `tema não encontrado: ${arg}`,
        };
      }

      ctx.setTheme(match.id);
      return {
        ok: true,
        output: renderLines([
          `Tema alterado para ${match.label}. 🎨`,
          "",
          "A mudança foi salva no seu navegador.",
        ]),
      };
    },
  },
  {
    name: "/clear",
    aliases: ["clear"],
    description: "Limpar terminal",
    group: "main",
    execute: () => ({ ok: true, action: "clear" }),
  },

  // ===== Comandos tradicionais (imersão) =====
  {
    name: "help",
    description: "Ajuda",
    group: "legacy",
    execute: () => ({ ok: true, output: <HelpCommand all={commands} /> }),
  },
  {
    name: "whoami",
    description: "Quem sou",
    group: "legacy",
    execute: () => ({ ok: true, output: renderLines(["johnny"]) }),
  },
  {
    name: "pwd",
    description: "Diretório de trabalho",
    group: "legacy",
    execute: () => ({
      ok: true,
      output: renderLines(["/home/johnny/portfolio"]),
    }),
  },
  {
    name: "ls",
    description: "Listar diretórios",
    group: "legacy",
    execute: () =>
      ({
        ok: true,
        output: renderLines([
          "sobre/",
          "projetos/",
          "habilidades/",
          "experiencia/",
          "contato/",
          "curriculo/",
        ]),
      }) as CommandResult,
  },

  // ===== Easter eggs =====
  {
    name: "/coffee",
    description: "Café necessário",
    group: "easter",
    hidden: true,
    execute: () =>
      ({
        ok: true,
        output: renderLines([
          "☕ Café necessário para continuar.",
          "",
          "████████████████████ 100%",
          "",
          "Pronto. Agora podemos codar. 💻",
        ]),
      }) as CommandResult,
  },
  {
    name: "/sudo",
    description: "Elevar privilégios (vai, tenta)",
    group: "easter",
    hidden: true,
    execute: () =>
      ({
        ok: true,
        output: renderLines([
          "Nice try. 😏",
          "",
          "Mas você pode usar /contato.",
        ]),
      }) as CommandResult,
  },
  {
    name: "/hello",
    description: "Olá",
    group: "easter",
    hidden: true,
    execute: () =>
      ({
        ok: true,
        output: renderLines([
          "Olá, humano! 👋 Bem-vindo(a) ao meu terminal.",
          "",
          "Bora explorar? Digite / para ver os comandos.",
        ]),
      }) as CommandResult,
  },
];

export const commandNames = commands.flatMap((c) => [
  c.name,
  ...(c.aliases ?? []),
]);

export function findCommand(raw: string): Command | undefined {
  const name = raw.toLowerCase();
  return commands.find(
    (c) => c.name === name || c.aliases?.includes(name),
  );
}

export function runCommand(raw: string, ctx: CommandContext): CommandResult {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, output: undefined };

  for (const cmd of commands) {
    const names = [cmd.name, ...(cmd.aliases ?? [])];
    for (const n of names) {
      if (trimmed === n) return cmd.execute([], ctx);
      if (trimmed.startsWith(n + " ")) {
        const rest = trimmed.slice(n.length).trim();
        return cmd.execute(rest.split(/\s+/).filter(Boolean), ctx);
      }
      if (trimmed.startsWith(n + "/")) {
        const rest = trimmed.slice(n.length + 1).trim();
        const parts = rest
          .split("/")
          .map((s) => s.trim())
          .filter(Boolean);
        return cmd.execute(parts, ctx);
      }
    }
  }

  return notFound(trimmed.split(/\s+/)[0]);
}

export function suggest(input: string): string[] {
  const q = input.toLowerCase();

  // subcomandos de projetos: "/projetos e..." -> "/projetos ecomida"
  const projMatch = q.match(/^\/projetos(?:\s+|\/)(.*)$/);
  if (projMatch) {
    const arg = (projMatch[1] ?? "").trim();
    const matches = projects
      .filter((p) => p.id.toLowerCase().startsWith(arg))
      .map((p) => `/projetos/${p.id}`);
    if (matches.length > 0) return matches;
    return commandNames.filter((n) => n.toLowerCase().startsWith(q));
  }

  // subcomandos de temas: "/tema d..." -> "/tema dracula"
  const temaMatch = q.match(/^\/tema(?:\s+|\/)(.*)$/);
  if (temaMatch) {
    const arg = (temaMatch[1] ?? "").trim();
    const matches = themes
      .filter((t) => t.id.toLowerCase().startsWith(arg))
      .map((t) => `/tema ${t.id}`);
    if (matches.length > 0) return matches;
    return commandNames.filter((n) => n.toLowerCase().startsWith(q));
  }

  if (!q) return [];
  return commandNames.filter((n) => n.toLowerCase().startsWith(q));
}

export function closestCommand(input: string): string | undefined {
  const q = input.toLowerCase();

  // remove barra para comparar com nomes
  const normalized = q.startsWith("/") ? q.slice(1) : q;

  const candidates = commands
    .flatMap((c) => [c.name.replace(/^\//, "")])
    .filter((n) => n.length > 2);

  let best: string | undefined;
  let bestScore = -1;

  for (const cand of candidates) {
    // distância de edição simples (levenstein)
    const score = editDistance(normalized, cand);
    if (score <= 2 && (best === undefined || score < bestScore)) {
      best = cand;
      bestScore = score;
    }
  }

  return best ? `/${best}` : undefined;
}

function editDistance(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
    new Array(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[a.length][b.length];
}

export { renderLines, notFound };
