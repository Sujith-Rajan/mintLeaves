"use client"
import { useDeleteItemMutation } from '@/app/redux/cartApi'
import { deleteOne } from '@/app/redux/cartSlice'
import { RootState } from '@/app/redux/store'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

const CartTableMobile = () => {
  const dispatch = useDispatch()
  const {products} = useSelector((state:RootState)=>state.cart)
  const [deleteItem, { isLoading }] = useDeleteItemMutation();

    const [quantity, setQuantity] = useState<number>(1)
    const handleQuantity = (operation: string) => {
      if (operation === "-") {
        setQuantity(quantity === 1 ? 1 : quantity - 1)
      }
      if (operation === "+") {
        setQuantity(quantity + 1)
      }
    }

    const handleDelete = async (product: any) => {
      try {
         dispatch(deleteOne(product));
        await deleteItem(product.productId);
         
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }



  return (
    <div className='w-full flex sm:hidden'>
    <table className='w-full'>
          <thead>
            <tr className=' bg-gray-100 text-gray-700 h-16 shadow-md text-sm text-left truncate '>
                <th scope='col'>Product</th>
                <th scope='col'>Qty</th>
            </tr>
            </thead>
            <tbody >
            {products.map((product)=>(
            <tr className="text-center sm:text-left text-gray-600 text-xs" key={product.id}>
              <td scope='row' className='flex flex-col gap-2 items-start'>
              <div className='w-20 h-20 relative'>
                <Image
                  src={product.image}
                  alt='cart product'
                  layout='fill'
                  objectFit='cover'
                  unoptimized={true}
                />
              </div>
                <div className='text-black text-bold'>{product.title} <span>({product.quantity}kg)</span></div>
                <div><span>Unit Price(₹):{" "}</span><span className='text-gray-800'>{product.price}</span></div>
                <div><span>Total(₹):{" "}</span><span className='text-black text-bold'>{product.total}</span></div>
              </td>
              <td> 
                
                <div className='flex items-center text-gray-600 '>
               <button className='p-2 border border-teal-500 rounded-md bg-teal-300' 
               onClick={() => handleQuantity("-")}>-</button>
               <span className='p-2'>{product.quantity}</span>
               <button className='p-2 border border-teal-500 rounded-md bg-teal-300' 
               onClick={() => handleQuantity("+")}>+</button>
               </div>

               <div className='text-red-400 hover:text-red-500 cursor-pointer flex items-center mt-2' 
                onClick={()=> handleDelete(product)}>
                <MdDeleteForever size={20} title='Remove Item'/>
              </div>
            </td>
             
            </tr>
             ))}
            </tbody>
        </table>
    </div>
  )
}

export default CartTableMobile
