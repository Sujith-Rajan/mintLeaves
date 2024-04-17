import Image from 'next/image'
import React from 'react'

const MyProfile = () => {
  return (
      <div className='w-full p-4 flex flex-col gap-4'>
      <h2 className='text-gray-800 text-xl'>My Profile</h2>
      <div className='flex flex-col gap-4'>

        <div>
        <label htmlFor="full_name" className='text-gray-500 text-sm'>Full Name *</label>
        <input type="text" name='full_name' required className='w-full p-2 border-2 border-gray-300 rounded outline-none' />
        </div>

        <div className='flex justify-between gap-4'>
           <div className='flex flex-col w-full'>
          <label htmlFor="phone" className='text-gray-500 text-sm'>Phone *</label>
          <input type="number" required className=' p-2 border-2 border-gray-300 rounded outline-none'/>
          </div>

          <div className='flex flex-col w-full'>
          <label htmlFor="email" className='text-gray-500 text-sm'>Email *</label>
          <input type="email" required className=' p-2 border-2 border-gray-300 rounded outline-none'/>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="image"  className='text-gray-500 text-sm'>Profile Picture</label>
            <Image src="/logo/no_image.jpg" alt="profile image" width={100} height={100} className='border-2'></Image>
            <div className='relative'>
            <input type="file" name='image' className='opacity-0 absolute top-0 z-50 cursor-pointer'/>
            <label htmlFor=""  className='text-gray-500 text-sm absolute top-0'>Select Image</label>
            </div>
          </div>

      </div>
      <button className='bg-teal-600 hover:bg-teal-700 text-white p-2 mt-4 rounded'>Save Changes</button>
    </div>
  )
}

export default MyProfile
