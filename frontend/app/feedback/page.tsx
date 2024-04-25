"use client"
import React, { useEffect, useRef, useState } from 'react'
import Container from '../component/main/common/Container'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from 'react-icons/io'
import apiRequest from '../lib/apiRequest'
import { HashLoader } from 'react-spinners'
import useSWR from 'swr'
import { User } from '../lib/types'
import { FaStar } from 'react-icons/fa6'



interface FeedbackProps{
    id:string;
    user:User;
    rating:number;
    ratingCount:number;
    subject:string;
    comment:string;
}

const Feedback = () => {
    const[subject,setSubject] = useState<string>()
    const[comment,setComment] = useState<string>()
    const[feedbacks,setFeedbacks] = useState<FeedbackProps[]>()
    const [error,setError] = useState<string>()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    
    const [selectStar,setSelectStar] = useState<number>(0)

    const feedRef = useRef<HTMLDivElement | null>(null)
    

    const{currentUser} = useSelector((state:RootState) => state.user)
    const{data:feedbacksData,mutate} = useSWR("/feedback")

    useEffect(() => {
      getAllFeedback()
      setFeedbacks(feedbacksData);
    }, [feedbacksData]);
  
    const getAllFeedback = async () => {
      const res = await apiRequest.get('/feedback/all-feedbacks');
      setFeedbacks(res.data);
    };


    const handlePost = async() => {
     try {
            setIsLoading(true)
            if(!subject){
                setIsLoading(false)
                return setError("Subject is missing")
            }else if(!comment){
                setIsLoading(false)
                return setError("Comment is missing")
            }
            setError("")
            const data = {
                userId: currentUser?.id,
                subject,
                comment
            }

            const res = await apiRequest.post("/feedback",data)
            if(res.data){
                mutate([...(feedbacks || []), res.data], false);
                setSubject('');
                setComment('');
                if (feedRef.current) {
                  feedRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }
           
     }
     catch(err){
            console.log(err)
     }
     finally {
        setIsLoading(false);
    }
    }



  return (
    <div className='w-full h-auto'>
      <Container>
      
        <h1 className='text-gray-600 text-2xl mb-4' ref={feedRef}>Feedbacks</h1>
        <div className='p-4 flex flex-col gap-6' >
        <div className='max-h-screen overflow-y-auto' >
            <div className='flex flex-col gap-5'>
                {feedbacks && feedbacks.map((feedback:FeedbackProps) => (
                <div className='flex gap-4 items-center' key={feedback.id}>
                    <Image src={feedback.user.avatar ?feedback.user.avatar : '/logo/avatar.png'} alt='user image' width={40} height={40}></Image>
                    <div>
                    <h4 className='font-bold'>{feedback.subject}</h4>
                    <h5 className='text-gray-500 text-sm font-thin italic'>By {feedback.user.fullname} <span>22-04-2024</span> </h5>
                    <div className='flex gap-4 items-center'>
                      <div className='flex gap-1'>
                    {
                      [...Array(5)].map((star, index) => {
                        const currentRating = index + 1;
                        return(
                      <label htmlFor="" key={index} className='relative'>
                     <FaStar 
                      onMouseEnter={()=> setSelectStar(index + 1  )}
                      // onMouseLeave={()=> setSelectStar(0)}
                      onClick={() => setSelectStar(index + 1)}
                     className={` cursor-pointer 
                     ${
                      index < selectStar ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                     
                      />
                    </label>
                        )
                      })
                    }
                    </div>
                    <span className='text-gray-600 text-xs'>&#9733;{feedback.rating / feedback.ratingCount}</span>
                    </div>
                    <p className='text-sm text-gray-800'>{feedback.comment}</p>
                    </div>
                    
                </div>
               ))}
            </div>
        </div>
        <hr />
        {currentUser 
        && 
        <div className='flex flex-col gap-2'>
            <h2>Comment</h2>
            <input
              type="text"
              value={subject}
              className='border border-gray-500 w-full outline-none p-2 rounded-md' 
              placeholder='Subject'
              onChange={(e) => setSubject(e.target.value)}
              />
            <textarea
             name="" id=""  rows={10} 
             className='border border-gray-500 w-full outline-none p-2 rounded-md' 
             placeholder='Type your feedback...'
             value={comment}
             onChange={(e) =>setComment(e.target.value)}
             ></textarea>
             {error && <p className='text-red-700 text-sm'>*{error}</p>}
            <button 
            disabled={isLoading}
            className='bg-teal-600 text-white p-2 rounded-md w-48 flex justify-center '
            onClick={handlePost}
            >
               {isLoading ? <HashLoader size={20} color='#ffff'/> : "POST" } 
            </button>
        </div>
        }
        </div>
      </Container>
    </div>
  )
}

export default Feedback
