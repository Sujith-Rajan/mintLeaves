import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <Link href={'/'}>
      <Image src="/logo/page-not-found.svg" width={500} height={500} alt='page not found' ></Image>
      </Link>
     
    </div>
  )
}

export default NotFound
