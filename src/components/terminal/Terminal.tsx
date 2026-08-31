"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { closestCommand, runCommand } from "@/lib/commands";
import type { CommandResult } from "@/lib/commands";
import { useCommandHistory } from "@/hooks/useCommandHistory";
import { useCommandAutocomplete } from "@/hooks/useCommandAutocomplete";
import { useThemeContext } from "@/components/theme/ThemeProvider";
import { welcomeText } from "@/data/profile";
import BootScreen from "./BootScreen";
import TerminalHeader from "./TerminalHeader";
import TerminalOutput, { type TerminalEntry } from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import CommandSuggestions from "./CommandSuggestions";

let idCounter = 0;

export default function Terminal() {
  const { theme, setTheme } = useThemeContext();

  const [booting, setBooting] = useState(true);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState("");

  const history = useCommandHistory();
  const { suggestions } = useCommandAutocomplete(input);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [entries, input, scrollToBottom, booting]);

  useEffect(() => {
    if (booting) return;
    const onKeyDown = () => {
      const el = document.activeElement as HTMLElement | null;
      if (el && el.closest("a")) return;
      if (el === inputRef.current) return;
      inputRef.current?.focus();
    };
    const onBlur = () => inputRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("blur", onBlur);
    inputRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("blur", onBlur);
    };
  }, [booting]);

  const finishBoot = useCallback(() => setBooting(false), []);

  const complete = useCallback(
    (value: string) => {
      setInput(value);
      history.setInput(value);
      focusInput();
    },
    [history, focusInput],
  );

  const submit = useCallback(() => {
    const value = input.trim();
    history.add(value);

    if (!value) {
      setEntries((prev) => [...prev, { id: ++idCounter, input: "" }]);
      setInput("");
      return;
    }

    const result: CommandResult = runCommand(value, { currentTheme: theme, setTheme });

    if (result.action === "clear") {
      setEntries([]);
      setInput("");
      return;
    }

    if (!result.ok && result.error) {
      // "você quis dizer?"
      const guess = closestCommand(value);
      const entry: TerminalEntry = {
        id: ++idCounter,
        input: value,
        result: {
          ok: false,
          error: guess && guess !== value.split(/\s+/)[0] ? `${result.error}\n\nVocê quis dizer:\n\n> ${guess}` : result.error,
        },
      };
      setEntries((prev) => [...prev, entry]);
      setInput("");
      return;
    }

    setEntries((prev) => [...prev, { id: ++idCounter, input: value, result }]);
    setInput("");
  }, [input, history, theme, setTheme]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const v = history.up();
        if (v !== null) {
          setInput(v);
          history.setInput("");
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const v = history.down();
        if (v !== null) {
          setInput(v);
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (suggestions.length === 1) {
          complete(suggestions[0] + " ");
        } else if (suggestions.length > 1) {
          // completa até o prefixo comum
          const common = commonPrefix(suggestions);
          if (common.length > input.trimStart().length) complete(common);
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setEntries([]);
      }
    },
    [submit, history, suggestions, complete, input],
  );

  return (
    <div className="mx-auto flex h-[calc(100dvh-3rem)] w-full max-w-5xl flex-col px-4 py-4 md:px-6">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border border-border bg-terminal shadow-[0_0_50px_rgba(0,0,0,0.4)]">
        <TerminalHeader />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 md:px-6"
          tabIndex={-1}
        >
          {booting ? (
            <BootScreen onComplete={finishBoot} />
          ) : (
            <>
              <div className="flex flex-col gap-1 pb-3 text-sm text-foreground md:text-base">
                {welcomeText.map((line, i) =>
                  line === "" ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <p key={i}>{line}</p>
                  ),
                )}
              </div>

              <TerminalOutput entries={entries} />

              <div className="mt-2">
                <CommandSuggestions
                  input={input}
                  suggestions={suggestions}
                />
                <TerminalInput
                  value={input}
                  onChange={(v) => {
                    setInput(v);
                    history.setInput(v);
                  }}
                  onKeyDown={onKeyDown}
                  inputRef={inputRef}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        dica: digite <span className="text-accent">/</span> para ver os comandos ·{" "}
        <span className="text-accent">↑</span>/
        <span className="text-accent">↓</span> histórico ·{" "}
        <span className="text-accent">Tab</span> autocompleta ·{" "}
        <span className="text-accent">/ajuda</span> para ajuda
      </p>
    </div>
  );
}

function commonPrefix(list: string[]): string {
  if (list.length === 0) return "";
  let prefix = list[0];
  for (const s of list) {
    while (!s.startsWith(prefix)) prefix = prefix.slice(0, -1);
    if (prefix === "") break;
  }
  return prefix;
}
