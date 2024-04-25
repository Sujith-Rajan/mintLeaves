"use client"
import SingleUserUpdate from '@/app/component/dashboard/SingleUserUpdate'
import apiRequest from '@/app/lib/apiRequest'
import React, { useEffect, useState } from 'react'

interface User {
      id: string;
      fullname: string;
      email: string;
      phone: string;
      avatar?: string;
      role: string;
      zipCode?: string;
      address?: string;
      state?:string;
      city?:string;
  
}

interface UpdateUserProps{
  params:{id:string}
}

const UpdateUser = ({params}:UpdateUserProps) => {
  const {id} = params
  const[user,setUser] = useState<User>({
    id: '',
    fullname: '',
    email: '',
    phone: '',
    role: '',
    avatar:'',
    zipCode:'',
    address:'',
    state:'',
    city:'',
  })
  
  useEffect(()=>{
    const  getUser = async() => {
    try{
      const res = await apiRequest.get(`/admin-dashboard/user/${id}`)
      setUser(res.data.user)
  }
  catch(err){
    console.log(err)
    throw new Error("Failed to fetch products!"+ err)     
}
    }
    getUser()
  },[id])

  return (
    <div>
      <SingleUserUpdate user={user}/>
    </div>
  )
}

export default UpdateUser