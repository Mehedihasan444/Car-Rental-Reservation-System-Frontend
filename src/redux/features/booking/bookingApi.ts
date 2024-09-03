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
    updateBooking: builder.mutation({

      query: ({ bookingId, ...data }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteBooking: builder.mutation({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} = BookingApi;
