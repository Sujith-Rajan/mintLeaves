
import React from "react";
import { cards } from "../lib/utils/adminUtils";
import Rightbar from "../component/dashboard/Rightbar";
import Cards from "../component/dashboard/Cards";



const Dashboard = () => {

    
    return (
        <div className='flex w-full mt-4 gap-8'>
            <div className=' w-4/6'>
                <div className='flex gap-4'>
                    {cards.map((item) => (
                        <Cards key={item.id} item={item} />
                    ))}
                </div>
            </div>
            <div className='w-2/6'>
                <Rightbar/>
            </div>
        </div>
    );
};

export default Dashboard;
