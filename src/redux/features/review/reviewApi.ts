import { baseApi } from "@/redux/api/baseApi";

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: "/reviews",
        method: "GET",
      }),
    }),
    getAReviews: builder.query({
      query: (car) => ({
        url: `/reviews/${car}`,
        method: "GET",
      }),
    }),
    updateReview: builder.mutation({
      query: ({ reviewId, ...data }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
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
