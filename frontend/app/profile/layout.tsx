
import React from 'react'
import User from '../component/main/user/User'
import Container from '../component/main/common/Container'

interface Children {
    children:React.ReactNode
}
const layout = ({children}:Children) => {
  return (
    <div className='w-full h-auto'>
    <Container>
      <div className='w-full flex flex-col lg:flex-row bg-gray-50'>
        <User/>
        <div className='w-full lg:w-3/4 flex items-start p-4 border-l-2 '>
          {children}
        </div>
      </div>
    </Container>
    </div>
  )
}

export default layout
