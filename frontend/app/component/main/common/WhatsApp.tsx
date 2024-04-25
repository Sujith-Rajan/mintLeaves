
import Link from 'next/link'

import React from 'react'
import { FaWhatsapp } from 'react-icons/fa6'

const WhatsApp = () => {
  return (
    <div className="fixed bottom-16 z-50 bg-teal-900 p-2  flex justify-center rounded-r-full">
    <Link 
    href='//api.whatsapp.com/send?phone=9846522638&text=Hello MintLeaves!' className=''>
        <FaWhatsapp className='text-2xl md:text-3xl lg:text-4xl' color='#25D366' />
  </Link>
  </div>
  )
}

export default WhatsApp
