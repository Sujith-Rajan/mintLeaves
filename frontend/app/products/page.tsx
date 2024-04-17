"use client"
import Container from '@/app/component/main/common/Container'
import React, { Suspense, useEffect, useState } from 'react'
import AllProducts from '../component/main/products/AllProducts'
import apiRequest from '../lib/apiRequest'
import Loading from '../loading'

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

const ProductsListByCategory = () => {
  const[products,setProducts] =useState<Product[] | undefined>(undefined);
  useEffect(()=>{
    const getAllProducts = async() => {
      try{
        const res = await apiRequest.get('/product')
        const productsData = await res.data
        setProducts(productsData as Product[]);
      }
      catch(error){
        console.log(error)
      }
        

    }
    getAllProducts();
},[])
 
  
  return (
    <div className='w-full h-auto'>
      <Container>
      
          <div>
            <div>
              <h2 className='uppercase text-gray-700 font-bold'>All Products</h2>
            </div>
          
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 '>
              {products?.map((product)=>(
              <Suspense key={product.id} fallback={<p>loading</p>}>
              <AllProducts  item={product}/>
              </Suspense>
              ))}
            </div>
         
          </div>
    

      
      </Container>
    </div>
  )
}

export default ProductsListByCategory



                
                

