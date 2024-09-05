import { createSlice } from "@reduxjs/toolkit";
export interface TUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  isDeleted: boolean;
}
type TAuthState = {
  user: null | TUser;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      const { user, token } = action.payload;
      state.user = user ;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { signIn, logout } = authSlice.actions;

export default authSlice.reducer;
