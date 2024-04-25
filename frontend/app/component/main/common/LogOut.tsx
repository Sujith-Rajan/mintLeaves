import apiRequest from '@/app/lib/apiRequest'
import { logOut } from '@/app/redux/userSlice'
import React from 'react'
import { MdLogout } from 'react-icons/md'
import { useDispatch } from 'react-redux'

const LogOut = () => {
    const dispatch = useDispatch()

    const logout = async() => {
      console.log("logout")
      try {
        const res = await apiRequest.get("/auth/logout")
        if(res) dispatch(logOut())
      }
      catch(err){
        console.log(err)
      }
    }
  return (
    <div>
       <button className='flex items-center gap-2' onClick={logout}> 
      <MdLogout /> 
       Logout
      </button>
    </div>
  )
}

export default LogOut
