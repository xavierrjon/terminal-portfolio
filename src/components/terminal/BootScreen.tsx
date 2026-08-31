"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";

const lines = [
  "Initializing portfolio...",
  "",
  "[✓] Loading profile",
  "[✓] Loading projects",
  "[✓] Loading skills",
  "[✓] Loading experience",
  "",
  "System ready.",
  "",
  "Welcome, Johnny.",
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (visible >= lines.length) {
      if (!done.current) {
        done.current = true;
        const t = setTimeout(onComplete, 600);
        return () => clearTimeout(t);
      }
      return;
    }
    const t = setTimeout(() => setVisible((v) => v + 1), visible === 0 ? 400 : 160);
    return () => clearTimeout(t);
  }, [visible, onComplete]);

  const skip = useCallback(() => {
    if (!done.current) {
      done.current = true;
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        skip();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [skip]);

  return (
    <div className="flex min-h-[60vh] flex-col gap-1 py-4 text-sm md:text-base">
      {lines.slice(0, visible).map((line, i) =>
        line === "" ? (
          <div key={i} className="h-4" />
        ) : (
          <p key={i} className="text-foreground">
            {line}
          </p>
        ),
      )}
      {visible < lines.length && (
        <p className="mt-2 text-muted-foreground">
          <Cursor className="mr-1" /> <span className="text-xs">[ Enter para pular ]</span>
        </p>
      )}
    </div>
  );
}
