"use client";

import type { KeyboardEvent, RefObject } from "react";
import Cursor from "./Cursor";

type TerminalInputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onFocus?: () => void;
  autoFocus?: boolean;
};

export default function TerminalInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
  onFocus,
  autoFocus,
}: TerminalInputProps) {
  return (
    <div className="group flex items-center gap-1 py-1">
      <span className="shrink-0 text-sm md:text-base">
        <span className="text-accent">johnny@portfolio</span>
        <span className="text-muted-foreground">:~$</span>{" "}
      </span>

      <div className="relative flex min-h-[1.25rem] flex-1 items-center">
        <div className="flex items-center whitespace-pre-wrap break-all text-foreground">
          <span>{value}</span>
          <Cursor />
        </div>

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          autoFocus={autoFocus}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className="absolute inset-0 h-full w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
          aria-label="Digite um comando"
        />
      </div>
    </div>
  );
}
