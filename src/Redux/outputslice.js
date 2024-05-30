import { createSlice } from '@reduxjs/toolkit'

export const outputslice = createSlice({
  name: 'output',
  initialState: {
    value : {}
  },
  reducers: {
    setoutput: (state, action) => {
        state.value = {...action.payload}
    },
  },
})

// Action creators are generated for each case reducer function
export const { setoutput } = outputslice.actions

export default outputslice.reducer