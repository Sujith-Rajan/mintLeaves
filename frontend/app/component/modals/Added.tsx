import React, { useEffect, useState } from 'react'
import { GiCheckMark } from 'react-icons/gi'
import { easeOut, motion} from 'framer-motion'



const Added = () => {
    const [visible, setVisible] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
       
        setVisible(false);
       
      }, 2000);
  
      return () => {
        clearTimeout(timer);
      };
    }, []);
   
  
    if (!visible) {
      return null;
    }
   

  return (
    <motion.div 
    initial={{opacity:1}}
    animate={{opacity:0}}
    transition={{ delay: 0.9, ease:easeOut}}
    className={`w-full bg-[#41c632] rounded-lg px-16 py-1 flex 
    justify-evenly items-center gap-2 text-white text-xs truncate`}>
        <GiCheckMark />
       <p>Added</p>
    </motion.div>
  )
}

export default Added
 