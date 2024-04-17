import React, { Suspense } from 'react'
import Container from '../common/Container'
import { shopByCategory } from '@/app/lib/utils/clientUtils'
import Image from 'next/image'
import Link from 'next/link'
import { FaLongArrowAltRight } from 'react-icons/fa'

const ShopByCategory = () => {
  return (
    <Container>
        <div className='flex justify-between'>
          <h2 className='uppercase text-gray-700 font-bold'>Shop by Category</h2>
          <Link href={'/products'} className='uppercase text-gray-700 font-bold flex items-center gap-1 hover:text-blue-700 '>
            View All Categories<span><FaLongArrowAltRight/></span>
          </Link>
        </div>
        <Suspense fallback={<div>loding</div>}>
        <article className='grid grid-cols-2 md:grid-cols-4 gap-4 p-4'>
          {shopByCategory.map((category)=>(
          <Link href={category.url} key={category.id} className='border-2 border-gray-200 p-2 rounded-md'>
            <Image src={category.image} width={300} height={400} alt="products category" />
          </Link>
          ))}
        </article>
        </Suspense>
    </Container>
  )
}

export default ShopByCategory
