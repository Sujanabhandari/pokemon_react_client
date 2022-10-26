import { createSlice, configureStore } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    value: true
  },
  reducers: {
    toggled: state => {
      state.value = !state.value
    },
  }
})

export const { toggled } = loaderSlice.actions

export const store = configureStore({
  reducer: loaderSlice.reducer
})

