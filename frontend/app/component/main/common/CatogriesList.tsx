import React, { useState } from 'react'
import {motion} from 'framer-motion'
import { FaChevronRight } from 'react-icons/fa'
import { shopByCategory } from '@/app/lib/utils/clientUtils'
import Link from 'next/link'

interface MenuProps {
  setOpenMenu: () => void;
}

const CatogriesList = ({setOpenMenu}:MenuProps) => {
    const [changeChevron, setChangeChevron] = useState<boolean>(false)

  return (
    <div className='p-2 w-full'>
    <div className='flex justify-between items-center ring-1 p-1 rounded-md'
      onClick={() => setChangeChevron(!changeChevron)}>
      <ul className='font-bold text-gray-800 truncate'>All Catogries</ul>
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: changeChevron ? 90 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaChevronRight/>
      </motion.div>
    </div>
    <hr />
    <div>
    {shopByCategory.map((cat) => (
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: changeChevron ? 'auto' : 0,
          opacity: changeChevron ? 1 : 0
        }}
        key={cat.id} className='flex flex-col text-gray-500 mt-2'>
        <Link href={cat.url} onClick={setOpenMenu}>
          {cat.cat}
        </Link>
        <hr />
      </motion.div>
    ))}
    </div>
  </div>
  )
}

export default CatogriesList
