"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { easeIn, motion } from 'framer-motion';
import { BiCart } from 'react-icons/bi';
import Added from '../../modals/Added';
import AddToCart from '../common/AddToCart';
import CartModal from '../../modals/CartModal';



 interface Product {
  item:{ 
  id: string;
  title: string;
  category:string;
  subCategory?:string;
  desc?:string;
  image: string;
  price: number;
  stock: number;
  quantityType?: string;
  }
}



const AllProducts = ({item}:Product) => {
  
    const [quantity,setQuantity] = useState<number>(1)
    const [openAddedModal, setOpenAddedModal] = useState<string | undefined>();
    



  return (
    <>
    
        
        <article key={item.id} className='border-2 border-gray-200 p-2 rounded-md flex 
        flex-col items-center justify-center gap-2 relative'>
          <Link href={`/product/${item.id}`} className='flex flex-col items-center'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ ease: easeIn }}
            >
              <Image src={item.image} width={200} height={180} alt="products category" />
            </motion.div>
            <p className='text-gray-700 font-bold capitalize'>{item.title}</p>
          </Link>
          <div className='flex gap-1 '>
            <input type="text" name='quantiy' placeholder={item.quantityType === 'Number' ? '1No.' : '1Kg'}
             className='border border-teal-500 rounded w-12 p-1 text-xs' />
            <span>Qty:</span>
            <input type="number" placeholder='1' min={1} className='border border-teal-500 rounded w-10 p-1 text-xs'
             onChange={(e) => setQuantity(parseInt(e.target.value))} />
          </div>
          <div className='flex w-full justify-between items-center'>
            <p className='text-gray-700'>₹{" "}<span className='font-bold text-lg'>{item.price}</span></p>

           <AddToCart id={item.id} quantity={quantity} products={item} 
           setOpenAddedModal={()=>setOpenAddedModal(item.id)}
            bg={'bg-red-500'} hover={'bg-red-600'} 
            stock={item.stock} icon={BiCart} rounded={'rounded-3xl'} /> 

          </div>
          <div className={`absolute ${item.stock > 0 ? 'bg-green-500' : 'bg-red-500'} rounded-md p-1 top-0 left-0`}>
            <span className='text-white text-xs'>{item.stock > 0 ? "In stock" : "Out of stock"}</span>
          </div>
          <div className='absolute top-1/2'>
            {openAddedModal === item.id && <Added  />}
          </div>
        </article>
      
    </>
  );
};

export default React.memo(AllProducts);
