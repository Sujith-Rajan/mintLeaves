"use client"
import { useDeleteItemMutation, useUpdateItemMutation } from '@/app/redux/cartApi'
import { deleteOne, updateProductQuantity } from '@/app/redux/cartSlice'
import { RootState } from '@/app/redux/store'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { HashLoader } from 'react-spinners'



const CartTableDesktop = () => {
  
  const dispatch = useDispatch()
  const {products} = useSelector((state:RootState)=>state.cart)
  
  const [deleteItem, { isLoading }] = useDeleteItemMutation();
  const [updatCart,{isLoading:loadingUpdate}] = useUpdateItemMutation()

  const handleQuantityChange =async (productId: string, newQuantity: number,operation: string) => {
    if(operation === '-'){
      await updatCart({id:productId,quantity:-1})
    }
    if(operation === '+'){
      await updatCart({id:productId,quantity:+1})
    }
    dispatch(updateProductQuantity({ productId, quantity: newQuantity }));
   
  };
 




    const handleDelete = async (product: any) => {
      
      try {
         dispatch(deleteOne(product));  
        const res = await deleteItem(product.productId);

         
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }


  return (
    <div className='w-full hidden sm:flex'>
    <table className='w-full'>
      <thead>
        <tr className=' bg-gray-100 text-gray-700 h-16 shadow-md 
        text-sm text-left truncate '>
            <th scope='col'>Product</th>
            <th scope='col'>Description</th>
            <th scope='col'>Unit Price(₹)</th>
            <th scope='col'>Qty</th>
            <th scope='col'>Total(₹)</th>
            <th scope='col'>{""}</th>
        </tr>
        </thead>

        <tbody >
          {products?.map((product)=>(
        <tr className="text-center sm:text-left text-gray-600 text-xs" key={product.id}>
          <td scope='row'>
          <div className='w-20 h-20 relative'>
                <Image
                  src={product.image}
                  alt='cart product'
                  layout='fill'
                  objectFit='cover'
                />
              </div>
          </td>
          <td className=''>
            {product.title} <span>(1kg)</span>
          </td>
          <td>
            {product.price}
          </td>
          <td> 
            <div className='flex items-center text-gray-600 '>
           <button
           disabled={loadingUpdate}
            className='p-2 border border-teal-500 rounded-md bg-teal-300' 
           onClick={() => handleQuantityChange(product.id, product.quantity === 1 ? 1 : product.quantity - 1,"-")}>-</button>
           <span className='p-2'>{loadingUpdate  ? <HashLoader size={10} color="green"/>: `${product.quantity}`}</span>
           <button 
            disabled={loadingUpdate}
           className='p-2 border border-teal-500 rounded-md bg-teal-300' 
            onClick={() => handleQuantityChange(product.id, product.quantity + 1,"+")}>+</button>
           </div>
        </td>
          <td >
            {product.total}
          </td>
         
          <td 
          className='text-red-400 hover:text-red-500 cursor-pointer' 
          onClick={()=> handleDelete(product)}>
            {isLoading ? <HashLoader size={10} color='red'/>:<MdDeleteForever size={20} title='Remove Item'/>}
          </td>
      
          
        </tr>
       ))}
        </tbody>
    </table>
</div>
  )
}

export default CartTableDesktop
