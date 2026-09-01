"use client";

import { useMemo } from "react";
import { suggest } from "@/lib/commands";

function isSubcommand(prefix: string): boolean {
  return prefix === "/projetos" || prefix === "/tema";
}

export function useCommandAutocomplete(input: string): {
  suggestions: string[];
  current: string | undefined;
} {
  return useMemo(() => {
    const trimmed = input.trimStart();

    if (!trimmed.startsWith("/")) {
      return { suggestions: [], current: undefined };
    }

    if (trimmed.includes("/", 1)) {
      const prefix = trimmed.split(/[\s/]/)[0];
      if (!isSubcommand(prefix)) {
        return { suggestions: [], current: undefined };
      }
    }

    const suggestions = suggest(trimmed);
    return {
      suggestions,
      current: suggestions.length === 1 ? suggestions[0] : undefined,
    };
  }, [input]);
}
