"use client";

import { useCallback, useState } from "react";

/**
 * Gerencia o histórico de comandos e a navegação com setas para cima/baixo.
 */
export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const [preserved, setPreserved] = useState("");

  const add = useCallback((input: string) => {
    setHistory((prev) => {
      if (prev.length && prev[prev.length - 1] === input) return prev;
      return [...prev, input];
    });
    setCursor(-1);
    setPreserved("");
  }, []);

  const setInput = (value: string) => {
    setPreserved(value);
    setCursor(-1);
  };

  /** Retorna o comando a exibir ao pressionar seta para cima. */
  const up = useCallback(
    (): string | null => {
      if (history.length === 0) return null;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      return history[next];
    },
    [history, cursor],
  );

  /** Retorna o comando a exibir ao pressionar seta para baixo. */
  const down = useCallback(
    (): string | null => {
      if (cursor === -1) return preserved;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        return preserved;
      }
      setCursor(next);
      return history[next];
    },
    [cursor, history, preserved],
  );

  return { history, add, up, down, setInput };
}
