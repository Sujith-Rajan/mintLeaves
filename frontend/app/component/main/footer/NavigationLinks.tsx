"use client"
import { navLink } from '@/app/lib/utils/clientUtils'
import React, { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import {motion} from 'framer-motion'
import Link from 'next/link'

 
const NavigationLinks = () => {
  const[changeChevron,setChangeChevron] = useState<number | null>(null)

  const toggleCategory = (index: number) => {
    setChangeChevron(changeChevron === index ? null : index);
  };

  
  return (
    <div className='flex flex-col sm:flex-row justify-between'>
        {navLink.map((link,index)=>(
        <div key={index} className='flex flex-col gap-4 sm:gap-3'>
          <div className='flex justify-between' onClick={()=>toggleCategory(index)}>
        <ul className={`${changeChevron === index && 'underline'} text-white font-extrabold mt-1`}>{link.title}</ul>
        <motion.div 
        initial={{rotate:0}}
        animate={{ rotate:changeChevron === index ? 180 : 0}}
        transition={{duration:0.3}}
        className='sm:hidden text-gray-700' >
           <FaChevronDown /> 
        </motion.div>
        </div>
        
        {link.links.map((item,subIndex) =>
        <Link 
          href="/"
        className={`${changeChevron === index ? 'flex-col' : 'hidden'} sm:flex text-white cursor-pointer`} 
        key={subIndex}>
          {item}
        </Link>
        )}
        <hr className=' sm:hidden text-gray-700 mb-4'/>
        </div>
        ))}
    </div>
  )
}

export default NavigationLinks