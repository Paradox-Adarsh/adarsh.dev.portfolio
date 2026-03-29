import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { cn } from "../lib/utils";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
const Hero = () => {
  return (
    <div className="pb-20 pt-36">
      {/* Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-32 h-screen"
          fill="white"
        />
        <Spotlight
          className="-top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      {/* Grid Background — pinned to fill the single root div */}
      <div className="absolute inset-0 bg-black/40 " />

      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(228,228,231,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.03)_1px,transparent_1px)]",
        )}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      {/* Content */}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
        <div className="flex justify-center items-center">
          {/* OUTER */}
          <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#070943] to-[#02043A] border border-white/20 w-[300px] h-[300px] flex items-center justify-center">
            {/* INNER */}
            <div className="relative w-[250px] h-[250px] rounded-2xl  overflow-hidden">
              <Image
                src="/profile_picture.png"
                alt="Adarsh"
                fill
                className="object-cover object-[50%_20%]"
              />
              {/* SCAN LINE */}
              <div className="absolute inset-0 pointer-events-none scan-effect"></div>
            </div>
          </div>
        </div>
        <div className=" flex items-center relative z-10 text-center px-3">
<div className="">
          <h2 className="tracking-widest uppercase text-blue-100 text-xs mb-4">
            SCALABLE SYSTEMS & WEB DEVELOPMENT
          </h2>

          <TextGenerateEffect words="Architecting Scalable Microservices & Seamless Web Experiences" />
          <p className="text-center md:tracking-wider md:text-lg lg:text-2xl">
            Hi, I&apos;m Adarsh, a Fullstack Java Developer
          </p>

          <a href="about">
            <MagicButton
              title="Show My Work"
              position="right"
              icon={<FaLocationArrow />}
            />
          </a>
</div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
