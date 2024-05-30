import { configureStore } from '@reduxjs/toolkit'
import outputReducer from './outputslice'

export default configureStore({
  reducer: {
    output: outputReducer,
  },
})