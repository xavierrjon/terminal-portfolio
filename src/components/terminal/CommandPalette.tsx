"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { commands } from "@/lib/commands";
import { projects } from "@/data/projects";
import { themes } from "@/data/themes";

type CommandPaletteProps = {
  open: boolean;
  onExecute: (cmd: string) => void;
  onClose: () => void;
};

type PaletteGroup = {
  label: string;
  items: { cmd: string; desc: string }[];
};

function buildGroups(q: string): PaletteGroup[] {
  const normalized = q.toLowerCase().replace(/\s+/g, " ").trimStart();

  const mainCmds = commands.filter((c) => c.group === "main");
  const otherCmds = commands.filter(
    (c) => c.group === "legacy" || c.group === "easter",
  );

  const main: { cmd: string; desc: string }[] = [];
  const other: { cmd: string; desc: string }[] = [];

  for (const c of mainCmds) {
    if (!normalized || c.name.toLowerCase().includes(normalized)) {
      main.push({ cmd: c.name, desc: c.description });
    }
  }

  for (const c of otherCmds) {
    if (!normalized || c.name.toLowerCase().includes(normalized)) {
      other.push({ cmd: c.name, desc: c.description });
    }
  }

  const sub = subSuggestions(normalized);
  const groups: PaletteGroup[] = [];

  if (sub.length > 0) {
    groups.push({ label: "RESULTADOS", items: sub });
  }

  if (main.length > 0) {
    groups.push({ label: "PRINCIPAL", items: main });
  }

  if (other.length > 0) {
    groups.push({ label: "OUTROS", items: other });
  }

  return groups;
}

function allItems(groups: PaletteGroup[]): { cmd: string; desc: string }[] {
  return groups.flatMap((g) => g.items);
}

function subSuggestions(q: string): { cmd: string; desc: string }[] {
  const pm = q.match(/^\/projetos(?:\s+|\/)(.*)$/);
  if (pm) {
    const arg = (pm[1] ?? "").trim();
    return projects
      .filter((p) => p.id.toLowerCase().startsWith(arg))
      .map((p) => ({
        cmd: `/projetos/${p.id}`,
        desc: p.tagline,
      }));
  }

  const tm = q.match(/^\/tema(?:\s+|\/)(.*)$/);
  if (tm) {
    const arg = (tm[1] ?? "").trim();
    return themes
      .filter((t) => t.id.toLowerCase().startsWith(arg))
      .map((t) => ({
        cmd: `/tema ${t.id}`,
        desc: t.description,
      }));
  }

  return [];
}

