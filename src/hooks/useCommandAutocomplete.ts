"use client";

import { useMemo } from "react";
import { suggest } from "@/lib/commands";

/**
 * Gera sugestões de autocomplete a partir do texto digitado.
 */
export function useCommandAutocomplete(input: string): {
  suggestions: string[];
  current: string | undefined;
} {
  return useMemo(() => {
    const trimmed = input.trimStart();

    // só autocompleta comandos iniciados com "/"
    if (!trimmed.startsWith("/")) {
      return { suggestions: [], current: undefined };
    }

    // "/projetos/..." -> não sugere
    if (trimmed.includes("/", 1)) {
      return { suggestions: [], current: undefined };
    }

    const suggestions = suggest(trimmed);
    return {
      suggestions,
      current: suggestions.length === 1 ? suggestions[0] : undefined,
    };
  }, [input]);
}
