import React from 'react'
import { Spotlight } from './ui/Spotlight'
import { cn } from '../lib/utils'
import { TextGenerateEffect } from './ui/TextGenerateEffect'


const Hero = () => {
  return (
    <div className='pb-20 pt-36'>
     <div>

       <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-32 h-screen " fill="white"/>
      <Spotlight className=" -top-10 left-full h-[80vh] w-[50vw] " fill="purple"/>
      <Spotlight className=" top-28 left-80  h-[80vh] w-[50vw]" fill="blue"/>
     </div>

     <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-black-100">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,rgba(228,228,231,0.9)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div> */}

      <div className='flex justify-center my-20 z-10'>
        <div className='max-w-[89vw] flex flex-col items-center justify-center'>
          <h2 className='tracking-widest uppercase text-center text-blue-100 text-xs max-w-80 '>Dynamic Web Magic</h2>
          <TextGenerateEffect className="" words="transforming the text here"/>
        </div>

      </div>
      
    </div>
     
    </div>
  )
}

export default Hero