export default function CommandPalette({
  open,
  onExecute,
  onClose,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("/");
  const [selIdx, setSelIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const groups = buildGroups(query);
  const items = allItems(groups);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const select = useCallback(
    (cmd: string) => {
      if (cmd === "/projetos" || cmd === "/tema") {
        setQuery(cmd + " ");
        setSelIdx(0);
        setTimeout(() => inputRef.current?.focus(), 0);
      } else {
        onExecute(cmd);
      }
    },
    [onExecute],
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelIdx((i) => (items.length ? (i + 1) % items.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelIdx((i) => (items.length ? (i - 1 + items.length) % items.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (items.length > 0) select(items[selIdx].cmd);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (items.length > 0) {
        const cmd = items[selIdx].cmd;
        if (cmd === "/projetos" || cmd === "/tema") {
          setQuery(cmd + " ");
          setSelIdx(0);
        } else {
          setQuery(cmd);
          setSelIdx(0);
        }
        setTimeout(() => inputRef.current?.focus(), 0);
      }
    }
  };

  const executeFromQuery = () => {
    const q = query.trim();
    if (q.startsWith("/")) onExecute(q);
  };

  if (!open) return null;

  let cumulativeIdx = -1;

  return (
    <div className="palette-overlay" onClick={onClose}>
      <div
        className="palette-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Paleta de comandos"
      >
        <div className="palette-header">
          <span className="palette-search-icon">🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelIdx(0);
            }}
            onKeyDown={onKey}
            placeholder="Buscar..."
            className="palette-search-input"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>

        <div ref={listRef} className="palette-commands">
          {items.length === 0 && (
            <div className="palette-empty">Nenhum comando encontrado</div>
          )}

          {groups.map((group) => (
            <div key={group.label}>
              <div className="palette-group-label">{group.label}</div>
              {group.items.map((item) => {
                cumulativeIdx++;
                const idx = cumulativeIdx;
                const isActive = idx === selIdx;
                return (
                  <button
                    key={item.cmd}
                    className={`palette-item${isActive ? " palette-item-active" : ""}`}
                    onClick={() => select(item.cmd)}
                    onMouseEnter={() => setSelIdx(idx)}
                    type="button"
                  >
                    <span className="palette-item-cmd">{item.cmd}</span>
                    <span className="palette-item-desc">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="palette-footer">
          <span>
            <kbd>↑↓</kbd> navegar
          </span>
          <span>
            <kbd>↵</kbd> executar
          </span>
          <span>
            <kbd>esc</kbd> fechar
          </span>
          {query.startsWith("/") && query.trim().length > 1 && items.length === 0 && (
            <span
              className="palette-execute-custom"
              onClick={executeFromQuery}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") executeFromQuery();
              }}
            >
              Executar <kbd>{query.trim()}</kbd>
            </span>
          )}
        </div>
      </div>

      <style>{`
        .palette-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 15dvh;
          animation: paletteFadeIn 0.15s ease-out;
        }
        @media (min-width: 768px) {
          .palette-overlay {
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            padding-top: 20dvh;
          }
        }
        .palette-container {
          width: 92%;
          max-width: 540px;
          max-height: 65dvh;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--muted);
          box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px var(--border);
          animation: paletteSlideIn 0.2s ease-out;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .palette-container {
            border-radius: 12px;
          }
        }
        @media (max-width: 767px) {
          .palette-container {
            width: 96%;
            max-height: 70dvh;
            border-radius: 16px;
            margin-top: -5dvh;
          }
        }
        .palette-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.25rem;
          border-bottom: 1px solid var(--border);
        }
        .palette-search-icon {
          font-size: 1.1rem;
          opacity: 0.6;
          flex-shrink: 0;
        }
        .palette-search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--foreground);
          font-family: inherit;
          font-size: 0.95rem;
          min-width: 0;
        }
        .palette-search-input::placeholder {
          color: var(--muted-foreground);
        }
        .palette-commands {
          flex: 1;
          overflow-y: auto;
          overscroll-behavior: contain;
          padding: 0.5rem 0;
        }
        .palette-group-label {
          padding: 0.625rem 1.25rem 0.375rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--muted-foreground);
          text-transform: uppercase;
        }
        .palette-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0.625rem 1.25rem;
          border: none;
          background: transparent;
          color: var(--foreground);
          font-family: inherit;
          font-size: 0.9rem;
          text-align: left;
          cursor: pointer;
          gap: 0.75rem;
          transition: background 0.1s;
        }
        .palette-item:hover,
        .palette-item-active {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .palette-item:hover .palette-item-desc,
        .palette-item-active .palette-item-desc {
          color: var(--accent-foreground);
          opacity: 0.8;
        }
        .palette-item-cmd {
          font-weight: 600;
          white-space: nowrap;
        }
        .palette-item-desc {
          font-size: 0.8rem;
          color: var(--muted-foreground);
          text-align: right;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          min-width: 0;
          flex-shrink: 1;
        }
        .palette-footer {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 0.625rem 1.25rem;
          border-top: 1px solid var(--border);
          font-size: 0.7rem;
          color: var(--muted-foreground);
        }
        .palette-footer kbd {
          display: inline-block;
          padding: 0.1em 0.35em;
          border-radius: 3px;
          background: var(--background);
          border: 1px solid var(--border);
          font-family: inherit;
          font-size: 0.65rem;
          margin-right: 0.25rem;
        }
        .palette-empty {
          padding: 2rem 1.25rem;
          text-align: center;
          color: var(--muted-foreground);
          font-size: 0.85rem;
        }
        .palette-execute-custom {
          cursor: pointer;
          color: var(--accent);
        }
        .palette-execute-custom kbd {
          background: var(--accent);
          color: var(--accent-foreground);
          border-color: var(--accent);
        }
        @keyframes paletteFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes paletteSlideIn {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
