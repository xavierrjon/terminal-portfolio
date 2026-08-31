export default function Cursor({ className }: { className?: string }) {
  return (
    <span
      className={`animate-cursor inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-accent ${className ?? ""}`}
      aria-hidden
    />
  );
}
