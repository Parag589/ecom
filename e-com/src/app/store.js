import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { poApi, homeApi, cartItems, sellerProductsApi } from "../services/post"

export const store = configureStore({
  reducer: {
    [poApi.reducerPath]: poApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [cartItems.reducerPath]: cartItems.reducer,
    [sellerProductsApi.reducerPath]: sellerProductsApi.reducer,
  },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(poApi.middleware, homeApi.middleware, cartItems.middleware, sellerProductsApi.middleware),
    })
    setupListeners(store.dispatch)// enables refetching

 