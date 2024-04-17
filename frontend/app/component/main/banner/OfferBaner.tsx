import React from 'react'
import Container from '../common/Container'
import Image from 'next/image'

const OfferBaner = () => {
  return (
    <Container>
        <div className='w-full h-16 sm:min-h-32 md:h-52 xl:h-60 relative'>
            <Image src="/offer.jpg" alt='offer banner' layout='fill' />
        </div>
    </Container>
  )
}

export default OfferBaner
