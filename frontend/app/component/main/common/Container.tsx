import React from 'react'

interface ContainerProps {
    children: React.ReactNode;
}

const Container = ({children}:ContainerProps) => {
  return (
    <div className='p-2 mx-4 my-5 md:mx-16 md:my-10 xl:mx-48 xl:my-14'>
        {children}
    </div>
  )
}

export default Container