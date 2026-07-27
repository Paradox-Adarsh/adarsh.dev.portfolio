"use client";

import AboutHero from "@/components/about/AboutHero";
import Achievements from "@/components/about/Achievements";
import StatPanel from "@/components/about/StatPanel";
import Timeline from "@/components/about/Timeline";

export default function AboutPage(){
    return(
        <main className="relative bg-black-100  min-h-screen text-white overflow-hidden px-5 sm:px-10">
           
<div className="absolute inset-0
        [background-size:40px_40px]
        [background-image:linear-gradient(to_right,rgba(228,228,231,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.03)_1px,transparent_1px)]
        pointer-events-none" />
        <div className="max-w-5xl mx-auto py-20 flex flex-col gap-32 relative z-10">
        <AboutHero/>
        {/* <StatPanel/> */}
        <Timeline/>
        <Achievements/>
     
      </div>
        

        </main>
    )
}