import Image from 'next/image'
import React from 'react'
import Logo from '../common/Logo'

const Tagline = () => {
  return (
    <div className='h-full flex flex-col gap-2 items-center'>
      <div>
        <Logo width={200} height={50}/>
      </div>
      <div>
        <span className='text-gray-800 font-bold truncate'>Expect More. Pay Less.</span>
        </div>
        <div className='w-full h-full relative'>
            <Image src="/aisleHomeBg.png" width={500} height={200} objectFit='cover' alt='home page image'></Image>
        </div>
    </div>
  )
}

export default Tagline