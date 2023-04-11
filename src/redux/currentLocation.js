import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: '',
}

export const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState,
  reducers: {
    updateCurrentLocation: (state, action) => {
      state.location = action.payload
      console.log(state.location)
    }
  },
})

export const { updateCurrentLocation } = currentLocationSlice.actions

export default currentLocationSlice.reducer
