import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
    const router = useRouter()
  const {currentUser} = useSelector((state:RootState) => state.user)

  useEffect(() => {
   
    if (!currentUser) {
      router.push('/');
    } else if (currentUser.role !== 'ADMIN') {
      router.push('/');
    }
  }, [currentUser, router]);

}



