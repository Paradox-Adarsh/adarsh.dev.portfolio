"use client";

import { useEffect, useRef, useState } from "react";




// ── footer ────────────────────────────────────────────
function AboutFooter() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
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
      {/* divider */}
      <div className="flex items-center gap-3 mb-12">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500/30" />
        <span className="font-mono text-purple-400 text-xs tracking-[0.3em] uppercase">
          // end.of.file
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500/30" />
      </div>

      {/* footer card */}
      <div
        className="relative p-10 rounded-2xl
                   border border-white/[0.06] bg-[#04071D]
                   text-center overflow-hidden"
      >
        {/* bg glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

        {/* corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-purple-500/30 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-purple-500/30 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyan-500/30 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyan-500/30 rounded-br-2xl" />

        {/* status */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-green-400 text-xs uppercase tracking-widest">
            Open to opportunities
          </span>
        </div>

        {/* heading */}
        <h2 className="text-white text-3xl font-bold mb-3">
          Let&apos;s Build Something
          <span className="text-purple-400"> Together</span>
        </h2>

        <p className="font-mono text-white/30 text-sm mb-8 max-w-md mx-auto leading-relaxed">
          Whether it&apos;s a microservice architecture, a secure REST API, or a
          full-stack product — I&apos;m ready.
        </p>

        {/* links */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          
           <a href="mailto:your@email.com"
            className="px-6 py-3 rounded-xl
                       bg-purple-600 hover:bg-purple-500
                       text-white text-sm font-medium font-mono
                       shadow-[0_0_20px_rgba(139,92,246,0.3)]
                       hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
                       transition-all duration-200"
          >
            ✉ Contact Me
          </a>
          
           <a href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl
                       border border-white/10
                       hover:border-purple-500/30
                       text-white/60 hover:text-white
                       text-sm font-medium font-mono
                       transition-all duration-200"
          >
            ◈ GitHub
          </a>
          
           <a href="/resume.pdf"
            target="_blank"
            className="px-6 py-3 rounded-xl
                       border border-white/10
                       hover:border-cyan-500/30
                       text-white/60 hover:text-cyan-400
                       text-sm font-medium font-mono
                       transition-all duration-200"
          >
            ↓ Resume
          </a>
        </div>

        {/* bottom mono */}
        <div className="mt-10 font-mono text-white/10 text-xs">
          Adarsh Yadav · Fullstack Java Developer · Mumbai, India
        </div>
      </div>
    </div>
  );
}

// ── main ──────────────────────────────────────────────
export default function Achievements() {
  return (
    <div className="flex flex-col gap-20">


      {/* footer */}
      <AboutFooter />

    </div>
  );
}