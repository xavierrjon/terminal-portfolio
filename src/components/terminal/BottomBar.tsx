"use client";

type BottomBarProps = {
  onOpenPalette: () => void;
  onCommand: (cmd: string) => void;
};

export default function BottomBar({ onOpenPalette, onCommand }: BottomBarProps) {
  return (
    <nav className="bottom-bar" aria-label="Navegação rápida">
      <button
        className="bottom-bar-btn bottom-bar-primary"
        onClick={onOpenPalette}
        type="button"
        aria-label="Abrir paleta de comandos"
      >
        /
      </button>

      <button
        className="bottom-bar-btn"
        onClick={() => onCommand("/projetos")}
        type="button"
      >
        <span className="bottom-bar-icon">◆</span>
        <span>projetos</span>
      </button>

      <button
        className="bottom-bar-btn"
        onClick={() => onCommand("/sobre")}
        type="button"
      >
        <span className="bottom-bar-icon">◆</span>
        <span>sobre</span>
      </button>

      <button
        className="bottom-bar-btn"
        onClick={() => onCommand("/habilidades")}
        type="button"
      >
        <span className="bottom-bar-icon">◆</span>
        <span>skills</span>
      </button>

      <button
        className="bottom-bar-btn"
        onClick={() => onCommand("/ajuda")}
        type="button"
      >
        ?
      </button>

      <style>{`
        .bottom-bar {
          display: none;
        }
        @media (max-width: 767px) {
          .bottom-bar {
            display: flex;
            align-items: center;
            gap: 0;
            border-top: 1px solid var(--border);
            background: var(--muted);
            padding: 0;
            flex-shrink: 0;
            overflow-x: auto;
            overscroll-behavior: contain;
            -webkit-overflow-scrolling: touch;
          }
          .bottom-bar-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.3rem;
            flex: 1;
            min-width: 0;
            padding: 0.7rem 0.25rem;
            border: none;
            background: transparent;
            color: var(--muted-foreground);
            font-family: inherit;
            font-size: 0.7rem;
            cursor: pointer;
            white-space: nowrap;
            transition: color 0.15s, background 0.15s;
            border-right: 1px solid var(--border);
          }
          .bottom-bar-btn:last-child {
            border-right: none;
          }
          .bottom-bar-btn:active {
            background: var(--accent);
            color: var(--accent-foreground);
          }
          .bottom-bar-primary {
            flex: 0 0 auto;
            width: 3rem;
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--accent);
            background: var(--background);
          }
          .bottom-bar-primary:active {
            background: var(--accent);
            color: var(--accent-foreground);
          }
          .bottom-bar-icon {
            font-size: 0.5rem;
            opacity: 0.7;
          }
        }
      `}</style>
    </nav>
  );
}
