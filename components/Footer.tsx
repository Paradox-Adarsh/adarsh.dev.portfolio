"use client";

import React from "react";
import MagicButton from "./ui/MagicButton";
import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import { useState } from "react";
import ContactModal from "./modals/ContactModal";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="w-full pt-20 pb-10 " id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          className="w-full h-full "
          src="/footer-grid.svg"
          alt="footer-grid"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-center heading lg:max-w-[45vw]">
          {" "}
          Ready to take <span className="text-purple">your </span>digital
          presence to the next level
        </h1>
        <p className="text-white-200 text-center md:mt-10 my-5 ">
          {" "}
          Reach out to me today and let's discuss how I can help you achieve
          your goals.{" "}
        </p>
        
          <MagicButton
            handleClick={() => setOpen(true)}
            title="Get In Touch"
            icon={<FaLocationArrow />}
            position="right"
          />
           <ContactModal isOpen={open} onClose={() => setOpen(false)} />
    
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base  text-sm md:font-normal  font-light ">
          Copyright © 2026 Adarsh. All rights reserved.
        </p>
        <div className=" flex items-center  md:gap-3  gap-6 ">
          {socialMedia.map((profile) => (
            <div
              key={profile.id}
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filer backdop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={profile.img} alt={profile.img} width={20} height={20} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
