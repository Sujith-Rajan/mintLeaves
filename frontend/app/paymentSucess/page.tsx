"use client"
import React, { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useSearchParams } from 'next/navigation'
import { TiTick } from 'react-icons/ti'
import Container from '../component/main/common/Container'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { clearCart } from '../redux/cartSlice'


const Success = () => {
  const dispatch = useDispatch()
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [width ,setWidth] = useState<number>()
  const searchParams = useSearchParams()
  const paymentid = searchParams.get('paymentId')

  useEffect(() => {
    dispatch(clearCart())
    setIsConfettiActive(true)
    
    const handleResize = () => {
      setWidth(window.innerWidth); 
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch])


  return (

    
      <Container>
      <div className='h-full w-full flex flex-col items-center justify-start mt-3'>
        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-green-300 flex justify-center items-center" role="alert">
        <div className="w-14 h-14 md:w-28 md:h-28 rounded-full bg-green-500 flex justify-center items-center animate-pulse  text-white " role="alert">
        <TiTick size={40}/>
        </div>
        
        </div>
         <strong className="font-bold text-lg md:text-xl text-green-800 ">Order successful!</strong>
          <span className="block sm:inline text-gray-500 text-center">Your order id<span className='font-bold text-black'>{"   "}{paymentid} </span>has been processed.</span>
          <Link href={"/products"} className='underline text-blue-500'>Continue Shopping</Link>
      </div>

      <Confetti width={width}/>
      </Container>
    
  )
}

export default Success