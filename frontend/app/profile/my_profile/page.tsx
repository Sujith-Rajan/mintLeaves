"use client"
import { RootState } from '@/app/redux/store'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const {currentUser} = useSelector((state:RootState) => state.user)
  return (
      <div className='w-full p-4 flex flex-col gap-4'>
      <h2 className='text-gray-800 text-xl'>My Profile</h2>
      <div className='flex flex-col gap-4'>

        <div>
        <label
         htmlFor="full_name" 
         className='text-gray-500 text-sm'>Name *</label>
        <input 
        type="text"
         name='full_name' required 
         value={currentUser?.fullname}
         className='w-full p-2 border-2 border-gray-300 rounded outline-none' />
        </div>

        <div className='flex flex-col md:flex-row justify-between gap-4'>
           <div className='flex flex-col w-full'>
          <label htmlFor="phone" className='text-gray-500 text-sm'>Phone *</label>
          <input
           type="number"
            required 
            value={currentUser?.phone}
            className=' p-2 border-2 border-gray-300 rounded outline-none'/>
          </div>

          <div className='flex flex-col w-full'>
          <label htmlFor="email" className='text-gray-500 text-sm'>Email *</label>
          <input 
          type="email" 
          value={currentUser?.email}
          required className=' p-2 border-2 border-gray-300 rounded outline-none'/>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="image"  className='text-gray-500 text-sm'>Profile Picture</label>
            <Image src="/logo/no_image.jpg" alt="profile image" width={100} height={100} className='border-2'></Image>
            <div className='relative'>
            <input type="file" name='image' className='opacity-0 absolute top-0 z-50 cursor-pointer'/>
            <label htmlFor=""  className='text-gray-500 text-sm absolute top-0'>Change Image</label>
            </div>
          </div>

      </div>
      <button className='bg-teal-600 hover:bg-teal-700 text-white p-2 mt-4 rounded'>Save Changes</button>
    </div>
  )
}

export default MyProfile
