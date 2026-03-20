import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative bg-black-100 justify-center items-center  flex-col  sm:px-10 overflow-hidden  text-white px-5">
      <div className="max-w-7xl w-full ">
<Hero/>
      </div>
    </main>
  );
}
