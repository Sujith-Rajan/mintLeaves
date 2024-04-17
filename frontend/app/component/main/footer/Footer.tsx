"use client"
import React from 'react'
import NavigationLinks from './NavigationLinks'
import Tagline from './Tagline'
import Social from './Social'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathName = usePathname()
  return (
    <>
    {pathName.substring(1).slice(0,9) !== 'dashboard' &&
    <div className='h-auto  bg-gradient-to-r from-[#0F3443] to-[#34E89E] flex flex-col'>
      <div className='p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10'>
      <NavigationLinks/>
      </div>
      <hr className="border border-gray-400 shadow-lg"/>
      <div className='p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10 flex self-center'>
        <Tagline/>
      </div>
      <div className='h-20'>
        <Social/>
      </div>
    </div>
}
</>
  )
}

export default Footer