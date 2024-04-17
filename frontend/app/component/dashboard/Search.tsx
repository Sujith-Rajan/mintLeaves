"use client"
import React from 'react'
import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce'

interface SearchProps {
    placeholder: string
}

const Search:React.FC<SearchProps> = ({placeholder}) => {
    
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const {replace} = useRouter()
  
  
  
  const handleSearch = useDebouncedCallback ((e) => {
   
    const params = new URLSearchParams(searchParams)
    params.set("page",'1')  
    if(e.target.value){
      
    e.target.value.length && params.set("q",e.target.value)
    }
    else{
      params.delete("q")
    }
    replace(`${pathName}?${params}`)
  },400)
    
        

  return (
    <div className="flex gap-2 items-center bg-cyan-900 p-2 rounded-md">
      <MdSearch/>
      <input type="text" placeholder={placeholder} className="p-2 bg-cyan-900 outline-none"
      onChange={handleSearch}
      />
    </div>
  )
}

export default Search
