"use client";

import { useEffect, useRef, useState } from "react";
import { achievements } from "@/data/about";

// ── single achievement card ───────────────────────────
function AchievementCard({
  label,
  value,
  icon,
  delay,
}: {
  label: string;
  value: string;
  icon: string;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const [counted, setCounted] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);

            // only animate if value is a number
            const numeric = parseInt(value.replace(/\D/g, ""));
            const suffix = value.replace(/[0-9]/g, "");

            if (!isNaN(numeric)) {
              let start = 0;
              const step = Math.ceil(numeric / 40);
              const interval = setInterval(() => {
                start += step;
                if (start >= numeric) {
                  setCounted(value);
                  clearInterval(interval);
                } else {
                  setCounted(`${start}${suffix}`);
                }
              }, 30);
            } else {
              setCounted(value); // for "∞" etc
            }
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay]);

  return (
    <div
      ref={ref}
      className={`relative group p-6 rounded-2xl
                  border border-white/[0.06]
                  bg-[#04071D]
                  transition-all duration-700
                  hover:border-purple-500/30
                  hover:shadow-[0_0_30px_rgba(139,92,246,0.1)]
                  ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {/* corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-purple-500/30 rounded-tl-2xl" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-purple-500/30 rounded-br-2xl" />

      {/* icon */}
      <div className="text-2xl text-purple-400 mb-4 font-mono">
        {icon}
      </div>

      {/* value */}
      <div className="font-mono text-4xl font-bold text-white mb-2
                      group-hover:text-purple-300 transition-colors duration-300">
        {counted}
      </div>

      {/* label */}
      <div className="font-mono text-xs text-white/30 uppercase tracking-widest">
        {label}
      </div>

      {/* bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px
                      bg-gradient-to-r from-transparent via-purple-500 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500" />
    </div>
  );
}

// ── radar chart ───────────────────────────────────────
function RadarChart({ stats }: { stats: { label: string; value: number; color: string }[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<SVGSVGElement>(null);
  const size = 280;
  const center = size / 2;
  const maxRadius = 100;
  const total = stats.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const angleStep = (2 * Math.PI) / total;

  const getPoint = (index: number, radius: number) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // grid rings
  const rings = [25, 50, 75, 100];

  // data polygon
  const dataPoints = stats.map((stat, i) =>
    getPoint(i, visible ? (stat.value / 100) * maxRadius : 0)
  );
  const dataPath = dataPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ") + " Z";

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="font-mono text-white/30 text-xs uppercase tracking-widest">
        // skill.radar
      </span>

      <svg ref={ref} width={size} height={size}>
        {/* grid rings */}
        {rings.map((r) => {
          const ringPoints = stats.map((_, i) => getPoint(i, (r / 100) * maxRadius));
          const ringPath = ringPoints
            .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
            .join(" ") + " Z";
          return (
            <path
              key={r}
              d={ringPath}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          );
        })}

        {/* axis lines */}
        {stats.map((_, i) => {
          const outer = getPoint(i, maxRadius);
          return (
            <line
              key={i}
              x1={center} y1={center}
              x2={outer.x} y2={outer.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          );
        })}

        {/* data polygon */}
        <path
          d={dataPath}
          fill="rgba(139,92,246,0.15)"
          stroke="rgba(139,92,246,0.6)"
          strokeWidth={1.5}
          className="transition-all duration-1000 ease-out"
        />

        {/* data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3}
            fill={stats[i].color}
            className="transition-all duration-1000 ease-out"
          />
        ))}

        {/* labels */}
        {stats.map((stat, i) => {
          const labelPoint = getPoint(i, maxRadius + 20);
          return (
            <text
              key={i}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.4)"
              fontSize={9}
              fontFamily="monospace"
            >
              {stat.label.split("/")[0].trim()}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

// ── main ──────────────────────────────────────────────
import { stats } from "@/data/about";

export default function StatPanel() {
  return (
    <div className="flex flex-col gap-12">

      {/* section label */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] uppercase">
          // player.stats
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
      </div>

      {/* achievement cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((item, i) => (
          <AchievementCard
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
            delay={i * 150}
          />
        ))}
      </div>

      {/* radar + extra info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8
                      p-8 rounded-2xl border border-white/[0.06] bg-[#04071D]">

        {/* radar chart */}
        <RadarChart stats={stats} />

        {/* right side — stat breakdown text */}
        <div className="flex flex-col justify-center gap-6">
          <span className="font-mono text-white/30 text-xs uppercase tracking-widest">
            // stat.breakdown
          </span>

          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-4">
              {/* color dot */}
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: stat.color }}
              />
              {/* label */}
              <span className="font-mono text-white/50 text-xs flex-1">
                {stat.label}
              </span>
              {/* value */}
              <span
                className="font-mono text-sm font-bold"
                style={{ color: stat.color }}
              >
                {stat.value}
              </span>
              {/* mini bar */}
              <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${stat.value}%`,
                    backgroundColor: stat.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}