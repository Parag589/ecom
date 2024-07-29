import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { poApi, homeApi, cartItems, sellerProductsApi, userApi, cartApi } from "../services/post"

export const store = configureStore({
  reducer: {
    [poApi.reducerPath]: poApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [cartItems.reducerPath]: cartItems.reducer,
    [sellerProductsApi.reducerPath]: sellerProductsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [userApi.cartApi]: cartApi.reducer,


  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(poApi.middleware, homeApi.middleware, cartItems.middleware, sellerProductsApi.middleware, userApi.middleware, cartApi.middleware),
    })
    setupListeners(store.dispatch)// enables refetching

 