import React from 'react'
import { shopByCategory } from '@/app/lib/utils/clientUtils';
import Link from 'next/link'

interface CatogriesModalPorp{
  setOpenCatModal: (isOpen:boolean) => void;
}

const CatogriesModal = ({setOpenCatModal}:CatogriesModalPorp) => {
  return (
    <div className='flex flex-col gap-2 text-black bg-white font-normal 
    absolute top-14 left-64 w-44 p-2 shadow-xl rounded-md'
     onMouseLeave={()=>setOpenCatModal(false)} onMouseEnter={()=>setOpenCatModal(true)}>
      { shopByCategory.map((cat)=>(
        <ul key={cat.id} className=''>
          <li>
            <Link href={cat.url} className='cursor-pointer truncate text-xs text-gray-700'>
              {cat.cat}</Link>
            <hr className='border-b border-gray-400' />
            </li>
        </ul>    
        ))}        
    </div>
  )
}

export default CatogriesModal