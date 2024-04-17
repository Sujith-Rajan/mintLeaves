
import React from "react";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";
import Image from "next/image";

 const Rightbar = () => {
    return (
        <div className='flex flex-col gap-8'>
            <div className='bg-blue-950 opacity-75 p-4 rounded-md'>
              
                <div className='flex flex-col gap-2'>
                    <span className='text-yellow-200 text-xl'>🔥 Available Now</span>
                    <h3 className='text-xl'>How to use the new version of the admin dashboard?</h3>
                    <span className=''>Take 4 minutes to learn</span>
                    <p className='text-sm'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                         eaque doloremque nemo neque consectetur voluptas.
                    </p>
                    <button className='flex gap-2 items-center'>
                        <MdPlayCircleFilled/>
                        Watch
                    </button>
                </div>
            </div>
            <div className='bg-blue-950 opacity-75 p-4 rounded-md'>
                <div className='flex flex-col gap-2'>
                    <span className='text-yellow-200 text-xl'>🚀 Comming soon..</span>
                    <h3 className='text-xl'>  New server actions are available, partial pre-rendering is coming
                     up!</h3>
                     <span className=''>Boost your productivity</span>
          <p className='text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit eius libero perspiciatis recusandae possimus.
          </p>
          <button className='flex gap-2 items-center'>
            <MdReadMore />
            Learn
          </button>
                </div>
            </div>
        </div>
    );
};

export default Rightbar