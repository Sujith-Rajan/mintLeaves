"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

interface PaginationProps{
    count: number
}

const Pagination:React.FC<PaginationProps> = ({count}) => {
    const [select,setSelect] = useState(1)
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const {replace} = useRouter()
  
    const page = searchParams.get("page") || 1
  
    const params = new URLSearchParams(searchParams)

    // if(count % 6 == 1 || count % 6 == 2 || count % 6 == 3){
    //     count += 6;
    //   }
    //   const pages = count / 6;

    const pages = Math.ceil(count / 6) 

      const handlePages = (pageNo: number) => {
        params.set("page",String(pageNo))
        replace(`${pathName}?${params}`)
        setSelect(pageNo)
      }

  return (
    <div className='w-full flex gap-1 justify-center'>
         {Array.from({length:pages},(_,index)=> (
      <button key={index} className={`p-1 bg-blue-300 rounded-md text-gray-700 
      ${select == index+1 ? "bg-blue-700 text-white": ""}`}
       onClick={()=>handlePages(index + 1)} 
       >
        {index+1}
        </button>
       ))}
    </div>
  )
}

export default Pagination
