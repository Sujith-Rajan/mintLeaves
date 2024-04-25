"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoMdLogOut } from 'react-icons/io'
import { userProfile } from '@/app/lib/utils/clientUtils'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'

const User = () => {
    
    const pathName = usePathname()
    const {currentUser} = useSelector((state:RootState) => state.user)
  return (
    <div className='w-full lg:w-1/4 p-4 flex flex-col items-center gap-8 '>
    <div className='flex flex-col items-center'>
      <Image src={currentUser?.avatar ? currentUser.avatar :'/logo/avatar.png'}alt="profile avatar" width={120} height={100} className='rounded-full'></Image>
      <h2 className='font-bold'>Hi,<span className='text-emerald-500'>{currentUser?.fullname}</span></h2>
      <p className='text-gray-400'>{currentUser?.phone ? currentUser?.phone : " "}</p>
    </div>

    <div className='w-full flex flex-col gap-8 border-2 p-2'>
        {userProfile.map((link,index)=>(
        <Link href={link.url} key={index} className={`${pathName === link.url ? "bg-emerald-500 text-white" :""} cursor-pointer
         text-gray-700 hover:bg-emerald-500 hover:text-white p-2 
         text-sm flex items-center gap-2`} >
        <link.icon/>
        {link.title}
        </Link> 
        ))}
        <button className={` cursor-pointer
         text-gray-700 hover:bg-emerald-500 hover:text-white p-2 
         text-sm flex items-center gap-2`}><IoMdLogOut/>Logout</button>
    </div>
  
  </div>
  )
}

export default User
