import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/redux/store'
import Link from 'next/link'


const Cart = () => {
    const {products} = useSelector((state:RootState)=>state.cart)
    const count = products.length;
   

  return (
    <Link href="/cart" className='p-2 rounded-full flex items-center relative cursor-pointer'>
    <FaCartShopping className='text-white z-10' />
    {count > 0 &&
    <div className='absolute -top-3 -right-1 bg-red-500 rounded-full 
     min-w-4 min-h-4 p-0.5 flex justify-center items-center'>
    <span className='text-xs text-white'>{count}</span>
    </div> 

    }
</Link>
  )
}

export default Cart

