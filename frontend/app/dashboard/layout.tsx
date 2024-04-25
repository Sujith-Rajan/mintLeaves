
import React from 'react'
import Sidebar from '../component/dashboard/Sidebar'
import Navbar from '../component/dashboard/Navbar'
import Footer from '../component/dashboard/Footer'



interface Children {
    children:React.ReactNode
}
const Layout = ({children}:Children) => {
  
   

  
  
  return (
    <div className='w-full h-auto bg-gradient-to-r from-[#051937] to-[#161633] text-white'>
    <div className="flex">
      <div className='w-1/5 bg-blue-950 opacity-75 p-5'>
        <Sidebar/>
      </div>
      <div className='p-5 w-4/5'>
       <Navbar/>
          {children}
       <Footer/>
      </div>
    </div>
    </div>
  )
}

export default Layout
