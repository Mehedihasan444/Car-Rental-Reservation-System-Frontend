import { baseApi } from "@/redux/api/baseApi";


interface Queries {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Use the appropriate type instead of `any` if you know it
}

const carApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["car"],
    }),
    getAllCars: builder.query({
      query: (queries) => {
        const cleanedQueries = Object.entries(queries).reduce<Queries>((acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {});
    
        const params = new URLSearchParams(cleanedQueries);
    
        return {
          url: `/cars?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["car"],
    }),
    getCar: builder.query({
      query: (carId) => ({
        url: `/cars/${carId}`,
        method: "GET",
      }),
      providesTags: ["car"],
    }),
    updateCar: builder.mutation({
      query: ({ carId, ...data }) => ({
        url: `/cars/${carId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["car","booking"],
    }),
    deleteCar: builder.mutation({
      query: (carId) => ({
        url: `/cars/${carId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["car"],
    }),
    returnCar: builder.mutation({
      query: (data) => ({
        url: `/cars/return`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["car","booking"],
    }),
    availabilityCheck: builder.query({
      query: (queries) => {
        const cleanedQueries = Object.entries(queries).reduce<Queries>((acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        }, {});
    
        const params = new URLSearchParams(cleanedQueries);
    
        return {
          url: `/cars/check-availability?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["car"],
    })
  }),
});

export const {
  useCreateCarMutation,
  useDeleteCarMutation,
  useGetAllCarsQuery,
  useGetCarQuery,
  useUpdateCarMutation,
  useReturnCarMutation,
  useAvailabilityCheckQuery
} = carApi;
