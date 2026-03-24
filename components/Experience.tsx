import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/MovingBorder";

const Experience = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="text-5xl text-center heading">
        My Work
        <span className="text-purple"> Experience </span>
      </h1>
      <div className="w-full grid mt-12 lg:grid-cols-4  grid-cols-1 gap-10">
        {workExperience.map((card) => {
          return (
            <Button className="flex-1 text-white border-neutral-200 dark:border-slate-800"
              key={card.id}
            //   duration={0.005s}
              borderRadius="1.75rem">
              {" "}
              <div className=" flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-2">
                <img
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  className="lg:w-32 md:w-20 w-16 "
                />

                <div className="lg:ms-5">  
                    <h1 className="text-start text-xl md:text-2xl font-bold">
                        {card.title}
                    </h1>
                    <p className="text-start text-white-100 mt-3 font-semibold">{card.desc}</p>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
