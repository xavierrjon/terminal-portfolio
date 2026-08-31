type CommandSuggestionsProps = {
  input: string;
  suggestions: string[];
};

export default function CommandSuggestions({
  input,
  suggestions,
}: CommandSuggestionsProps) {
  if (suggestions.length === 0) return null;

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
