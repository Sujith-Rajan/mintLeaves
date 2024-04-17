
import React from 'react'
import Image from 'next/image'
import { MdLogout } from 'react-icons/md'
import { menuItems } from '@/app/lib/utils/adminUtils'
import MenuLink from './menuLinks/MenuLinks'
import Link from 'next/link'



const Sidebar =async () => {
   
  return (
    <div className='p-4 flex flex-col gap-4'>
      <Link href="/" className='flex flex-col items-center gap-2'>
        <Image src='/logo/avatar.png' className='' alt="user image" width={50} height={50}></Image>
        <div className='flex flex-col items-center'>
          <span className=''>sujith</span>
          <span className=''>Admin</span>
        </div>
      </Link>
      <hr className='border-1'/>
      <ul className='flex flex-col gap-3'>
     {
      menuItems.map((item)=>(
        <li key={item.title}>
          <span className='mb-2 text-yellow-300'>{item.title}</span>
          <ul className='flex flex-col gap-4'>
           {item.list.map((lists)=>(
              <MenuLink lists={lists} key={lists.title}/>
            ))}
          </ul>
        </li>
      ))
     }
     </ul>
    
      <button className='flex items-center gap-2'> 
      <MdLogout /> 
      Logout
      </button>
  
    </div>
  )
}

export default Sidebar
