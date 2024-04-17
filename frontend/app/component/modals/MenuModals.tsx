import React, { useState } from 'react'
import { easeIn, easeInOut, motion } from "framer-motion"
import { IoMdClose } from 'react-icons/io'
import Link from 'next/link'
import { FaChevronRight } from 'react-icons/fa'
import CatogriesList from '../main/common/CatogriesList'

interface MenuProps {
  setOpenMenu: () => void;
}

const MenuModals = ({ setOpenMenu }: MenuProps) => {
  const [changeChevron, setChangeChevron] = useState<boolean>(false)

  return (
    <div
      className='w-screen h-screen absolute top-0 left-0
     bg-black bg-opacity-20 xl:hidden z-50'>
      <motion.div
        initial={{ width: "0", opacity: 0 }}
        animate={{ width: "100%", opacity: 1 }}
        transition={{ delay: 0.3, ease:easeIn, withChildren: true }}
        className='max-w-96 h-screen bg-white flex flex-col gap-4 overflow-scroll'>
        <div className='p-4 flex items-center justify-between'>
          <h4 className='text-gray-700 font-bold text-2xl'>Menu</h4>
          <div className='bg-gray-100 p-1 rounded-full hover:bg-gray-300'
            onClick={setOpenMenu}>
            <IoMdClose size={22} />
          </div>
        </div>
        <hr className='text-gray-500' />
        <CatogriesList setOpenMenu={setOpenMenu}/>
      </motion.div>
    </div>
  )
}

export default MenuModals