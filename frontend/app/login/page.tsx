"use client"
import React, { useState } from 'react'
import Container from '../component/main/common/Container'
import Image from 'next/image'
import { FcGoogle } from 'react-icons/fc'
import { HashLoader } from 'react-spinners'
import Link from 'next/link'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/navigation'
import apiRequest from '../lib/apiRequest'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/userSlice'
import { useAddUserInCartMutation } from '../redux/cartApi'

const Login = () => {
    const [loading,setLoading] = useState<boolean>(false)
    const [errorMessage,setErrorMessage] = useState<string>()
    const [statusMessage,setStatusMessage] = useState<boolean>()
    const [username,setUsername] = useState<string>()
    const [password,setPassword] = useState<string>()

    const router = useRouter()
    const dispatch = useDispatch()
    const[authorization] = useAddUserInCartMutation()

//////////////////////////////////// LOGIN WITH CREDENTIALS ///////////////////////////////////////////////
    const handleLogin =async () => {
        setLoading(true)
       try{
            const res:AxiosResponse<any> = await apiRequest.post('/auth/login',{username,password})
            if(res.data){
                dispatch(loginSuccess(res.data))
                setStatusMessage(true)
               
                await authorization({})
                setLoading(false)
                router.push('/checkout')
                router.refresh()
            }
       }
       catch(error){
       
      console.error('Error creating user:', error as Error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string, error: Error }>;

        if (axiosError.response) {
          if (axiosError.response.status === 400 &&
            axiosError.response.data.message === 'Email or Phone is invalid') {

            setErrorMessage('Email or Phone is invalid');
          } 
          else if(axiosError.response.status === 400 &&
            axiosError.response.data.message === 'invalid password'){
              setErrorMessage('invalid password');
          }
          else {
            console.error('Other Error:', axiosError.response.data.error);

          }
        } else if (axiosError.request) {
          console.error('No response received:', axiosError.request);

        } else {
          console.error('Request error:', axiosError.message);

        }
      } else {
        console.error('Unknown error:', error);
      }
      setLoading(false)
       }
       
    }

////////////////////////////////////////// LOGIN WITH PROVIDERS//////////////////////////////////////////////////////    
    const google = () => {
      window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google`,"_self")
     }

     


  return (
    <div className='w-full h-auto'>
    <Container>
        <div className='w-full flex justify-between'>
            <div className='border w-full lg:w-1/2 flex items-center gap-4 flex-col p-2'>
                <h1 className='text-gray-600 text-2xl '>Login Now</h1>
                {statusMessage && 
                <p className='text-white animate-bounce bg-green-400 p-3 w-full rounded text-lg'>Welcome back!</p>}
                {errorMessage && 
                !statusMessage && 
                (<p className='text-white animate-pulse bg-red-400 p-3 w-full rounded'>{errorMessage}!</p>)}
                <div className='w-full p-2 flex flex-col gap-2'>
                    <label htmlFor="email"  className='text-sm text-gray-500'>Email Id/ Phone Number*</label>
                    <input
                     type="text" 
                     placeholder='Email Id/ Phone Number' 
                     className='border border-gray-400 p-2 w-full placeholder:text-gray-400 placeholder:text-sm outline-none'
                     onChange={(e)=> setUsername(e.target.value)}
                     />
                    <label htmlFor="password" className='text-sm text-gray-500'>Password*</label>
                    <input 
                    type="password" 
                    placeholder='Your Password' 
                    className='border  border-gray-400 p-2 w-full placeholder:text-gray-400 placeholder:text-sm outline-none'
                    onChange={(e)=> setPassword(e.target.value)}
                    />
                     <div className='flex items-center gap-1'>
                <button 
                type="submit" 
                disabled={loading} 
                onClick={handleLogin}
                className="bg-teal-500 p-2 rounded-md text-white flex justify-center h-10 w-20 hover:bg-teal-600">
                 {loading ? <HashLoader color='#fff' size={20}/> :"Login"}
                </button>
                <p className='text-gray-500'>Not a member ?
                <Link href={'/user-register'} className='font-bold hover:text-gray-900'>Register Now</Link>
                </p>
              </div>
                </div>


                <span className='font-bold text-gray-700'>OR</span>



                <div  className='w-full p-2 flex flex-col gap-2'>
                    <button className='border-2 p-4 text-gray-700 border-gray-400 flex items-center justify-center gap-4' onClick={google}>
                        <FcGoogle size={22}/>Login with Google
                      </button>
                 </div>
                
            </div>
            <div className='hidden lg:flex h-full'>
            <Image src="/logo/loginImg.png" alt='login image' width={450} height={0} objectFit='fill'></Image>
          </div>
        </div>
    </Container>
    </div>
  )
}

export default Login
