"use client"
import React, { useEffect } from 'react'
import { useDeleteExpiredMutation, useGetCartItemQuery } from './cartApi';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, fetchCartItems } from './cartSlice';
import { RootState } from './store';

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
