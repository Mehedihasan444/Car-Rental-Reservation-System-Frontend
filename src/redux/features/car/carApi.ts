import { baseApi } from "@/redux/api/baseApi";

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
    }),
    getAllCars: builder.query({
      query: () => ({
        url: "/cars",
        method: "GET",
      }),
    }),
    getCar: builder.query({
      query: (carId) => ({
        url: `/cars/${carId}`,
        method: "GET",
      }),
    }),
    updateCar: builder.mutation({
      query: ({ carId, ...data }) => ({
        url: `/cars/${carId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteCar: builder.mutation({
      query: (carId) => ({
        url: `/cars/${carId}`,
        method: "DELETE",
      }),
    }),
    returnCar: builder.mutation({
      query: () => ({
        url: `/cars/return`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useCreateCarMutation,
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useGetCarQuery,
  useUpdateCarMutation,
  useReturnCarMutation,
} = carApi;
