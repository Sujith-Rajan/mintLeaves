"use client"
import Container from '../component/main/common/Container'
import { MdDeleteForever, MdOutlineShoppingCart } from 'react-icons/md'
import CartTableDesktop from '../component/main/cartTable/CartTableDesktop'
import CartTableMobile from '../component/main/cartTable/CartTableMobile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { clearCart } from '../redux/cartSlice'
import { useClearCartMutation } from '../redux/cartApi'
import Link from 'next/link'
import { FaLongArrowAltRight } from 'react-icons/fa'
import {HashLoader} from 'react-spinners'



const Cart = () => {
  
  const dispatch = useDispatch()
  const {subtotal} = useSelector((state:RootState)=>state.cart)
  
  const [clearCartMutation,{isLoading}] = useClearCartMutation();
  
  const handleClearCart= async () => {
    try {
      await clearCartMutation({});
      dispatch(clearCart());
    } catch (error) {
      console.error('Error clearing cart:', error);
    }

  }
  

  return (
    <div className='w-full h-auto'>
      {
      subtotal 
      ? 
      <Container>
        <CartTableDesktop />
        <CartTableMobile />

        <div className='w-full'>
          <table className='w-full text-gray-600 flex flex-col gap-2'>
            <tbody> 
              <tr className='flex gap-2 bg-gray-100 p-4 justify-end'>
                <td><span>Sub Total (tax incl.)</span></td>
                <td><span>₹{subtotal}.00</span></td>
              </tr>
              <tr className='flex gap-2 bg-gray-100 p-4 justify-end'>
                <td><span>Delivery Charge</span></td>
                <td><span>₹30</span></td>
              </tr>
              <tr className='flex gap-2 bg-gray-100 p-4 justify-end text-black font-bold'>
                <td><span>Total</span></td>
                <td><span className='text-red-600'>₹{subtotal + 30}.00</span></td>
              </tr>
              <tr className='flex gap-2 bg-gray-100 p-4 justify-end'>
                <td><span>Coupon Discount</span></td>
                <td><span>₹-0.00</span></td>
              </tr>
              <tr className='flex gap-2 bg-teal-600 hover:bg-teal-700 p-4 text-white cursor-pointer w-full'>
                <td colSpan={2} className='w-full'>
                  <Link href={"/checkout"} className='w-full flex justify-between'>
                    <div className='uppercase flex items-center gap-2'>
                      <MdOutlineShoppingCart />
                      Proceed to checkout
                    </div>
                    <div>
                      <span className='font-bold'>₹{" "}{subtotal + 30}</span>
                    </div>
                  </Link>
                </td>
              </tr>
              <tr 
              className='flex gap-2 items-center bg-red-400 hover:bg-red-500 
              text-white w-28 rounded justify-center cursor-pointer mt-2' >
                <td colSpan={2} >
                 <button 
                 disabled={isLoading}
                 onClick={handleClearCart}
                 className='flex gap-1 items-center'> 
                 {isLoading ? <HashLoader size={20} color='#ffff'/> :<> <MdDeleteForever /> <span>Clear Cart</span></>}
                
                 </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
      :
      <div className='flex flex-col justify-center items-center h-screen'>
      <p className='text-3xl text-gray-500 text-center'>Your cart is currently empty.</p>
      <Link href={`/products`} className='flex items-center gap-1 text-blue-500 hover:text-blue-800'>
        Go to products<span><FaLongArrowAltRight/></span>
      </Link>
      </div>
      }
    </div>
  )
}

export default Cart
