import { createAsyncThunk, 
        createSlice,
         PayloadAction, 
          } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { useGetCartItemQuery } from "./cartApi";

interface Product {
  id: string;
  productId?:string;
  title: string;
  image: string;
  price: number;
  userId?:string;

}

interface CartProduct extends Product {
  quantity: number;
  total: number;
}

interface CartState {
  products: CartProduct[];
  subtotal: number;
  
}

const initialState: CartState = {
  products: [],
  subtotal: 0,
 
};

export const fetchCartItems = createAsyncThunk<CartProduct[],string | void, { state: RootState }>(
  'cart/fetchCartItems',
  async (_, { getState }) => {
    try {
      const { data: cartItems } = await useGetCartItemQuery({ });
     
      if (cartItems && cartItems.length > 0) {
        return cartItems;
      }
      return [];
    } catch (error) {
      throw error;
    }
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartProduct>) => {
      // when data fetch from db _id will be change to productId ,so here match title
      const { products } = state;
      const existProductIndex = products.findIndex(
        (product) => product.title === action.payload.title
      );
      if(existProductIndex !== -1){
        state.products[existProductIndex].quantity += action.payload.quantity;
        state.subtotal += action.payload.price * action.payload.quantity;
        state.products[existProductIndex].total += action.payload.price;
      }
      else{
        state.products.push(action.payload);
        state.subtotal += action.payload.price * action.payload.quantity;
      }
     
      
    },
      updateProductQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
        const { productId, quantity } = action.payload;
        const existingProduct = state.products.find((product) => product.id === productId);
        if (existingProduct) {
          state.subtotal -= existingProduct.total;
          existingProduct.quantity = quantity;
          existingProduct.total = existingProduct.price * quantity;
          state.subtotal += existingProduct.total;
        }
      },
    clearCart: (state) => {
        state.products = [];
        state.subtotal = 0;
      },
      deleteOne: (state, action: PayloadAction<CartProduct>) => {
        const deletedProduct = state.products.find((product) => product.id === action.payload.id);
        if (deletedProduct) {
          state.subtotal -= deletedProduct.total;
          state.products = state.products.filter((product) => product.id !== action.payload.id);
        }
        return state
      },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchCartItems.rejected, (state, action) => {
      console.error("Failed to fetch cart items:", action.error.message);
     
    });
  },
});

export const { addProductToCart,clearCart,deleteOne,  updateProductQuantity } = cartSlice.actions;
export default cartSlice.reducer;
