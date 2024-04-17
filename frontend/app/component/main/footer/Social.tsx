import Link from 'next/link'
import React from 'react'
import { icons } from '@/app/lib/utils/clientUtils'


const Social = () => {
  return (
    <div className='w-full h-auto bg-white 
    p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10
     flex flex-col justify-between gap-4 lg:flex-row'>
        <div className='flex justify-center flex-wrap gap-4 text-gray-800 text-xl'>
            {icons.map((item,index) => (
            <Link href={item.url} key={index}
            className='hover:bg-gray-400 rounded-full flex items-center p-1' >
                <item.icon/>
            </Link>
            ))}
        </div>
        <div className=' flex justify-center flex-wrap gap-4  text-gray-800 font-bold '>
            <span>Terms</span>
            <span>Privacy</span>
            <span>TM & © 2024 aisle, Inc.</span>
        </div>
    </div>
  )
}

export default Social