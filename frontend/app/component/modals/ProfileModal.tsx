import React from 'react'
import { userProfile } from '@/app/lib/utils/clientUtils'
import Link from 'next/link'
import {motion} from 'framer-motion'
import { easeIn } from 'framer-motion/dom'
import apiRequest from '@/app/lib/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '@/app/redux/userSlice'
import { RootState } from '@/app/redux/store'
import LogOut from '../main/common/LogOut'

interface ProfileModalProps {
  setOpenProfileModal: () => void;
}


const ProfileModal = ({setOpenProfileModal}: ProfileModalProps) => {
  
  const dispatch = useDispatch()

  setTimeout(()=> {
    setOpenProfileModal()
  },5000)

  // const logout = async() => {
  //   try {
  //     const res = await apiRequest.get("/auth/logout")
  //     if(res) dispatch(logOut())
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }

  const {currentUser} = useSelector((state:RootState) => state.user)
  const role = currentUser?.role

  return (
    <motion.div 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration:0.3,ease:easeIn}}
    className='bg-white shadow-xl rounded-lg w-52 h-auto flex flex-col gap-1
     p-4 text-black text-xs absolute right-0 top-16'>
     {role === "ADMIN" && <Link href={"/dashboard"} className='text-blue-600 hover:underline'>Go To Admin Panel</Link>}
     <hr /> 
      {userProfile.map((list,index) => (
        <Link href={list.url} key={index}
         className='text-gray-700 hover:bg-emerald-500 hover:text-white ' onClick={setOpenProfileModal}>
            {list.title}
        <hr className='border-b border-gray-400' />
        </Link>
        
      ) )}
      {/* <button className={` cursor-pointer
         hover:bg-emerald-500 hover:text-white 
         text-xs flex items-center gap-2`} onClick={logout}>Logout</button> */}
         <LogOut/>
    </motion.div>
  )
}

export default ProfileModal
