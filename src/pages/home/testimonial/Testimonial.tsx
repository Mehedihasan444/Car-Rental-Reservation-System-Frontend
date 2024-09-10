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
import { RatingComponent } from "@/utils/RatingComponent";
import { HoverCardReview } from "./HoverCardReview";
import { useGetAllReviewsQuery } from "@/redux/features/review/reviewApi";
import { TReview } from "@/types/TReview";
import Avatar from "react-avatar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Testimonial = () => {
  const { data = {} } = useGetAllReviewsQuery(undefined);
  const { data: reviews } = data;
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 100; // Adjust the max length for truncation

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className=" w-full h-full mt-10 ">
      <div className="max-w-7xl mx-auto lg:rounded-lg px-10 py-20 lg:p-20    lg:flex justify-between gap-10  h-full w-full">
        <div className="flex flex-col justify-center text-left flex-1">
          <div className="">
            <h3 className="text-sm bg-opacity-70  mb-6   rounded-md text-blue-700 inline-block font-bold">
              Trusted by thousands for a seamless rental experience.
            </h3>
          </div>
          <h2 className="dark:text-white text-4xl font-bold mb-4">
            What Our Customers Are Saying
          </h2>
          <p className="dark:text-white max-w-2xl mx-auto mb-12 opacity-80">
            Our commitment to providing the best car rental service is reflected
            in the feedback we receive from our valued customers. Here’s what
            they have to say about their experiences with us.
          </p>
        </div>
        {/* testimonials */}
        <div className="w-full flex justify-center items-center flex-1  py-14 ">
          <Carousel
            opts={{
              align: "start",
            }}
            // orientation="vertical"
            className="w-full max-w-sm shadow-lg"
          >
            <CarouselContent className="-mt-1 rounded-md">
              {reviews?.map((testimonial: TReview, index: number) => (
                <CarouselItem key={index} className="">
                  <div className="p-4 bg-blue-200  bg-opacity-90   ">
                    <Card className="min-h-[350px] flex items-center justify-center flex-col">
                      <CardHeader className="flex items-center justify-center space-x-4 pb-0">
                        <div className="flex items-center justify-center">
                          <Avatar
                            name={testimonial.name}
                            size="50"
                            className="rounded-full"
                          />
                          {/* <img
                            src={testimonial?.image}
                            alt={`${testimonial.name}'s photo`}
                            className="w-12 h-12 rounded-full"
                          /> */}
                        </div>
                        <div className="!ml-0 ">
                          <CardTitle className="text-lg text-center ">
                            {testimonial.name}
                          </CardTitle>
                          <RatingComponent  value={testimonial.rating} />
                        </div>
                      </CardHeader>
                      <CardContent className="mt-2">
                        <CardDescription className="text-center">
                          {isExpanded ||
                          testimonial.comment.length <= MAX_LENGTH
                            ? testimonial.comment
                            : `${testimonial.comment.substring(
                                0,
                                MAX_LENGTH
                              )}...`}
                        </CardDescription>

                        {testimonial.comment.length > MAX_LENGTH && (
                          <div className="flex justify-end items-start ">

                          <Button variant={"link"} size={"sm"} 
                            onClick={toggleReadMore}
                            className="text-blue-500 hover:underline text-xs"
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </Button>
                          </div>
                        )}
                        <div className="flex items-center justify-center ">
                          <HoverCardReview testimonial={testimonial} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-black dark:text-white ml-5 sm:ml-0" />
            <CarouselNext className="text-black dark:text-white mr-5 sm:mr-0" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
