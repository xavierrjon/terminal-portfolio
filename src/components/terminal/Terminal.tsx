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
import CommandPalette from "./CommandPalette";
import BottomBar from "./BottomBar";
import CommandSidebar from "./CommandSidebar";

let idCounter = 0;

export default function Terminal() {
  const { theme, setTheme } = useThemeContext();

  const [booting, setBooting] = useState(true);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [input, setInput] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);

  const history = useCommandHistory();
  const { suggestions } = useCommandAutocomplete(input);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const paletteOpenRef = useRef(false);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    paletteOpenRef.current = paletteOpen;
  }, [paletteOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [entries, input, scrollToBottom, booting]);

  useEffect(() => {
    if (booting) return;
    const onKeyDown = () => {
      if (paletteOpenRef.current) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (el && el.closest("a")) return;
      if (el === inputRef.current) return;
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    inputRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [booting]);

  useEffect(() => {
    if (booting) return;
    const handler = (e: KeyboardEvent) => {
      if (paletteOpenRef.current) return;
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const el = document.activeElement as HTMLElement | null;
        if (el === inputRef.current) return;
        if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
        if (el && el.closest(".palette-container")) return;
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
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

  const submitCommand = useCallback(
    (rawValue: string) => {
      const value = rawValue.trim();
      history.add(value);
      setInput("");

      if (!value) {
        setEntries((prev) => [...prev, { id: ++idCounter, input: "" }]);
        return;
      }

      const result: CommandResult = runCommand(value, { currentTheme: theme, setTheme });

      if (result.action === "clear") {
        setEntries([]);
        return;
      }

      if (!result.ok && result.error) {
        const guess = closestCommand(value);
        const entry: TerminalEntry = {
          id: ++idCounter,
          input: value,
          result: {
            ok: false,
            error:
              guess && guess !== value.split(/\s+/)[0]
                ? `${result.error}\n\nVocê quis dizer:\n\n> ${guess}`
                : result.error,
          },
        };
        setEntries((prev) => [...prev, entry]);
        return;
      }

      setEntries((prev) => [...prev, { id: ++idCounter, input: value, result }]);
    },
    [history, theme, setTheme],
  );

  const submit = useCallback(() => {
    submitCommand(input);
  }, [input, submitCommand]);

  const executeCommand = useCallback(
    (cmd: string) => {
      setInput(cmd);
      setTimeout(() => {
        submitCommand(cmd);
        inputRef.current?.blur();
      }, 80);
    },
    [submitCommand],
  );

  const handlePaletteExecute = useCallback(
    (cmd: string) => {
      setPaletteOpen(false);
      executeCommand(cmd);
    },
    [executeCommand],
  );

  const onInputKeyDown = useCallback(
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
    <>
      <div className="terminal-root">
        <div className="terminal-frame">
          <TerminalHeader />

          <div className="terminal-frame-body">
            <CommandSidebar onCommand={executeCommand} />

            <div
              ref={scrollRef}
              className="terminal-scroll"
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

                <div className="terminal-input-area">
                  <CommandSuggestions
                    input={input}
                    suggestions={suggestions}
                    onSelect={complete}
                  />
                  <TerminalInput
                    value={input}
                    onChange={(v) => {
                      setInput(v);
                      history.setInput(v);
                    }}
                    onKeyDown={onInputKeyDown}
                    inputRef={inputRef}
                  />
                </div>
              </>
            )}
            </div>
          </div>
        </div>

        <p className="terminal-hint">
          <span className="hidden md:inline">
            dica: digite <span className="text-accent">/</span> para ver os
            comandos ·{" "}
            <span className="text-accent">↑</span>/
            <span className="text-accent">↓</span> histórico ·{" "}
            <span className="text-accent">Tab</span> autocompleta ·{" "}
            <span className="text-accent">/ajuda</span> para ajuda
          </span>
          <span className="md:hidden">
            toque em <span className="text-accent font-bold">/</span> para
            explorar os comandos
          </span>
        </p>
      </div>

      <button
        className="terminal-fab"
        onClick={() => setPaletteOpen(true)}
        type="button"
        aria-label="Abrir paleta de comandos"
      >
        /
      </button>

      <BottomBar
        onOpenPalette={() => setPaletteOpen(true)}
        onCommand={executeCommand}
      />

      <CommandPalette
        key={paletteOpen ? "open" : "closed"}
        open={paletteOpen}
        onExecute={handlePaletteExecute}
        onClose={() => setPaletteOpen(false)}
      />

      <style>{`
        .terminal-root {
          display: flex;
          flex-direction: column;
          height: 100dvh;
          max-height: 100dvh;
          width: 100%;
          padding: 0.5rem;
          box-sizing: border-box;
        }
        @media (min-width: 768px) {
          .terminal-root {
            padding: 1rem;
            max-width: 72rem;
            margin: 0 auto;
          }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .terminal-root {
            padding: 0.75rem;
          }
        }

        .terminal-frame {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--terminal);
          box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);
        }
        @media (min-width: 768px) {
          .terminal-frame {
            border-radius: 8px;
          }
        }

        .terminal-frame-body {
          display: flex;
          flex-direction: row;
          flex: 1;
          min-height: 0;
        }

        .terminal-scroll {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 1rem;
          overscroll-behavior: contain;
        }
        @media (min-width: 768px) {
          .terminal-scroll {
            padding: 1rem 1.5rem;
          }
        }

        .terminal-input-area {
          position: sticky;
          bottom: 0;
          margin-top: 0.5rem;
          background: var(--terminal);
          padding-top: 0.5rem;
        }

        .terminal-hint {
          text-align: center;
          font-size: 0.7rem;
          color: var(--muted-foreground);
          padding: 0.35rem 0.5rem 0;
          flex-shrink: 0;
          padding-bottom: env(safe-area-inset-bottom, 0);
        }

        .terminal-fab {
          display: none;
        }
        @media (max-width: 767px) {
          .terminal-fab {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            bottom: calc(3.2rem + env(safe-area-inset-bottom, 0px));
            right: 1rem;
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 1px solid var(--border);
            background: var(--muted);
            color: var(--accent);
            font-family: inherit;
            font-size: 1.4rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 50;
            transition: transform 0.15s, box-shadow 0.15s;
            -webkit-tap-highlight-color: transparent;
          }
          .terminal-fab:active {
            transform: scale(0.92);
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          }
        }
      `}</style>
    </>
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
