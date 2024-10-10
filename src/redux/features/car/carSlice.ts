import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    availableCars: null,
};
const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setAvailableCars: (state, action) => {
      const  cars = action.payload;
      state.availableCars = cars ;
    },
    clearCars: (state) => {
        state.availableCars = null ;
    },
  },
});

export const { setAvailableCars, clearCars } = carSlice.actions;

export default carSlice.reducer;
