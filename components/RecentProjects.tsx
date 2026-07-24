"use client";

import { useGetProjectsQuery } from "@/store/features/portfolioApi";
import ProjectCard from "./ui/ProjectCard";

export default function RecentProjects(){
    const {data:projects, isLoading, isError}=useGetProjectsQuery();

   
  if (isLoading) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-[#00FF41] text-sm">Loading projects...</p>
    </div>
  );

    if (isError || !projects) return (
    <div className="flex items-center justify-center py-20">
      <p className="text-red-400 text-sm">Failed to load projects</p>
    </div>
  );
return (
    <section className="py-20">

      <div className="text-center mb-16">
        <h2 className="tracking-widest uppercase text-blue-100 text-xs mb-4">
          WHAT I HAVE BUILT
        </h2>
        <p className="text-white text-3xl font-bold">
          Recent Projects
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </section>
  );


}