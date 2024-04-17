import apiRequest from '@/app/lib/apiRequest';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from 'use-debounce';


interface Product {
  id: string;
  title: string;
  image: string;
}

const Search = () => {
  const[searchQuery,setSearchQuery] = useState('')
  const[products,setProducts] = useState<Product[] | undefined>(undefined)

  const handleSearch = useDebouncedCallback ((e) => {
    const query = e.target.value;
    setSearchQuery(query) 
  },200)  
  
  
  
  useEffect(()=>{
    const searchProducts = async() => {
      try{
        const res = await apiRequest.get(`/product/query/${searchQuery}`)
        setProducts(res.data)
      }
      catch(err){
        console.error(err)
      }
     
    }
    searchProducts()
  },[searchQuery])
  
 

  return (
    <div className='w-full relative flex justify-end'>
    <div className='flex gap-2 w-full md:w-2/3 lg:w-1/2 
     bg-white items-center rounded p-1 text-gray-400'>
        <input 
          type="text" 
          placeholder='What can we help you find?' 
          className='p-1 rounded outline-none w-full text-sm' 
          onChange={handleSearch}/>
        <MdSearch size={20} className='cursor-pointer hover:text-gray-500'/>
     </div>
     {products && products.length > 0 && (
     <div className='absolute top-full w-full md:w-2/3 lg:w-1/2
      bg-white shadow-lg items-center rounded p-1 text-gray-400'>
      <ul className='flex flex-col gap-2'>
        {products?.map((product) => (
        <li key={product.id} >
          <Link 
          href={`/product/${product.id}`} 
          className='text-sm text-gray-800 flex gap-1 items-center'>
          <Image 
          src={product.image} 
          alt='search product image' 
          width={50} height={50}></Image>
          <p>{product.title}</p>
          </Link>
        </li>
      ))}
      </ul>
     </div>
    
     )}
     </div>
    
    
    
  )
}

export default Search