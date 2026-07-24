"use client";

import { FloatingDock } from "./ui/floating-dock";
import { useGetSkillCategoriesGroupedQuery } from "@/store/features/portfolioApi";

type Category = {
  id: number;
  name: string;
  description: string;
  skills: Skill[];
};

type Skill = {
  id: number;
  name: string;
  svgIcon: string;
  iconUrl: string;
  proficiency: number;
};

function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
    );
}

export default function TechStack() {
  const { data: categories, isLoading, isError } = useGetSkillCategoriesGroupedQuery(undefined);

  if (isLoading) return (
    <div className="flex items-center justify-center h-[35rem]">
      <p className="text-white/40 text-sm">Loading stack...</p>
    </div>
  );

  if (isError || !categories) return (
    <div className="flex items-center justify-center h-[35rem]">
      <p className="text-red-400 text-sm">Failed to load tech stack</p>
    </div>
  );

  return (
    <section className="py-20">

      {/* heading */}
      <div className="text-center mb-16">
        <h2 className="tracking-widest uppercase text-blue-100 text-xs mb-4">
          WHAT I WORK WITH
        </h2>
        <p className="text-white text-3xl font-bold">
          My Tech Stack
        </p>
      </div>

      {/* two categories side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {categories.map((category: Category) => (
          <div key={category.id} className="flex flex-col items-center gap-6">

            {/* category label */}
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-white/10" />
              <span className="text-white/50 text-xs tracking-widest uppercase">
                {category.name}
              </span>
              <div className="h-px w-12 bg-white/10" />
            </div>

            {/* chunked floating docks */}
            <div className="flex flex-col items-center gap-4">
              {chunkArray(category.skills, 5).map((chunk: Skill[], idx: number) => (
                <FloatingDock
                  key={idx}
                  mobileClassName="translate-y-20"
                  items={chunk.map((skill: Skill) => ({
                    title: skill.name,
                    href: "#",
                    icon: (
                      <div
                        className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                        dangerouslySetInnerHTML={{ __html: skill.svgIcon }}
                      />
                    ),
                  }))}
                />
              ))}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}