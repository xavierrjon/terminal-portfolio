import type { ReactNode } from "react";
import type { CommandResult } from "@/lib/commands";

export type TerminalEntry = {
  id: number;
  input: string;
  result?: CommandResult;
};

function PromptRow({ input }: { input: string }) {
  return (
    <div className="flex gap-1 break-all text-sm md:text-base">
      <span className="shrink-0 text-accent">johnny@portfolio</span>
      <span className="shrink-0 text-muted-foreground">:~$</span>
      <span className="text-foreground"> {input}</span>
    </div>
  );
}

function Node({ children }: { children: ReactNode }) {
  return <div className="my-2 py-1">{children}</div>;
}

export default function TerminalOutput({ entries }: { entries: TerminalEntry[] }) {
  return (
    <div className="flex flex-col">
      {entries.map((entry) => (
        <div key={entry.id} className="flex flex-col">
          <PromptRow input={entry.input} />
          {entry.result ? (
            <Node>
              {entry.result.ok ? (
                entry.result.action === "clear" ? null : (
                  <div className="command-output">{entry.result.output}</div>
                )
              ) : (
                <div className="command-output text-red-400">
                  <p>{entry.result.error}</p>
                  <p className="mt-1 text-muted-foreground">
                    Digite /ajuda para ver os comandos disponíveis.
                  </p>
                </div>
              )}
            </Node>
          ) : null}
        </div>
      ))}
    </div>
  );
}
