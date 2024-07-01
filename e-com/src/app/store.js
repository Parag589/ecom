import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { poApi, homeApi } from "../services/post"

export const store = configureStore({
  reducer: {
    [poApi.reducerPath]: poApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(poApi.middleware, homeApi.middleware),
    })
    setupListeners(store.dispatch)// enables refetching

 