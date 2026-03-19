import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative justify-center items-center flex-col mx-auto  sm:px-10 overflow-hidden text-white bg-dark">
      <div className="max-w-7xl w-full">
        <h1><Hero/> </h1>
      </div>
    </main>
  );
}
