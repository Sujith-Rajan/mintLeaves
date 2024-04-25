"use client"
import React, { useState } from 'react'
import CatogriesList from '../common/CatogriesList'
import Image from 'next/image'
import { BiCart } from 'react-icons/bi'
import Added from '../../modals/Added'
import AddToCart from '../common/AddToCart'
import { usePathname } from 'next/navigation'
import Link from 'next/link'



interface ProductListByIdProps{
 product:{ 
  id:string;
  title:string;
  category: string;
  subCategory?: string;
  desc?:string
  image:string
  price:number
  stock:number 
  quantityType?:string;
  quantity:number;
 }
}


interface MenuProps{
  setOpenMenu: () => void;
}


const ProductListById = ({product}:ProductListByIdProps,{setOpenMenu}:MenuProps) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [openAddedModal, setOpenAddedModal] = useState<string>()
   
  
    const pathname = usePathname()
    const pId = pathname.slice(9) 
    
    
   

    const handleQuantity = (operation: string) => {
      if (operation === "-") {
        setQuantity(quantity === 1 ? 1 : quantity - 1)
      }
      if (operation === "+") {
        setQuantity(quantity + 1)
      }
    }

    

  return (
    <div className='lg:flex justify-between gap-4 '>

    <div className='hidden lg:flex lg:flex-col w-1/4'>
      <div className='uppercase'>
        <h2 className=' lg:flex uppercase text-gray-700 font-bold'>Categories</h2>
      </div>

      <div className='flex flex-col gap-2 items-start mt-4  border-2 border-gray-200 p-4 rounded-md w-full'>
        <CatogriesList  setOpenMenu={setOpenMenu}/>
      </div>
    </div>

    <div className='grid gap-8 grid-cols-1 md:grid-cols-2'>
      <div className='p-4 relative'>
        <Image src={product.image} alt='single product'
         width={500} height={300} className='aspect-square'/>
        <div className={`absolute ${product.stock > 0 ? " bg-green-500" : "bg-red-500"}
         rounded-md p-1 top-0 right-0`}>
          <span className='text-white text-xs'>{product.stock > 0 ? "In Stock" : "Out of stock"}</span>
        </div>
      </div>
      <div className='border-2 border-gray-200 rounded-lg p-4 flex flex-col gap-4'>
        <h2 className='text-gray-700 capitalize text-xl md:text-2xl'>{product.title}</h2>
        <div>
          <h3>MRP:<span className='text-lg text-green-600'>{" "}₹{product.price}</span></h3>
          <span className='text-xs text-gray-400'>(Inclusive all taxes)</span>
        </div>
        <div className='flex items-center gap-2 '>
        {product.quantityType === 'Kg' && 
        <>
          <span>Size:</span><input type="text" placeholder='1Kg'
          className='border border-teal-500 rounded w-12 p-2 text-xs' />
          </>
        }
          <span>Qty:</span>
          <div className='flex items-center text-gray-600 '>
            <button className='p-2 border border-teal-500 rounded-md bg-teal-300'
             onClick={() => handleQuantity("-")}>-</button>
            <span className='p-2'>{quantity}</span>
            <button className='p-2 border border-teal-500 rounded-md bg-teal-300'
             onClick={() => handleQuantity("+")}>+</button>
          </div>
         
        </div>
        <div>
          {openAddedModal && <Added />}
        </div>
        <div>

          {openAddedModal ?
             <Link href={`/cart`} className='bg-black text-white text-sm 
          rounded p-2 flex items-center gap-1 truncate justify-center'>
              View Cart
            </Link> 
             : 
            <AddToCart id={product.id} quantity={quantity} products={product} 
            setOpenAddedModal={()=>setOpenAddedModal(product.id)}
            bg={'bg-teal-500'} hover={'bg-teal-600'} 
            stock={product.stock} icon={BiCart} rounded={'rounded'}/>
          }

        </div>
          <hr />
          {product.desc &&
        <div className='flex flex-col gap-4'>
          <h4 className='text-gray-600 text-xl'>Overview</h4>
          <p className='text-gray-500 text-sm '>{product.desc}</p>
        </div>
        }
      </div>
    </div>
  </div>
  )
}

export default ProductListById
