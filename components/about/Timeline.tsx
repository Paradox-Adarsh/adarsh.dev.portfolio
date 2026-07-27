"use client";

import { useEffect, useRef, useState } from "react";
import { experience, education } from "@/data/about";

// ── card ──────────────────────────────────────────────
function Card({
  item,
  type,
  align,
}: {
  item: any;
  type: "experience" | "education";
  align: "left" | "right";
}) {
  const isExp = type === "experience";

  return (
    <div
      className={`group relative p-5 rounded-2xl
                  border border-white/[0.06]
                  bg-[#04071D]
                  transition-all duration-300
                  hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]
                  ${isExp
                    ? "hover:border-purple-500/30"
                    : "hover:border-cyan-500/30"
                  }
                  ${align === "right" ? "text-right" : "text-left"}`}
    >
      {/* corner accents */}
      {align === "right" ? (
        <>
          <div className={`absolute top-0 right-0 w-4 h-4 border-t border-r rounded-tr-2xl
                          ${isExp ? "border-purple-500/30" : "border-cyan-500/30"}`} />
          <div className={`absolute bottom-0 left-0 w-4 h-4 border-b border-l rounded-bl-2xl
                          ${isExp ? "border-purple-500/30" : "border-cyan-500/30"}`} />
        </>
      ) : (
        <>
          <div className={`absolute top-0 left-0 w-4 h-4 border-t border-l rounded-tl-2xl
                          ${isExp ? "border-purple-500/30" : "border-cyan-500/30"}`} />
          <div className={`absolute bottom-0 right-0 w-4 h-4 border-b border-r rounded-br-2xl
                          ${isExp ? "border-purple-500/30" : "border-cyan-500/30"}`} />
        </>
      )}

      {/* duration badge */}
      <div className={`inline-block font-mono text-[10px] uppercase tracking-widest
                       px-2 py-1 rounded-md mb-3 border
                       ${isExp
                         ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                         : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                       }`}>
        {item.duration}
      </div>

      {/* role / degree */}
      <h3 className="text-white font-bold text-base mb-1">
        {item.role || item.degree}
      </h3>

      {/* company / institution */}
      <div className={`font-mono text-sm mb-3
                      ${isExp ? "text-purple-400" : "text-cyan-400"}`}>
        {item.company || item.institution}
      </div>

      {/* type badge */}
      {item.type && (
        <div className="inline-block font-mono text-[10px] px-2 py-0.5 rounded-full
                        bg-white/[0.04] border border-white/[0.06]
                        text-white/40 mb-3">
          {item.type}
        </div>
      )}

      {/* grade */}
      {item.grade && (
        <div className="font-mono text-white/50 text-xs mb-3">
          GPA: <span className="text-cyan-400">{item.grade}</span>
        </div>
      )}

      {/* description */}
      {item.description && (
        <p className="text-white/40 text-xs leading-relaxed mb-4">
          {item.description}
        </p>
      )}

      {/* tech pills */}
      {item.tech && (
        <div className={`flex flex-wrap gap-1.5
                        ${align === "right" ? "justify-end" : "justify-start"}`}>
          {item.tech.map((t: string) => (
            <span
              key={t}
              className="font-mono text-[10px] px-2 py-0.5 rounded-md
                         bg-[#10132E] border border-white/[0.06] text-white/40"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── timeline node ─────────────────────────────────────
function TimelineNode({
  item,
  index,
  side,
  type,
}: {
  item: any;
  index: number;
  side: "left" | "right";
  type: "experience" | "education";
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isExp = type === "experience";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 150);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-[1fr_40px_1fr] gap-4 items-start
                  transition-all duration-700
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* left side */}
      <div>
        {side === "left" && <Card item={item} type={type} align="right" />}
      </div>

      {/* center dot */}
      <div className="flex flex-col items-center pt-6">
        <div
          className={`relative w-4 h-4 rounded-full border-2 z-10
                      transition-all duration-500
                      ${visible
                        ? isExp
                          ? "border-purple-500 bg-purple-500/20 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
                          : "border-cyan-500 bg-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                        : "border-white/20 bg-transparent"
                      }`}
        >
          {visible && (
            <div
              className={`absolute inset-0 rounded-full animate-ping opacity-40
                          ${isExp ? "bg-purple-400" : "bg-cyan-400"}`}
            />
          )}
        </div>
      </div>

      {/* right side */}
      <div>
        {side === "right" && <Card item={item} type={type} align="left" />}
      </div>
    </div>
  );
}

// ── vertical line ─────────────────────────────────────
function TimelineLine({ progress }: { progress: number }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none">
      <div className="w-full h-full bg-white/[0.04]" />
      <div
        className="absolute top-0 left-0 w-full
                   bg-gradient-to-b from-purple-500 via-purple-400 to-cyan-400
                   transition-all duration-200"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}

// ── main ──────────────────────────────────────────────
export default function Timeline() {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, window.innerHeight - rect.top);
      const pct = Math.min(100, (scrolled / rect.height) * 100);
      setProgress(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const expItems = experience.map((e) => ({ ...e, type_: "experience" as const }));
  const eduItems = education.map((e) => ({ ...e, type_: "education" as const }));
  const allItems = [...expItems, ...eduItems];

  return (
    <div className="flex flex-col gap-12">

      {/* section label */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] uppercase">
          // history
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
      </div>

      {/* legend */}
      <div className="flex items-center justify-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500
                          shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          <span className="font-mono text-white/30 text-xs uppercase tracking-widest">
            Experience
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500
                          shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <span className="font-mono text-white/30 text-xs uppercase tracking-widest">
            Education
          </span>
        </div>
      </div>

      {/* timeline */}
      <div ref={containerRef} className="relative flex flex-col gap-10">
        <TimelineLine progress={progress} />
        {allItems.map((item, index) => (
          <TimelineNode
            key={item.id}
            item={item}
            index={index}
            side={index % 2 === 0 ? "left" : "right"}
            type={item.type_}
          />
        ))}
      </div>

    </div>
  );
}