import Grid from "@/components/Grid";
import Hero from "@/components/Hero";

import { FloatingNav } from "@/components/ui/FloatingNav";
import Image from "next/image";
import { FaHouse } from "react-icons/fa6";
import { navItems } from "@/data";
import Experience from "@/components/Experience";
import Approach from "@/components/Apprach";
import Footer from "@/components/Footer";
import TechStack from "@/components/TechStack";
import AddSkillModal from "@/components/modals/AddSkillModal";
import RecentProjects from "@/components/RecentProjects";
import Timeline from "@/components/about/Timeline";


export default function Home() {

  
  return (
    <main className="relative bg-black-100 justify-center items-center  flex-col  sm:px-10 overflow-hidden  text-white px-5">
      <div className="max-w-7xl w-full ">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
         {/* <Timeline/> */}
        <TechStack/>
        <RecentProjects/>
        <Experience />
        {/* <Approach / > */}
        <Footer/>
              <AddSkillModal />   
      </div>
    </main>
  );
}
