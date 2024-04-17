"use client"
import Image from 'next/image'
import React, {useEffect, useLayoutEffect, useState } from 'react'
import { topBanners } from '@/app/lib/utils/clientUtils'
import {easeIn, motion} from "framer-motion"

const TopBanner = () => {
  const[currentSlide,setCurrentSlide] = useState<number>(0)
  
  useEffect(()=>{
    const interval = setInterval(()=> 
      setCurrentSlide((prev) =>(prev === topBanners.length - 1 ? 0 : prev + 1 )),7000
    )
    return () => clearInterval(interval)
  },[])

  return (
    <motion.div 
    key={currentSlide}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: easeIn, duration: 1 }}
        className='w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] xl:min-h-[500px] relative cursor-pointer'>
        <Image src={topBanners[currentSlide]?.image} alt='top banner image' layout='fill' loading='lazy'></Image>
        <div className='absolute bottom-2 inset-x-0 flex justify-center gap-1'>
        {topBanners.map((banner,index) => (
         <button key={index} className={` w-8 h-1 rounded-md ${currentSlide === index ? 'bg-gray-600':'bg-gray-300'}`} 
         onClick={()=>setCurrentSlide(index)}></button>
        ))}
        </div>
    </motion.div>
  )
}

export default TopBanner