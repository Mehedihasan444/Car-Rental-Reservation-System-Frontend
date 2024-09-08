import { baseApi } from "@/redux/api/baseApi";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["review"],
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    getAReviews: builder.query({
      query: (car) => ({
        url: `/reviews/${car}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, ...data }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetAReviewsQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = ReviewApi;
