/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_BASEURL,
//     credentials: "include",
//     prepareHeaders: (headers, { getState }) => {
//       const token = (getState() as RootState).auth.token;
//       if (token) {
//         headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["car", "user","booking","review"],
//   endpoints: () => ({}),
// });
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { store } from "../store"; // Assuming you have the store exported from store file
import { logout } from "../features/auth/authSlice";

// A wrapper around fetchBaseQuery to handle JWT expiration
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASEURL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await baseQuery(args, api, extraOptions);
  // Handle JWT expiration globally
  if (result.error && result.error.status === 500) {
    // Check if the error object has the expected structure
    const errorData = result.error.data as { message?: string };

    if (errorData?.message === "jwt expired") {
      // Logout the user and clear the token
      store.dispatch(logout());

      // Optionally redirect to login page
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth, // Use the custom baseQuery with JWT expiration handling
  tagTypes: ["car", "user", "booking", "review"],
  endpoints: () => ({}),
});
