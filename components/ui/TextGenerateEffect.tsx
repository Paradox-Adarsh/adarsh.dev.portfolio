// components/ui/TextGenerateEffect.tsx
"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  duration?: number;
  staggerDelay?: number;
}

export const TextGenerateEffect = ({
  words,
  className,
  duration = 0.4,
  staggerDelay = 0.06,
}: TextGenerateEffectProps) => {
  const wordsArray = words.split(" ");

  return (
    <div className={cn("font-bold text-white text-2xl leading-snug tracking-wide", className)}>
      {wordsArray.map((word, idx) => (
        <span
          key={word + idx}
          className="tgfx-word inline-block"
          style={{
            animationDelay: `${idx * staggerDelay}s`,
            animationDuration: `${duration}s`,
          }}
        >
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
};