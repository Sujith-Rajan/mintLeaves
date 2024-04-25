"use client"
import React, { useEffect, useState } from 'react'
import Container from '../component/main/common/Container'
import Link from 'next/link'
import apiRequest from '../lib/apiRequest'
import { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { HashLoader } from 'react-spinners'

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    image: string;
    handler: (response: any) => void;
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    notes: {
        address: string;
    };
    theme: {
        color: string;
    };
}

interface Razorpay {
    new (options: RazorpayOptions): any;
    open(): void;
}

declare global {
    interface Window {
        Razorpay: Razorpay;
    }
}


const CheckOut = () => {

    const router = useRouter()
    
   
    const [pincode,setPincode] = useState<string>('')
    const [timeSlot,setTimeslot] = useState<string>('')
    const [paymentMode,setPaymentMode] = useState<string>('')
    const [address,setAddress] = useState<string>('')
    const [error,setError] = useState<boolean>(false)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const {currentUser} =  useSelector((state:RootState) => state.user)
    const userId = currentUser?.id

    const {subtotal} = useSelector((state:RootState) => state.cart)
    if(!subtotal){
        return router.push("/products")
    }
    const deliveryCharge: number = 30
    const discount: number = 0
    const total:number = subtotal + deliveryCharge - discount 

    const validateFields = () => {
        return !!(pincode && timeSlot && paymentMode && address); // Check if all fields are filled
    };

////////////////////////////////////////////////////////////////////////////////  RAZOR PAY INTEGRATION ////////////////////////////////////////////
     
        const paymentHandler = async() => {
            try {
                setIsLoading(true)
                 setError(false)
                 if (!validateFields()) {
                    return setError(true)
                }

                    const data = {
                        amount:total
                    }
                  
        //  CHECK PAYMENT MODE    

                    if(paymentMode === "COD"){
                        setIsLoading(true)
                        const data = {
                            slotTime:timeSlot,
                            payment:paymentMode,
                            amount: total,
                            deliveryCharge,
                            disCount:discount,
                            userId,
                        }
                        const verify = await apiRequest.post("/order/verify_pymnt",data)
                        const orderData = verify.data
                        if(orderData) router.push("/paymentSucess/?paymentId="+orderData.razorpayId)
                        return   
                        setIsLoading(false) 
                    }
              
                    const res =await apiRequest.post("/order",data)
                    const {order} = await res.data
                    

                    const options = {
                        key: "rzp_test_hw4zzsVJcwD0kq",
                        amount:order.amount,
                        currency:"INR",
                        name:"mintleaves.in",
                        description:"grocery items",
                        order_id:order.orderId,
                        image:"/logo/icon.png",
                        handler:async (res:any) => {
                           
                            const data = {
                                razorpay_payment_id: res.razorpay_payment_id,
                                slotTime:timeSlot,
                                payment:paymentMode,
                                amount: total,
                                deliveryCharge,
                                disCount:discount,
                                userId,
                            }
                            const verify = await apiRequest.post("/order/verify_pymnt",data)
                            const orderData = verify.data
                            if(orderData) router.push("/paymentSucess/?paymentId="+orderData.razorpayId)
                          },
                          prefill: {
                            name: "Sujith Rajan",
                            email: "sujithrajan223@gmail.com",
                            contact: "9846522638",
                          },
                          notes: {
                            address: "Razorpay Corporate Office",
                          },
                          theme: {
                            color: "#3399cc",
                          },
    
                    }
                    const paymentObject = new window.Razorpay(options);
                    paymentObject.open();

                    paymentObject.on("payment.failed", function (response:Response) {
                        alert("Payment failed. Please try again. Contact support for help");
                      });
                      setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
    
       
    

 

    return (
        <div className='w-full h-auto'>
            <Container>
                {error && <p className='w-full text-center text-red-600 animate-pulse'>All fields required *</p>}
                <div className='w-full bg-gray-100  p-2 rounded flex flex-col gap-4'>
                    <h2 className='text-gray-800 text-md'>Delivery Details</h2>
                    <div className=' bg-white flex flex-col-reverse justify-between p-2 rounded-md gap-6 w-full md:flex-row'>

                        <div className='flex flex-col gap-4 w-full md:w-1/2'>
                            <div className='flex flex-col'>
                                <label htmlFor="pincode" className='text-gray-400 text-sm'>Pincode *</label>
                                <select name="" id="" className='border-2 p-2 outline-none text-gray-500 text-sm' onChange={(e)=>setPincode(e.target.value)}>
                                    <option  value="">Pincode</option>
                                    <option value="682315">682315</option>
                                    <option value="682316">682316</option>
                                    <option value="682317">682317</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="location" className='text-gray-400 text-sm'>Delivery Time Slot *</label>
                                <select name="" id="" className='border-2 p-2 outline-none  text-gray-500 text-sm' onChange={(e)=>setTimeslot(e.target.value)}>
                                <option  value="">Delivery time</option>
                                    <option value="10 AM - 12 PM">10 AM - 12 PM</option>
                                    <option value="12 PM - 6 PM">12 PM - 6 PM</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="location" className='text-gray-400 text-sm'>Payment Type *</label>
                                <select name="" id="" className='border-2 p-2 outline-none text-gray-500 text-sm' onChange={(e)=>setPaymentMode(e.target.value)}>
                                   <option  value="">Payment Mode</option>
                                    <option value="CARD_UPI">CARD/UPI</option>
                                    <option value="COD">COD</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col  w-full md:w-1/2'>
                            <label htmlFor="location" className='text-gray-400 text-sm truncate'>
                                Delivery Address * (You can add your new delivery address <Link href="/profile/address" className='text-blue-800'>here</Link> )
                            </label>
                            <textarea name="" id="" rows={5} className='border-2 p-2 outline-none' value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                        </div>

                    </div>
                </div>

                <div className='w-full bg-gray-100  p-2 rounded flex flex-col gap-4'>
                    <h2 className='text-gray-800 text-md'>Cart Total</h2>
                    <div className='w-full bg-white flex justify-between p-4 rounded-md gap-6'>
                        <div className='w-full flex flex-col gap-4 text-gray-500 text-sm'>
                            <div className='flex justify-between'>
                                <p>Cart Subtotal</p>
                                <p>₹ {subtotal}.00</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Delivery Charge</p>
                                <p>₹ {deliveryCharge}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p>Coupon Discount</p>
                                <p>₹ - {discount}.00</p>
                            </div>
                            <div className='flex justify-between font-bold'>
                                <p>Order Total</p>
                                <p>₹ {total}.00</p>
                            </div>
                            <hr className='border-2' />
                        </div>
                    </div>
                    <div className='flex self-end'>
                        <button 
                        disabled={isLoading} 
                        className='bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 w-44 flex justify-center'
                         onClick={paymentHandler}>
                            {isLoading ?<HashLoader size={25} color='#ffff'/>:'PLACE ORDER'}
                        </button>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default CheckOut
