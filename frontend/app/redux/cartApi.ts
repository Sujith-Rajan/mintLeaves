import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
     baseUrl:`${process.env.NEXT_PUBLIC_BASE_URL}/api`,
     credentials: 'include',
     }), 

  endpoints: (builder) => ({
    postCartItem: builder.mutation({
      query: (item) => ({
        url: '/cart',
        method: 'POST',
        body: item,
      }),
    }),
    getCartItem:builder.query({
        query: () => ({
          url:`/cart`,
          method:'GET',
        })
    }), 
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart', 
        method: 'DELETE',
      })
  }),
  deleteItem: builder.mutation({
    query:(id) => ({
      url: `/cart/${id}`,
      method: 'DELETE'
    })
  }),
  updateItem: builder.mutation({
    query:({id,quantity}) => ({
      url:`/cart/${id}`,
      method: `PUT`,
      body:{quantity},
    })
  }),
  addUserInCart: builder.mutation({
    query:() => ({
      url:`/cart/user/user-add`,
      method:'PUT',
    })
  }),
  deleteExpired: builder.mutation({
    query:() => ({
      url:"/cart/remove-expired",
      method:"DELETE"
    })
  })
})
});

export const { 
  usePostCartItemMutation,
  useGetCartItemQuery,
  useClearCartMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useAddUserInCartMutation,
  useDeleteExpiredMutation
} = cartApi;
