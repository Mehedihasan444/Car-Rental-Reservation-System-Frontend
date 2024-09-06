import { createSlice } from "@reduxjs/toolkit";
export interface TBookingInfo {
  _id: string;
  name: string;
  type: string;
  pricePerHour: number;
  status: string;
  engineType: string;
  description: string;
  isDeleted: boolean;
  features: string[];
  images: string[];
  brand: string;
  model: string;
  fuelType: string;
  transmission: string;
  seatingCapacity: number;
  color: string;
  noOfDoors: number;
  year: number;
  insurance?: boolean;
  gps?: boolean;
  childSeat?: boolean;
}
type TBookingInfoState = {
  bookingInfo: null | TBookingInfo;
};

const initialState: TBookingInfoState = {
    bookingInfo: null,

};
const bookingInfoSlice = createSlice({
  name: "bookingInfo",
  initialState,
  reducers: {
    setInfo: (state, action) => {
        state.bookingInfo = action.payload;
    },
    clearInfo: (state) => {
        state.bookingInfo = null;
    },
  },
});

export const { setInfo, clearInfo } = bookingInfoSlice.actions;

export default bookingInfoSlice.reducer;
