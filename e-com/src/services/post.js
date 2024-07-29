import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseUrl = "https://jsonplaceholder.typicode.com/"
const baseUri = "http://localhost:5000/"


export const poApi = createApi({
    reducerPath: 'poApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    endpoints: (builder) => ({
      getAllData: builder.query({
        query: () => ({
            url: 'posts',
            method: 'GET'
        })
      }),
    }),
  })
  

  export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
    endpoints: (builder) => ({
      getHomeData: builder.query({
        query: (page) => ({
            url: `products?page=${page}`,
            method: 'GET'
        })
      }),
    }),
  })

  export const cartItems = createApi({
    reducerPath: 'cartItems',
    baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
    endpoints: (builder) => ({
      getCartItems: builder.query({
        query: (id) => ({
            url: `cart/${id}`,
            method: 'GET'
        })
      }),
    }),
  })

  export const sellerProductsApi = createApi({
    reducerPath: 'sellerProductsApi',
    baseQuery: fetchBaseQuery({ baseUrl:baseUri }),
    endpoints: (builder) => ({
      getSellerProducts: builder.query({
        query: () => ({
          url: 'sellerProducts',
          method: 'GET',
        }),
      }),
    }),
  });
  


  export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: baseUri,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('x-auth-token', token);
        }
        return headers;
      }
    }),
    endpoints: (builder) => ({
      getUserData: builder.query({
        query: () => ({
          url: 'user',
          method: 'GET'
        })
      }),
    }),
  })

  export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseUri }),
    endpoints: (builder) => ({
      addToCart: builder.mutation({
        query: (cartData) => ({
          url: 'addToCart',
          method: 'POST',
          body: cartData,
        }),
      }),
      // other endpoints can go here...
    }),
  });



  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetAllDataQuery } = poApi
  export const { useGetHomeDataQuery } = homeApi
  export const { useGetCartItemsQuery } = cartItems
  export const { useGetSellerProductsQuery } = sellerProductsApi;
  export const { useGetUserDataQuery } = userApi;
  export const { useAddToCartMutation } = cartApi;




  
  
  