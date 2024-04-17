"use client";
import React from "react";
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className='w-full flex justify-between bg-blue-950 opacity-75 items-center p-4 rounded-md'>
            <div className='uppercase'>{pathname.split("/").pop()}</div>
            <div className='flex items-center gap-4'>
                <div className='flex items-center bg-cyan-800 p-2 rounded-lg gap-1' >
                    <MdSearch />
                    <input type="text" placeholder="Search..." className=' bg-cyan-800 outline-none'/>
                </div>
                <div className='flex gap-1'>
                    <MdOutlineChat />
                    <MdNotifications />
                    <MdPublic />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
