import { baseApi } from "@/redux/api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (UserId) => ({
        url: `/users/${UserId}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ UserId, ...data }) => ({
        url: `/users/${UserId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (UserId) => ({
        url: `/users/${UserId}`,
        method: "DELETE",
      }),
    }),
    
  }),
});

export const {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
