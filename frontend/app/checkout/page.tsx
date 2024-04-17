"use client"
import React, { useEffect } from 'react'
import Container from '../component/main/common/Container'
import Link from 'next/link'
import apiRequest from '../lib/apiRequest'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/userSlice'

const CheckOut = () => {
    const dispatch = useDispatch()

    useEffect(()=> {
    const getUser = async() =>{
        try{
            const res = await apiRequest.get("/auth/login/success")
            dispatch(loginSuccess(res.data))
        }
        catch(err){
            console.log(err)
        }
    }
        getUser()
    },[dispatch])

    return (
        <div className='w-full h-auto'>
            <Container>
                <div className='w-full bg-gray-100  p-2 rounded flex flex-col gap-4'>
                    <h2 className='text-gray-800 text-md'>Delivery Address</h2>
                    <div className=' bg-white flex flex-col-reverse justify-between p-2 rounded-md gap-6 w-full md:flex-row'>

                        <div className='flex flex-col gap-4 w-full md:w-1/2'>
                            <div className='flex flex-col'>
                                <label htmlFor="location" className='text-gray-400 text-sm'>Delivery Location *</label>
                                <select name="" id="" className='border-2 p-2 outline-none text-gray-500 text-sm'>
                                    <option value="">Select Delivery Location</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="location" className='text-gray-400 text-sm'>Delivery Time Slot *</label>
                                <select name="" id="" className='border-2 p-2 outline-none  text-gray-500 text-sm'>
                                    <option value="">Select Delivery Slot</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="location" className='text-gray-400 text-sm'>Payment Type *</label>
                                <select name="" id="" className='border-2 p-2 outline-none text-gray-500 text-sm'>
                                    <option value="">Cash</option>
                                    <option value="">Card</option>
                                    <option value="">Gpay</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col  w-full md:w-1/2'>
                            <label htmlFor="location" className='text-gray-400 text-sm truncate'>
                                Delivery Address * (You can add your new delivery address <Link href="/profile/address" className='text-blue-800'>here</Link> )
                            </label>
                            <textarea name="" id="" rows={5} className='border-2 p-2 outline-none'></textarea>
                        </div>

                    </div>
                </div>

                <div className='w-full bg-gray-100  p-2 rounded flex flex-col gap-4'>
                    <h2 className='text-gray-800 text-md'>Cart Total</h2>
                    <div className='w-full bg-white flex justify-between p-4 rounded-md gap-6'>
                        <div className='w-full flex flex-col gap-4 text-gray-500 text-sm'>
                            <div className='flex justify-between'>
                                <p>Cart Subtotal</p>
                                <p>₹ 60.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Delivery Charge</p>
                                <p>₹ 30</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Coupon Discount</p>
                                <p>₹ - 0.00</p>
                            </div>
                            <div className='flex justify-between font-bold'>
                                <p>Order Total</p>
                                <p>₹ 90.00</p>
                            </div>
                            <hr className='border-2' />
                        </div>
                    </div>
                    <div className='flex self-end'>
                        <button className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2'>PLACE ORDER</button>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default CheckOut
