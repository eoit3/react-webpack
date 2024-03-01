import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from '@src/reducers'

const isProduction = process.env.NODE_ENV === 'production'
const store = configureStore({
  reducer: rootReducer,
  // middleware: process.env.NODE_ENV !== 'production' ? [logger] : [],
  middleware: getDefaultMiddleware =>
    isProduction ? getDefaultMiddleware() : getDefaultMiddleware().concat(logger)
})

export type RootState = ReturnType<typeof store.getState>
export default store
