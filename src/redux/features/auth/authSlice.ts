import { createSlice } from "@reduxjs/toolkit";
import tokenManager from '@/utils/tokenManager';
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
      state.user = user;
      state.token = token;
      console.log('✅ Auth state updated:', { user: user?.name, token: token?.substring(0, 20) + '...' });
      // Sync with tokenManager
      if (token) {
        tokenManager.setTokens(token, 'refresh_token_in_cookie', 3600);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      console.log('🔴 User logged out, state cleared');
      // Clear from tokenManager
      tokenManager.clearTokens();
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      console.log('🔄 Token updated in auth state');
      // Sync with tokenManager
      if (action.payload) {
        tokenManager.updateAccessToken(action.payload, 3600);
      }
    },
  },
});

export const { signIn, logout, updateToken } = authSlice.actions;

export default authSlice.reducer;
