export default function TerminalHeader() {
  return (
    <div className="flex items-center gap-2 rounded-t-md border-b border-border bg-muted px-4 py-2.5 select-none">
      <span className="size-3 rounded-full bg-[#ff5f56]" />
      <span className="size-3 rounded-full bg-[#ffbd2e]" />
      <span className="size-3 rounded-full bg-[#27c93f]" />

      <span className="ml-3 truncate text-xs text-muted-foreground select-none">
        johnny@portfolio: ~
      </span>
    </div>
  );
}
