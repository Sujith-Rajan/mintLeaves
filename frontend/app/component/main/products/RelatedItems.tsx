"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, {useEffect, useState } from 'react'
import { BiCart } from 'react-icons/bi'
import Added from '../../modals/Added'
import { easeIn, motion } from 'framer-motion'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/navigation';
import AddToCart from '../common/AddToCart'
import { usePathname } from 'next/navigation'
import apiRequest from '@/app/lib/apiRequest'


interface Product {
  id: string;
  image: string;
  title: string;
  price: number;
  stock: number;
  category:string;
  quantityType?: string;
}


interface RealtedITemsProps {
  category:string;
}
const RelatedItems:React.FC<RealtedITemsProps> = ({category}) => {

  const pathname = usePathname()
  const pId = pathname.slice(9)

  const [quantity,setQuantity] = useState<number>(1)
  const [openAddedModal, setOpenAddedModal] = useState<string | undefined>();
  const[products,setProducts] =useState<Product[] | undefined>(undefined);

  useEffect(()=>{
    const getProductsByCategory = async() => {
      try{
        const res = await apiRequest.get(`/product/${category}`)
        const productsData = await res.data
        setProducts(productsData as Product[]);
      }
      catch(error){
        console.log(error)
      }
        

    }
    getProductsByCategory();
},[category])
  
  const filterProduct = products?.filter((product) => product.id !== pId)

  

  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  };

  const onclick = (id: string) => {
    setOpenAddedModal(id)
  }

  return (
    <div className='mt-2 w-full'>
      <div className="swiper-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          breakpoints={breakpoints}
          spaceBetween={20}
          allowTouchMove={true}
          scrollbar={{ draggable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className='flex gap-4 overflow-hidden'>
          {filterProduct?.map((item: Product) => (
            <SwiperSlide key={item.id}>
              <article className='border-2 border-gray-200 p-2 
                  rounded-md flex flex-col items-center justify-center gap-2 relative'>
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
                  <input type="text" placeholder={item.quantityType === 'Number' ? '1No.' : '1Kg'} 
                  className='border border-teal-500 rounded w-12 p-1 text-xs' />
                  <span>Qty:</span>
                  <input type="number" placeholder='1' min={1} className='border border-teal-500 rounded w-10 p-1 text-xs'
                    onChange={(e) => setQuantity(parseInt(e.target.value))}  />
                </div>
                <div className='flex w-full justify-between items-center'>
                  <p className='text-gray-700'>₹{" "}
                    <span className='font-bold text-lg'>
                    {item.price}
                    </span>
                  </p>

                  <AddToCart id={item.id} quantity={quantity} products={item} 
                   setOpenAddedModal={()=>setOpenAddedModal(item.id)}
                  bg={'bg-red-500'} hover={'bg-red-600'} 
                  stock={item.stock} icon={BiCart} rounded={'rounded-3xl'}/>

                </div>
                <div className={`absolute ${item.stock > 0 ? 'bg-green-500' : 'bg-red-500'} rounded-md p-1 top-0 left-0`}>
                <span className='text-white text-xs'>{item.stock > 0 ? "In stock" : "Out of stock"}</span>
                </div>
                <div className='absolute top-1/2'>
                  {openAddedModal === item.id && <Added />}
                </div>
              </article>
            </SwiperSlide>
          ))}
           {!products && <p>Loading products...</p>}
          <div className="swiper-button-prev bg-gray-500 bg-opacity-30 hover:bg-opacity-90
                  p-7 rounded-full z-50 " style={{ color: '#ffff' }}>
          </div>
          <div className="swiper-button-next  bg-gray-400 bg-opacity-30 hover:bg-opacity-90
                  p-7 rounded-full z-50" style={{ color: '#ffff' }}>
          </div>
        </Swiper>

      </div>
    </div>
  )
}

export default RelatedItems
