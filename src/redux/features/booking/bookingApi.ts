import { baseApi } from "@/redux/api/baseApi";

const BookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (credentials) => ({
        url: "/bookings",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
    }),
    getUserBookings: builder.query({
      query: () => ({
        url: "/bookings/my-bookings",
        method: "GET",
      }),
    }),
    // updateBooking: builder.mutation({
    //   query: ({ BookingId, ...data }) => ({
    //     url: `/Bookings/${BookingId}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    // deleteBooking: builder.mutation({
    //   query: (BookingId) => ({
    //     url: `/Bookings/${BookingId}`,
    //     method: "DELETE",
    //   }),
    // }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
//   useDeleteBookingMutation,
//   useUpdateBookingMutation,
} = BookingApi;
