import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface LogoProps {
    width:number;
    height:number;
}

const Logo = ({width,height}: LogoProps) => {
  return (
    <Link href="/" className='md:w-1/2 lg:w-1/12'>
                    <Image src="/logo/logo.png" alt="logo" width={width} height={height}></Image>
                </Link>
  )
}

export default Logo
