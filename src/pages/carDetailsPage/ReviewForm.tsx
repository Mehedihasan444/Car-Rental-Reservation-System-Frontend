import { toast } from "@/components/ui/use-toast";
import {
  useCreateReviewMutation,
  useGetAReviewsQuery,
} from "@/redux/features/review/reviewApi";
import { TReview } from "@/types/TReview";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ car }: { car: string }) => {
  const [createReview] = useCreateReviewMutation();

  const { data = {} } = useGetAReviewsQuery(car);
  const { data: reviews } = data;


  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    if (!rating || !comment || !name || !email || !car) {
      toast({ description: "All fields are required." });
      return;
    }
    const formData = { rating, comment, name, email, car };
    const res = await createReview(formData);
    if (res?.data?.success) {
      toast({ description: "Review posted successfully." });
    }
  };

  return (
    <div className="my-12 bg-gray-100 p-8 rounded-md ">
            <h2 className="text-2xl font-bold  mb-6">Reviews</h2>
    <div className="lg:flex justify-center  gap-5">
      <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg flex-1 h-full ">
      <h2 className="text-2xl font-bold  mb-6">Customer Reviews</h2>
{!reviews.length?<p>No review post yet!</p>:""}
        {
        reviews?.slice(0,2)?.map((review: TReview) => (
          <div
            key={review._id}
            className="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{review.name}</h3>
            <p className="text-sm opacity-60">{review.createdAt}</p>

            </div>
            <p className="text-sm text-gray-600">{review.email}</p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    review.rating > index ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <p className="mt-2 text-gray-800">{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 lg:mt-0 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg flex-1">
        <h2 className="text-2xl font-bold text-center mb-6">Leave a Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    className="hidden"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                  />
                  <FaStar
                    size={30}
                    className={`cursor-pointer transition-colors ${
                      ((hover ?? 0) || (rating ?? 0)) >= ratingValue
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="comment" className="block text-lg font-medium">
              Your Comment
            </label>
            <textarea
              id="comment"
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Share your experience with us..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-medium">
              Your Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-400 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ReviewForm;
