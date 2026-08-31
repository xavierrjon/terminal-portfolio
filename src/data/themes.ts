export type ThemeId = "midnight" | "dracula" | "nord" | "amber" | "matrix";

export type Theme = {
  id: ThemeId;
  label: string;
  description: string;
};

export const themes: Theme[] = [
  { id: "midnight", label: "Midnight", description: "Azul escuro sofisticado" },
  { id: "dracula", label: "Dracula", description: "Clássico violeta" },
  { id: "nord", label: "Nord", description: "Pastel frio e clean" },
  { id: "amber", label: "Amber", description: "Âmbar quente" },
  { id: "matrix", label: "Matrix", description: "Verde terminal legendário" },
];

export const defaultTheme: ThemeId = "midnight";
