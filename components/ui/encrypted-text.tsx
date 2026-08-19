// components/ui/encrypted-text.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /** Time in ms between revealing each subsequent real character. Default 50ms. */
  revealDelayMs?: number;
  encryptedClassName?: string;
  revealedClassName?: string;
};

const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomLetter(): string {
  return ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      // Reveal the next real character
      const el = charRefs.current[i];
      if (el) {
        el.textContent = text[i];
        el.className = revealedClassName ?? "";
      }
      i++;

      // Randomize everything still unrevealed
      for (let j = i; j < text.length; j++) {
        const unrevealedEl = charRefs.current[j];
        if (unrevealedEl && text[j] !== " ") {
          unrevealedEl.textContent = randomLetter();
        }
      }

      if (i >= text.length) clearInterval(interval);
    }, revealDelayMs);

    return () => clearInterval(interval);
  }, [text, revealDelayMs, revealedClassName]);

  if (!text) return null;

  return (
    <span className={cn(className)} aria-label={text} role="text">
      {text.split("").map((char, index) => (
        <span
          key={index}
          ref={(el) => {
            charRefs.current[index] = el;
          }}
          className={encryptedClassName}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
};