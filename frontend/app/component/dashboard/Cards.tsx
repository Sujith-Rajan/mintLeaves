import React from "react";
import { MdSupervisedUserCircle } from "react-icons/md";

interface CardsProps {
    item: {
        id: number;
        title: string;
        number: number;
        change: number;
    }
}

const Cards:React.FC<CardsProps> = ({ item }) => {
    return (
        <div className='bg-blue-950 opacity-75 p-4 rounded-md flex gap-4 text-white'>
            <MdSupervisedUserCircle />
            <div className='flex flex-col gap-2'>
                <span className=''>{item.title}</span>
                <span className='text-xl'>{item.number}</span>
                <span className='text-sm'>
                    <span className={item.change > 0 ? 'text-green-500': 'text-red-500'}>{item.change}%</span>{" "}
                    {item.change > 0 ? "more" : "less"} than previous week
                </span>
            </div>
        </div>
    );
};

export default Cards;
