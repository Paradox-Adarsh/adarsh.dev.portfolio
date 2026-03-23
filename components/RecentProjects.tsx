import { projects } from "@/data";
import { div } from "motion/react-client";
import React from "react";
import { PinContainer } from "./ui/PinContainer";
import { FaLocationArrow } from "react-icons/fa6";

const RecentProjects = () => {
  return (
    <div className="py-20" id="projects">
      <h1 className="text-5xl text-center heading">
        A small selection of{" "}
        <span className="text-purple"> recent projects </span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map(({ id, title, des, img, iconLists, link }) => {
          return (
            <div
              className="sm:h-[41rem] h-[32rem] lg:min-h-[32.5rem] flex items-centt
               justify-center sm:w-[500px] w-[90vw] "
              key={id}
            >
              <PinContainer title={link} href={link}>
                <div className="items-center relative flex justify-center sm:w-[500px] w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] h-[30vh] mb-10">
                  <div className="relative w-full h-full  overflow-hidden lg:rounded-3xl bg-[#13162d]">
                    <img src="/bg.png" alt="bg-img" />
                  </div>
                  <img className="z-10 absolute bottom-0" src={img} alt="" />
                </div>
                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                  {title}
                </h1>
                <p className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2">{des}</p>
                <div className="flex-center justify-center mt-7 mb-3 ">
                  <div className="flex items-center ">
                    {iconLists.map((icon,index) => (
                      <div key={icon} className="border border-white/20 rounded-full bg-black lg:w-10 lg:h-10 flex justify-center items-center"
                      style={{transform:`translateX(-${5*index*2 }px)`}}
                      
                      >
                       <img src={icon} alt={icon} className="p-2"/> 
                      </div>
                    ))}

                     <div className="flex justify-center items-center ">
                      <p className="lg:text-xl md:text-xs text-sm text-purple flex">Check Live Site </p>
                      <FaLocationArrow className="ms-3 " color="#CBACF9"/> </div>
                   
                  </div>

                 
                   
                 
                </div>
              </PinContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentProjects;
