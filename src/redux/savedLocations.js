import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  names: [],
}

export const savedLocationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.names.push(action.payload)
    },
    deleteLocation: (state, action) => {
      const  id  = state.names.indexOf(action.payload)

      state.names = state.names.filter(item => item !== action.payload)
    }
  },
})

export const { addLocation, deleteLocation } = savedLocationsSlice.actions

export default savedLocationsSlice.reducer
