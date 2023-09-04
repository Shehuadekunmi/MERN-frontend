import { configureStore } from '@reduxjs/toolkit'
import usersliceReducer from './userslice'
import productslideReducer from './productslide'

export const store = configureStore({
    reducer: {
        user: usersliceReducer,
        product: productslideReducer
    },
  })