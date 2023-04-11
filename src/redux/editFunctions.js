import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  temp: 'temp_f',
  showEdit: false
}

export const editFunctionsSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    changeToCelsius: (state) => {
      state.temp = 'temp_c'
      state.showEdit = false
    },
    changeToFahrenheit: (state) => {
      state.temp = 'temp_f'
      state.showEdit = false
    },
    toggleEdit: (state) => {
      state.showEdit = !state.showEdit
      console.log(state.showEdit)
    }

  },
})

export const { changeToCelsius, changeToFahrenheit, toggleEdit } = editFunctionsSlice.actions

export default editFunctionsSlice.reducer
