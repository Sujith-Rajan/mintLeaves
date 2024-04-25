"use client"
import SingleProductUpdate from '@/app/component/dashboard/SingleProductUpdate'
import apiRequest from '@/app/lib/apiRequest'
import React, { useEffect, useState } from 'react'

interface Product{

    id:string
    title: string
    price: number
    stock: number
    desc?: string
    image: string
    category: string
    subCategory?: string
    quantityType: string
  
}

interface UpdateProductProps{
  params:{id:string}
}

const UpdateProduct =({params}:UpdateProductProps) => {
  const {id} = params
  const [product,setProduct] = useState<Product>({
    id:'',
    title:'',
    price:0,
    stock:0,
    desc: '',
    image: '',
    category: '',
    subCategory: '',
    quantityType: '',
  }
  )
  useEffect(()=> {
    const getProduct = async () => {
      try{
        const res = await apiRequest.get(`/admin-dashboard/product/${id}`)
        setProduct(res.data.product) 
       
    }
    catch(err){
      console.log(err)
      throw new Error("Failed to fetch products!"+ err)     
  }
    }
    getProduct()
  },[id])

  return (
    <div>
      <SingleProductUpdate product={product}/>
    </div>
  )
}

export default UpdateProduct
