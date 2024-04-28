"use client"
import Container from '@/app/component/main/common/Container'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import Products from '@/app/component/main/products/ProductsByCat'
import apiRequest from '@/app/lib/apiRequest'

interface Product {
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




const ProductsListByCategory= () => {
 
 
  const pathName = usePathname()
  const category  = pathName.split("/").pop() as string

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
 
 
  return (
    <div className='w-full h-auto'>
      <Container>
        <div className='lg:flex justify-between  '>

          <div className='hidden lg:flex lg:flex-col w-1/4'>
            <div className='uppercase'>
              <h2 className=' lg:flex uppercase text-gray-700 font-bold'>Categories</h2>
            </div>
            <div className='flex flex-col gap-2 items-start mt-4  border-2 border-gray-200 rounded-md '>
             {/* <CatogriesList setOpenMenu={setOpenMenu}/> */}
            </div>
          </div>
        
          <div>
            <div>
              <h2 className='uppercase text-gray-700 font-bold'>{category}</h2>
            </div>
          
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 '>
             {products?.map((product) => (
               <Products  key={product.id} item={product}/>
               ))}
            </div>
         
          </div>
    

        </div>
      </Container>
    </div>
  )
}

export default ProductsListByCategory



                
                

