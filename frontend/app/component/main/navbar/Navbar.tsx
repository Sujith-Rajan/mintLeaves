"use client"
import React, { useEffect, useState } from 'react'
import Search from '../common/Search'
import Avatar from '../common/Avatar'
import { IoIosMenu } from 'react-icons/io';
import MenuModals from '../../modals/MenuModals'
import { usePathname } from 'next/navigation'
import Logo from '../common/Logo'
import ProfileModal from '../../modals/ProfileModal'
import { MdArrowDropDown } from 'react-icons/md'
import CatogriesModal from '../../modals/CatogriesModal'
import Cart from '../common/Cart';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';
import CartModal from '../../modals/CartModal';




const Navbar = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    const[openCatModal,setOpenCatModal] = useState<boolean>(false)
    const [openProfileModal, setOpenProfileModal] = useState<boolean>(false)
   const [myCart,setMyCart] = useState<boolean>(false)
    const pathName = usePathname()
     
    const {currentUser} = useSelector((state:RootState) => state.user)
    const {products} = useSelector((state:RootState) => state.cart)

    useEffect(() => {
        if (products.length > 0) {
            setMyCart(true);
        }
    }, [products])

    

    return (
        <>
        {pathName.substring(1).slice(0,9) !== 'dashboard' &&
        <div className='sticky top-0 w-full h-32 md:h-16 bg-gradient-to-r
        from-[#0F3443] to-[#34E89E] flex flex-col justify-center z-50'>
            <div className='flex items-center justify-between p-2 sm:p-4 
                    md:p-6 lg:p-8 xl:p-10 relative'>
                <button className='text-white text-3xl flex lg:hidden md:mr-4'
                    onClick={() => setOpenMenu(true)}>
                    <IoIosMenu />
                </button>
                <div className=''>
                    <Logo width={100} height={20}/>
                </div>
                {!pathName.substring(1) && 
                <div className='hidden lg:flex  lg:w-1/3 truncate  justify-center relative'>
                     <button className='text-white text-sm flex items-center gap-2
                      hover:bg-emerald-700 hover:bg-opacity-15 p-4 rounded' 
                     onMouseEnter={()=>setOpenCatModal(true)} onMouseLeave={()=>setOpenCatModal(false)} >
                        Shop By Category<MdArrowDropDown />
                        </button>
                </div>
                }
                
                
                <div className='hidden w-full md:flex justify-end flex-grow'>
                    <Search />
                </div>
               
              
                <div className='md:w-1/2 lg:w-1/6 flex justify-center gap-1'>
                    <div  onClick={()=>setOpenProfileModal(!openProfileModal)}>
                    <Avatar />
                    </div>
                    <Cart/>
                </div>
                   
               
            </div>
           
            <div className='flex justify-center md:hidden self-center w-full p-2'>
                <Search />
            </div>
           
            {myCart && pathName.substring(1).slice(0,9).startsWith('products')  && <CartModal setMyCart={()=>setMyCart(false)}/>}
            {openMenu && <MenuModals setOpenMenu={() => setOpenMenu(false)} />}
            {openProfileModal && currentUser && <ProfileModal setOpenProfileModal={()=>setOpenProfileModal(false)}/>}
            {openCatModal && <CatogriesModal setOpenCatModal={setOpenCatModal}/> }
            
            
        </div>
        
            } 
            
            </>
    )
}

export default Navbar