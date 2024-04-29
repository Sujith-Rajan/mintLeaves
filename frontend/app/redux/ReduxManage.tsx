"use client"
import React, { useEffect } from 'react'
import { useDeleteExpiredMutation, useGetCartItemQuery } from './cartApi';
import { useDispatch} from 'react-redux';
import { addProductToCart } from './cartSlice';


type Props = {
  children: React.ReactNode;
}

const ReduxManage = ({ children }: Props) => {

  const dispatch = useDispatch()
  const { data: cartItems } = useGetCartItemQuery({});
  const [deleteCartItemExpired] = useDeleteExpiredMutation()
  
    
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item: any) => {
        dispatch(addProductToCart(item));
      });
    }
     deleteCartItemExpired({})
  }, [cartItems, dispatch,deleteCartItemExpired]);

  return (
    <div>
      {children}
    </div>
  )
}

export default ReduxManage
