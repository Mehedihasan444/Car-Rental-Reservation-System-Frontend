import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HoverCardReview } from "./HoverCardReview";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { TReview } from "@/types/TReview";
import Avatar from "react-avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export const Testimonial = () => {
  const { data = {} } = useGetAllReviewsQuery(undefined);
  const { data: reviews } = data;
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const MAX_LENGTH = 100; // Adjust the max length for truncation

  const toggleReadMore = (index: number) => {
    setExpandedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };
  return (
    <div className="relative w-full h-full mt-10 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto lg:rounded-lg px-10 py-20 lg:flex justify-between gap-10 h-full w-full">
        <div className="flex flex-col justify-center text-left flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 w-fit">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h3 className="text-blue-700 dark:text-blue-400 text-sm font-bold">
              Trusted by thousands for a seamless rental experience
            </h3>
          </div>
          <h2 className="dark:text-white text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            What Our Customers Are Saying
          </h2>
          <p className="dark:text-gray-300 text-gray-600 max-w-2xl text-lg leading-relaxed">
            Our commitment to providing the best car rental service is reflected
            in the feedback we receive from our valued customers. Here's what
            they have to say about their experiences with us.
          </p>
        </div>
        {/* testimonials */}
        <div className="w-full flex justify-center items-center flex-1 py-14">
          <Carousel
            opts={{
              align: "start",
            }}
            // orientation="vertical"
            className="w-full max-w-sm"
          >
            <CarouselContent className="-mt-1 rounded-md">
              {reviews?.map((testimonial: TReview, index: number) => (
                <CarouselItem key={index} className="">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-1"
                  >
                    <div className="p-5 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                      <Card className="min-h-[400px] flex flex-col border-2 border-gray-200/50 dark:border-gray-700/50 shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-md relative overflow-hidden group">
                        {/* Decorative gradient overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Quote icon */}
                        <div className="absolute top-4 left-4 opacity-10 dark:opacity-5">
                          <FaQuoteLeft size={60} className="text-blue-600" />
                        </div>

                        <CardHeader className="flex flex-col items-center justify-center space-y-4 pb-4 pt-8 relative z-10">
                          {/* Avatar with ring */}
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                            <div className="relative ring-4 ring-white dark:ring-gray-800 rounded-full shadow-xl">
                              <Avatar
                                name={testimonial.name}
                                size="70"
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          {/* Name and Rating */}
                          <div className="text-center space-y-2">
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                              {testimonial.name}
                            </CardTitle>
                            
                            {/* Stars with gradient */}
                            <div className="flex items-center justify-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <FaStar
                                  key={i}
                                  size={18}
                                  className={
                                    i < testimonial.rating
                                      ? "text-yellow-400 drop-shadow-md"
                                      : "text-gray-300 dark:text-gray-600"
                                  }
                                />
                              ))}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col justify-between px-6 pb-6 relative z-10">
                          {/* Comment */}
                          <div className="mb-4">
                            <CardDescription className="text-center text-gray-700 dark:text-gray-300 text-base leading-relaxed italic">
                              "{expandedIndices.has(index) ||
                              testimonial.comment.length <= MAX_LENGTH
                                ? testimonial.comment
                                : `${testimonial.comment.substring(
                                    0,
                                    MAX_LENGTH
                                  )}...`}"
                            </CardDescription>

                            {testimonial.comment.length > MAX_LENGTH && (
                              <div className="flex justify-center mt-2">
                                <Button 
                                  variant={"link"} 
                                  size={"sm"} 
                                  onClick={() => toggleReadMore(index)}
                                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
                                >
                                  {expandedIndices.has(index) ? "Show Less ↑" : "Read More ↓"}
                                </Button>
                              </div>
                            )}
                          </div>

                          {/* Bottom section */}
                          <div className="flex items-center justify-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                            <HoverCardReview testimonial={testimonial} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-black dark:text-white ml-5 sm:ml-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2 border-gray-200/50 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl" />
            <CarouselNext className="text-black dark:text-white mr-5 sm:mr-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-2 border-gray-200/50 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
