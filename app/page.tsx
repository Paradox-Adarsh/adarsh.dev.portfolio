import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import RecentProjects from "@/components/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Image from "next/image";
import { FaHouse } from "react-icons/fa6";
import { navItems } from "@/data";
import Experience from "@/components/Experience";
import Approach from "@/components/Apprach";
import Footer from "@/components/Footer";


export default function Home() {

  
  return (
    <main className="relative bg-black-100 justify-center items-center  flex-col  sm:px-10 overflow-hidden  text-white px-5">
      <div className="max-w-7xl w-full ">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Experience />
        {/* <Approach / > */}
        <Footer/>
      </div>
    </main>
  );
}
