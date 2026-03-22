import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { cn } from "../lib/utils";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
const Hero = () => {
  return (
    <div className="relative flex min-h-screen w-full items-start justify-center pt-32 bg-black-100 overflow-hidden">
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
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,rgba(228,228,231,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.15)_1px,transparent_1px)]"
        )}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5">
        <h2 className="tracking-widest uppercase text-blue-100 text-xs mb-4">
          Dynamic Web Magic
        </h2>

        <TextGenerateEffect words="Transforming Concepts into Seamless  Experiences" />
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
  );
};
export default Hero;
