"use client";

import { commands } from "@/lib/commands";

type CommandSidebarProps = {
  onCommand: (cmd: string) => void;
};

export default function CommandSidebar({ onCommand }: CommandSidebarProps) {
  const main = commands.filter((c) => c.group === "main" && c.name !== "/clear");

  return (
    <aside className="command-sidebar" aria-label="Atalhos de comandos">
      <p className="command-sidebar-title">COMANDOS</p>
      <div className="command-sidebar-list">
        {main.map((c) => (
          <button
            key={c.name}
            type="button"
            className="command-sidebar-item"
            onClick={() => onCommand(c.name)}
          >
            <span className="command-sidebar-cmd">{c.name}</span>
            <span className="command-sidebar-desc">{c.description}</span>
          </button>
        ))}
      </div>

      <style>{`
        .command-sidebar {
          display: none;
          flex-direction: column;
          border-right: 1px solid var(--border);
          background: var(--muted);
          min-width: 200px;
          padding: 0.75rem 0;
          overflow-y: auto;
          flex-shrink: 0;
        }
        .command-sidebar-title {
          padding: 0 1rem 0.5rem;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--muted-foreground);
        }
        .command-sidebar-list {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .command-sidebar-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.1rem;
          width: 100%;
          padding: 0.5rem 1rem;
          border: none;
          border-left: 2px solid transparent;
          background: transparent;
          color: var(--foreground);
          font-family: inherit;
          text-align: left;
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s, color 0.12s;
        }
        .command-sidebar-item:hover {
          background: var(--background);
          border-left-color: var(--accent);
        }
        .command-sidebar-item:active {
          background: var(--accent);
          color: var(--accent-foreground);
        }
        .command-sidebar-item:active .command-sidebar-desc {
          color: var(--accent-foreground);
          opacity: 0.8;
        }
        .command-sidebar-cmd {
          font-weight: 600;
          font-size: 0.85rem;
        }
        .command-sidebar-desc {
          font-size: 0.7rem;
          color: var(--muted-foreground);
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .command-sidebar {
            display: flex;
          }
        }
      `}</style>
    </aside>
  );
}
