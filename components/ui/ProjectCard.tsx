"use client";

import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

type Project = {
  id: number;
  title: string;
  description: string;
  techStack: string;   // "React, Spring Boot, MySQL"
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  const techs = project.techStack?.split(",").map((t) => t.trim()) ?? [];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-2xl overflow-hidden
                 border border-white/[0.08]
                 bg-[#04071D]
                 transition-all duration-500
                 hover:border-purple-500/30
                 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)]"
    >

      {/* ── shimmer border on hover ── */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-500 pointer-events-none
                      bg-[conic-gradient(from_var(--shimmer-angle),transparent_0%,rgba(139,92,246,0.15)_10%,transparent_20%)]
                      [--shimmer-angle:0deg]
                      group-hover:[animation:shimmer-rotate_3s_linear_infinite]" />

      {/* ── image section ── */}
      <div className="relative h-48 overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover
               transition-transform duration-700
               group-hover:scale-110"
          />
        ) : (
          /* placeholder if no image */
          <div className="w-full h-full bg-gradient-to-br from-[#0c0e23] to-[#10132e]
                          flex items-center justify-center">
            <div className="text-4xl opacity-20">⬡</div>
          </div>
        )}

        {/* purple gradient overlay */}
        <div className="absolute inset-0
                        bg-gradient-to-t from-[#04071D] via-[#04071D]/40 to-transparent" />

        {/* featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3
                          px-2 py-1 rounded-full
                          bg-purple-500/20 border border-purple-500/30
                          text-purple-300 text-[10px] tracking-widest uppercase">
            Featured
          </div>
        )}
      </div>

      {/* ── content ── */}
      <div className="p-6 flex flex-col gap-4">

        {/* title */}
        <h3 className="text-white font-bold text-lg leading-tight
                       group-hover:text-purple-200 transition-colors duration-300">
          {project.title}
        </h3>

        {/* description */}
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* tech pills */}
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded-md
                         bg-[#10132E] border border-white/[0.06]
                         text-white/50 text-[11px]
                         group-hover:border-purple-500/20
                         group-hover:text-purple-300/70
                         transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* ── links ── */}
       {/* ── links ── */}
<div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
  {project.githubUrl && (
    <a                            
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2
                 text-white/40 hover:text-white
                 text-xs transition-colors duration-200"
    >
      <FaGithub className="text-base" />
      <span>Code</span>
    </a>
  )}

  {project.liveUrl && (
    <a                            
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2
                 text-white/40 hover:text-purple-400
                 text-xs transition-colors duration-200 ml-auto"
    >
      <span>Live</span>
      <FaExternalLinkAlt className="text-xs" />
    </a>
  )}
</div>

      </div>

      {/* ── bottom glow line on hover ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px
                      bg-gradient-to-r from-transparent via-purple-500 to-transparent
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-500" />

    </div>
  );
}