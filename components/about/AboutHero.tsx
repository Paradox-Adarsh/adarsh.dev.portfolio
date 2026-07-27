"use client";

import { useEffect, useState, useRef } from "react";
import { profile } from "@/data/about";

// ── skills data — no ratings, just grouped ────────────
const skillGroups = [
  {
    label: "Backend",
    color: "#6DB33F",
    skills: ["Java", "Spring Boot", "Spring Security", "Spring Cloud", "Hibernate", "REST APIs"],
  },
  {
    label: "Frontend",
    color: "#61DAFB",
    skills: ["React", "Next.js", "Redux Toolkit", "RTK Query", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "DevOps & Cloud",
    color: "#cbacf9",
    skills: ["Docker", "GCP", "Nginx", "GitHub Actions", "Linux", "Maven"],
  },
  {
    label: "Data & Messaging",
    color: "#F59E0B",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Kafka", "RabbitMQ"],
  },
];

// ── floating skill pill ───────────────────────────────
function SkillPill({
  skill,
  color,
  delay,
}: {
  skill: string;
  color: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-lg
                  font-mono text-xs border
                  transition-all duration-500
                  hover:scale-105 cursor-default
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
      style={{
        borderColor: `${color}30`,
        backgroundColor: `${color}08`,
        color: `${color}cc`,
        boxShadow: `0 0 12px ${color}10`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}40`;
        (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
        (e.currentTarget as HTMLElement).style.backgroundColor = `${color}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 12px ${color}10`;
        (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
        (e.currentTarget as HTMLElement).style.backgroundColor = `${color}08`;
      }}
    >
      {skill}
    </span>
  );
}

// ── skill group ───────────────────────────────────────
function SkillGroup({
  group,
  groupIndex,
  isVisible,
}: {
  group: (typeof skillGroups)[0];
  groupIndex: number;
  isVisible: boolean;
}) {
  return (
    <div
      className={`transition-all duration-700`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${groupIndex * 100}ms`,
      }}
    >
      {/* group label */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: group.color }}
        />
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: `${group.color}80` }}
        >
          {group.label}
        </span>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: `${group.color}15` }}
        />
      </div>

      {/* pills */}
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill, i) => (
          <SkillPill
            key={skill}
            skill={skill}
            color={group.color}
            delay={isVisible ? groupIndex * 100 + i * 60 : 0}
          />
        ))}
      </div>
    </div>
  );
}

// ── typing effect ─────────────────────────────────────
function TypingText({ text, speed = 35 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            i++;
            if (i >= text.length) {
              clearInterval(interval);
              setDone(true);
            }
          }, speed);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, speed]);

  return (
    <p ref={ref} className="font-mono text-sm text-white/50 leading-relaxed">
      {displayed}
      {!done && (
        <span className="animate-pulse text-purple-400">▋</span>
      )}
    </p>
  );
}

// ── scan line ─────────────────────────────────────────
function ScanLine() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-scan-line" />
    </div>
  );
}

// ── jarvis terminal lines ─────────────────────────────
const BOOT_LINES = [
  "Initializing developer profile...",
  "Loading skill matrix...",
  "Connecting to backend systems...",
  "Spring Security: ACTIVE",
  "Microservice registry: ONLINE",
  "Status: READY",
];

function BootSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          onDone();
        }, 400);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [onDone]);

  if (done) return null;

  return (
    <div className="absolute inset-0 z-20 rounded-2xl bg-[#04071D]
                    flex flex-col justify-center px-10
                    transition-opacity duration-500">
      <div className="space-y-2">
        {lines.map((line, i) => (
          <div
            key={i}
            className="font-mono text-xs flex items-center gap-3"
            style={{ color: i === lines.length - 1 ? "#cbacf9" : "#ffffff40" }}
          >
            <span style={{ color: "#6DB33F" }}>▸</span>
            {line}
            {i === lines.length - 1 && (
              <span className="animate-pulse text-purple-400">▋</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── main component ────────────────────────────────────
export default function AboutHero() {
  const [visible, setVisible] = useState(false);
  const [booted, setBooted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* top label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] uppercase">
          // developer.profile
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
      </div>

      {/* main card */}
      <div
        className="relative rounded-2xl border border-white/[0.08] bg-[#04071D]
                   overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.08)]"
      >
        <ScanLine />

        {/* boot sequence overlay */}
        {visible && !booted && (
          <BootSequence onDone={() => setBooted(true)} />
        )}

        {/* corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-purple-500/40 rounded-tl-2xl z-10" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-purple-500/40 rounded-tr-2xl z-10" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-purple-500/40 rounded-bl-2xl z-10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-purple-500/40 rounded-br-2xl z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-0">

          {/* ── LEFT — identity ── */}
          <div
            className={`p-8 border-b lg:border-b-0 lg:border-r border-white/[0.06]
                        flex flex-col gap-6
                        transition-all duration-700 delay-200
                        ${booted ? "opacity-100" : "opacity-0"}`}
          >
            {/* status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  profile.available ? "bg-green-400 animate-pulse" : "bg-red-400"
                }`}
              />
              <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                {profile.available ? "Available for work" : "Not available"}
              </span>
            </div>

            {/* name */}
            <div>
              <div className="font-mono text-white/30 text-xs mb-1 tracking-widest">
                PLAYER_NAME:
              </div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {profile.name}
              </h1>
              <div className="text-purple-400 font-mono text-sm mt-1">
                {profile.title}
              </div>
            </div>

            {/* level + class */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-mono text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  Level
                </div>
                <div className="font-mono text-2xl font-bold text-purple-400">
                  SDE {profile.level}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-mono text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  Class
                </div>
                <div className="font-mono text-sm font-bold text-cyan-400">
                  {profile.class}
                </div>
              </div>
            </div>

            {/* location */}
            <div className="font-mono text-xs text-white/30 flex items-center gap-2">
              <span className="text-purple-400">◈</span>
              {profile.location}
            </div>

            {/* bio typing */}
            {booted && <TypingText text={profile.bio} />}
          </div>

          {/* ── RIGHT — skill matrix ── */}
          <div
            className={`p-8 flex flex-col gap-6
                        transition-all duration-700 delay-300
                        ${booted ? "opacity-100" : "opacity-0"}`}
          >
            {/* header */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-white/30 text-xs uppercase tracking-widest">
                // skill.matrix
              </span>
              <span className="font-mono text-purple-400 text-xs animate-pulse">
                ● LIVE
              </span>
            </div>

            {/* skill groups */}
            <div className="flex flex-col gap-6">
              {skillGroups.map((group, i) => (
                <SkillGroup
                  key={group.label}
                  group={group}
                  groupIndex={i}
                  isVisible={booted}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}