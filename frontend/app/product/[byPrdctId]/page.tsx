"use client"
import Container from '@/app/component/main/common/Container'
import ProductListById from '@/app/component/main/products/ProductListById'
import RelatedItems from '@/app/component/main/products/RelatedItems'
import apiRequest from '@/app/lib/apiRequest'
import React, { useEffect, useState } from 'react'

interface Props {
  params: {byPrdctId:string}
}

interface Product {
  id: string;
  title: string;
  category: string;
  subCategory?: string | undefined;
  desc?: string | undefined;
  image: string;
  price: number;
  stock: number;
  quantityType?: string | undefined;
  quantity: number;
}

const ProductById = ({params}:Props) => {
const id = params.byPrdctId;
const[product,setProduct] = useState<Product | undefined>(undefined)

useEffect(()=>{
  const getProducts = async()=> {
  try {  
    const res = await apiRequest.get(`/product/id/${id}`)
    if (!res) {
        throw new Error("No product found with this ID.");
    }
    const productData =await res.data
    setProduct(productData)
    
}
catch(err){
    throw new Error("Failed to fetch product!"+ err)
}
}
getProducts()
},[id])

if (!product) {
  return <div>Loading...</div>; 
}

const category = product.category as string;
 


  return (
    <div className='w-full h-auto'>
      <Container>
        <ProductListById product={product}/>
        <div className='border rounded-md mt-4 flex flex-col items-center justify-center p-4'>
        <h2 className='text-gray-600 text-2xl self-start'>Realted Items</h2>
        <RelatedItems category={category}/>
        </div>
      </Container>
    </div>
  )
}

export default ProductById
