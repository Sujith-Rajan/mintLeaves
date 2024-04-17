import { RootState } from '@/app/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { useSelector } from 'react-redux'



const Avatar = () => {
  const {currentUser} = useSelector((state:RootState) => state.user)

  const userName = currentUser ? `hi,${currentUser.fullname}` : 'Sign In';
  const user =  userName.toLowerCase()
  
  return (
    <div className='flex gap-1 items-center  p-1 rounded-md text-white cursor-pointer'>
      {currentUser?.avatar ?  
      <Image src={currentUser.avatar} alt='user image' width={30} height={10} className='rounded-full'></Image>
      :
      <FaRegUserCircle size={20}/>
     }
      
       
        <Link href={currentUser ? "":`/login`} className='hidden md:flex text-xs text-green-950 truncate capitalize'>{user}</Link>    
    </div>
  )
}

export default Avatar