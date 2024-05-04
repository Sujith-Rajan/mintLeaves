import { usePostCartItemMutation, useUpdateItemMutation } from '@/app/redux/cartApi';
import { addProductToCart } from '@/app/redux/cartSlice';
import React from 'react'
import { IconType } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';

interface Product {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  desc?: string;
  image: string;
  price: number;
  stock: number;
  quantityType?: string;
  
}

interface AddToCartProps {
  stock: number;
  bg: string;
  hover: string;
  rounded: string;
  icon: IconType;
  id: string;
  quantity: number;
  products: Product
  setOpenAddedModal: () => void;
  
}

interface CartProduct extends Product {
  productId: string;
  quantity: number;
  total: number;
  userId?: string | undefined;
}

const AddToCart: React.FC<AddToCartProps> = (
  { stock, bg, hover, rounded, icon: Icon, id, quantity, products, setOpenAddedModal }
  ) => {

  const dispatch = useDispatch()

  

  const [postCartItem, { data }] = usePostCartItemMutation();
  
  const[updateCartItem] =useUpdateItemMutation();
  

  const onclick = async (id: string, quantity: number) => {
    
    if (products) {
      const sum = products?.price * quantity;
      const cartProduct: CartProduct = {
        productId:products.id,
        ...products,
        quantity: quantity,
        total:sum ,
  
      };
      dispatch(addProductToCart(cartProduct))
      setOpenAddedModal()

      try {
       
        const result: any = await postCartItem({...products, quantity: quantity, total: sum });
       
        if (result.error && result.error.status === 400) {
          await updateCartItem({
          id: products.id, 
          quantity,
          });
        }
          
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    }
  }

  return (
    <button className={`p-2 flex items-center gap-1 truncate text-white text-sm font-mono ${bg} ${rounded} hover:${hover}`}
      disabled={stock <= 0} onClick={() => onclick(id, quantity)}>
      <Icon />
      Add to Cart
    </button>
  )
}

export default AddToCart
