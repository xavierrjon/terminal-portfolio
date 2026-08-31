"use client";

type CommandSuggestionsProps = {
  input: string;
  suggestions: string[];
  onSelect?: (value: string) => void;
};

export default function CommandSuggestions({
  input,
  suggestions,
  onSelect,
}: CommandSuggestionsProps) {
  if (suggestions.length === 0) return null;

  const isTouch = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(max-width: 767px)").matches
    : false;

  if (isTouch && onSelect) {
    return (
      <button
        type="button"
        className="suggestion-chip"
        onClick={() => onSelect(suggestions[0])}
        aria-live="polite"
      >
        <span className="suggestion-text">
          {input.trimStart()}
          <span className="suggestion-rest">
            {suggestions[0].slice(input.trimStart().length)}
          </span>
        </span>
        <span className="suggestion-tap">tocar para usar</span>
      </button>
    );
  }

  return (
    <div className="mt-1 flex flex-col gap-1 text-sm" aria-live="polite">
      {suggestions.map((s) => {
        const rest = s.slice(input.trimStart().length);
        return (
          <span key={s} className="flex w-fit items-center gap-2 rounded px-2 py-0.5">
            <span className="text-foreground">{input.trimStart()}</span>
            {rest && <span className="text-highlight">{rest}</span>}
            {suggestions.length === 1 && (
              <span className="text-muted-foreground">(Tab)</span>
            )}
          </span>
        );
      })}
    </div>
  );
}
