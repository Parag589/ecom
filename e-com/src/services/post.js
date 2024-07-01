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
  // Export hooks for usage in functional components, which are
  // auto-generated based on the defined endpoints
  export const { useGetAllDataQuery } = poApi
  export const { useGetHomeDataQuery } = homeApi
  export const { useGetCartItemsQuery } = cartItems



  
  
  