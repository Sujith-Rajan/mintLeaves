"use client"
import { useDeleteItemMutation, useUpdateItemMutation } from '@/app/redux/cartApi'
import { deleteOne, updateProductQuantity } from '@/app/redux/cartSlice'
import { RootState } from '@/app/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdClose, MdDeleteForever } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { HashLoader } from 'react-spinners'

interface CartProps{
  setMyCart: () => void;
}

const CartModal = ({setMyCart}:CartProps) => {

  const dispatch = useDispatch()
  const {products,subtotal} = useSelector((state:RootState) => state.cart)
  
  const shipping= 30;
  const [updatCart,{isLoading:loadingUpdate}] = useUpdateItemMutation()
  const [deleteItem, { isLoading }] = useDeleteItemMutation();

  

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
    <div className='hidden xl:block absolute max-h-screen bg-white shadow-neutral-700 shadow-md p-3 w-2/12 top-full right-0'>
      <div className='flex justify-between w-full'>
      <h1 className='text-gray-700'>My Cart</h1>
      <MdClose className='hover:text-red-600' onClick={setMyCart}/>
      </div>
      <hr />
      <div className='max-h-96 overflow-y-scroll'>
      {products.map((product) => (
      <div key={product.id} className='flex gap-2 mt-2'>
        <div>
          <Image src={product.image} alt="cart image" width={50} height={40}></Image>
        </div>
        <div>
          <h1 className='text-sm truncate w-28 font-semibold text-gray-800'>{product.title}</h1>
          <div className='flex items-center text-gray-600 '>
           <button
           disabled={loadingUpdate}
            className='p-1 border border-teal-500 rounded-md bg-teal-300 text-xs' 
           onClick={() => handleQuantityChange(product.id, product.quantity === 1 ? 1 : product.quantity - 1,"-")}>-</button>
           <span className='p-1 text-xs'>{loadingUpdate  ? <HashLoader size={10} color="green"/>: `${product.quantity}`}</span>
           <button 
            disabled={loadingUpdate}
           className='p-1 border border-teal-500 rounded-md bg-teal-300 text-xs' 
            onClick={() => handleQuantityChange(product.id, product.quantity + 1,"+")}>+</button>
           </div>
        </div>
        <div>
        <h1 className='text-sm font-bold'>	&#8377; {product.price}</h1>
        <div
          className='text-red-400 hover:text-red-500 cursor-pointer' 
          onClick={()=> handleDelete(product)}>
            {isLoading ? <HashLoader size={10} color='red'/>:<MdDeleteForever size={15} title='Remove Item'/>}
          </div>
        </div>
      </div>
      ))}
      </div>
      <div className='flex flex-col gap-4 mt-2'>
      <div className='bg-gray-200 flex flex-col gap-4 p-2'>
        <div className='w-full flex justify-between text-gray-800'>
          <h1>Subtotal</h1>
          <h1>&#8377;{subtotal}.00</h1>
        </div>
        <div className='w-full flex justify-between  text-gray-800'>
          <h1>Shipping</h1>
          <h1>&#8377;{shipping}</h1>
        </div>
        <div className='w-full flex justify-between font-bold'>
          <h1>Total</h1>
          <h1>&#8377;{subtotal+shipping}.00</h1>
        </div>
      </div>
      <div className='flex flex-col gap-3 justify-center'>
        <Link href={"/cart"} className='bg-black text-white flex justify-center p-2 rounded '>View Cart</Link>
        <Link href={"/checkout"} className='bg-teal-600 text-white flex justify-center p-2 rounded '>Checkout</Link>
      </div>
      </div>
    </div>
    
  )
}

export default CartModal
