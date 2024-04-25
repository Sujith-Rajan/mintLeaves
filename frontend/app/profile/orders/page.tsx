"use client"
import apiRequest from '@/app/lib/apiRequest'
import { Order } from '@/app/lib/types'
import { RootState } from '@/app/redux/store'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Orders = () => {
 
  const[orders,setOrders] = useState<Order[]>([])
  const {currentUser} = useSelector((state:RootState) => state.user)
  const id = currentUser?.id

  useEffect(()=> {
    const getOrders = async() => {
      const res = await apiRequest.get(`/order/all_orders_user/${id}`)
      setOrders(res.data)
    }
    getOrders()
  },[id])

  
  

  return (
   
    <div className='w-full p-4 flex flex-col gap-4'>
    <h2 className='text-gray-800 text-xl'>Order List</h2>
    { orders ? 
    <div className='w-full'>
      <table className='border-2 w-full'>
        <thead>
        <tr className=' text-gray-500 text-sm border-b-2 text-center'>
          <th >Order #</th>
          <th>Date Purchased</th>
         
          <th>Total</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
          {orders.map((order:Order)=> (
          <tr key={order.id} className='text-gray-500 text-sm text-center overflow-y-auto'>
            <td className='p-2'>{order.id}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>{order.amount}</td>
            <td className={`${order.orderStatus === "PENDING" ? 'text-red-600' : 'text-green-600'} `}>{order.orderStatus}</td>
            
            <td className='text-blue-600'>View </td>
          </tr>
          ))}
        </tbody>
      </table>
     
    </div>
 :
          <h1 className='text-center text-gray-400 font-bold'>No Orders Yest</h1>
}
  </div>
 
  )
}

export default Orders
