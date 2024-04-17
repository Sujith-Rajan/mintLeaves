"use client"
import React, { useState } from 'react';
import Container from '../component/main/common/Container';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ReCaptha from 'react-google-recaptcha'
import { HashLoader } from 'react-spinners';
import apiRequest from '../lib/apiRequest';


interface IFormInputs {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
  phone: string;
}

const UserRegister = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<boolean>(false);
  const [showPassword, setShowPasswowrd] = useState<boolean>(false)
  const [reCapthcToken, setReCaptchToken] = useState<string | null>(null)
  const router = useRouter()



  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<IFormInputs>();
  const password = watch('password')



  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setLoading(true)
    try {

      if (!reCapthcToken) {
        return setErrorMessage('reCaptcha Not Verified')
      }

      const response = await apiRequest.post('/auth/register', JSON.stringify({ ...data, reCapthcToken }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res = await response.data

      if (res) {
        setStatusMessage(true)
        setLoading(false)
        router.push('/login')
      }


    } catch (error) {
      console.error('Error creating user:', error as Error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string, error: Error }>;

        if (axiosError.response) {
          if (axiosError.response.status === 400 &&
            axiosError.response.data.message === 'User with this email already exists') {
            console.error('User already exists:', axiosError.response.data.message);

            setErrorMessage('User with this email already exists');
          } 
          else if(axiosError.response.status === 400 &&
            axiosError.response.data.message === 'User with this phone number already exists'){
              setErrorMessage('User with this phone number already exists');
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


  };


  const handleReCaptch = (token: string | null) => {
    setReCaptchToken(token)
  }



  return (
    <div className='w-full h-auto'>
      <Container>
        <div className='w-full flex justify-between'>
          <div className='border w-full lg:w-1/2 flex items-center gap-4 flex-col p-2'>
            <h1 className='text-gray-600 text-2xl'>Register Now</h1>
            {statusMessage && <p className='text-white animate-bounce bg-green-400 p-3 w-full rounded'>Your account has been created</p>}
            {errorMessage && !statusMessage && (<p className='text-white animate-pulse bg-red-400 p-3 w-full rounded'>{errorMessage}!</p>)}
            <form onSubmit={handleSubmit(onSubmit)} className='w-full p-2 flex flex-col gap-2'>

              {/* fullname */}
              <div className="flex flex-col w-full">
                <label htmlFor="fullname" className='text-sm text-gray-500'>Full Name*</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  {...register('fullname', {
                    required: 'Full Name is required',
                    minLength: {
                      value: 3,
                      message: 'Name should be at least three letters',
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: 'Full Name should contain only letters',
                    },
                  })}
                  className="ring-1 p-3 rounded-sm outline-none w-full placeholder:text-sm"
                />
                <div className="text-red-400 text-sm">
                  {errors.fullname && <p>{errors.fullname.message}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col w-full">
                <label htmlFor="phone" className='text-sm text-gray-500'>Phone*</label>
                <input
                  type="tel"
                  placeholder="Enter 10 digit mobile number"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Please enter a valid 10-digit phone number',
                    },
                  })}
                  className="ring-1 p-3 rounded-sm outline-none w-full placeholder:text-sm"
                />
                <div className="text-red-400 text-sm">
                  {errors.phone && <p>{errors.phone.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col w-full">
                <label htmlFor="email" className='text-sm text-gray-500'>Email*</label>
                <input
                  type="text"
                  placeholder="Email Id"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  className="ring-1 p-3 rounded-sm outline-none w-full placeholder:text-sm"
                />
                <div className="text-red-400 text-sm">
                  {errors.email && <p>{errors.email.message}</p>}
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col w-full">
                <label htmlFor="password" className='text-sm text-gray-500'>Password*</label>
                <div className='flex items-center ring-1 p-3 rounded-sm'>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password should be at least 8 characters',
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~=\-\\`{}[\]:";'<>?,./])[0-9a-zA-Z!@#$%^&*()_+|~=\-\\`{}[\]:";'<>?,./]{8,}$/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                      },
                    })}
                    className=" outline-none w-full placeholder:text-sm"
                  />
                  <div onClick={() => setShowPasswowrd(!showPassword)}>
                    {showPassword ? <FaEye /> : <FaEyeSlash />
                    }
                  </div>
                </div>
                <div className="text-red-400 text-sm">
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>

              {/* confirm password */}
              <div className="flex flex-col w-full">
                <label htmlFor="confirmpassword" className='text-sm text-gray-500'>Confirm Password*</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmpassword', {
                    required: 'Confirm Password is required',
                    validate: (value) => value === password || 'The passwords do not match',
                  })}
                  className="ring-1 p-3 rounded-sm outline-none w-full placeholder:text-sm"
                />

                <div className="text-red-400 text-sm">
                  {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
                </div>
              </div>
 {/* Recapthcha */}
              <ReCaptha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} onChange={handleReCaptch} />


              <div className='flex items-center gap-1'>
                <button type="submit" disabled={loading} className="bg-teal-500 p-2 rounded-md text-white flex justify-center h-10 w-20 hover:bg-teal-600">
                 {loading ? <HashLoader color='#fff' size={20}/> :" Register"}
                </button>
                <p className='text-gray-500'>Already a member?<Link href={'/login'} className='font-bold hover:text-gray-900'>Login Now</Link></p>
              </div>
            </form>
          </div>
          <div className='hidden lg:flex h-full'>
            <Image src="/logo/loginImg.png" alt='login image' width={450} height={0} objectFit='fill'></Image>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UserRegister;
