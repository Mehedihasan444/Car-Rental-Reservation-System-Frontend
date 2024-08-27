import { Button } from "@/components/ui/button";
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
import { FaAngleDoubleRight } from "react-icons/fa";
import { HoverCardReview } from "./HoverCardReview";

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "The Jeep Renegade was perfect for our weekend getaway. The service was excellent!",
    rating: 4.5,
    image: "https://via.placeholder.com/150", // Replace with actual customer image if available
  },
  {
    name: "Jane Smith",
    feedback:
      "Loved the experience! The car was clean and in great condition. Highly recommend!",
    rating: 5,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Alice Johnson",
    feedback:
      "Booking was easy, and the car was exactly as described. Will rent again!",
    rating: 4,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Bob Brown",
    feedback: "Great value for money. The customer support was very helpful.",
    rating: 4.2,
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Emily Davis",
    feedback:
      "Smooth process from start to finish. The car was perfect for our trip.",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
  },
];

export const Testimonial = () => {
  return (
    <div
      className=" bg-center bg-cover  max-w-7xl mx-auto bg-no-repeat w-full h-full my-10 lg:min-h-[500px]"
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLwHJnFbz5ZL93i4-aIZoABzuSyhWk_8p4zv-n1PYumHCe5g583fP8Otsz8Y1A0w5i6Xc&usqp=CAU')`, // Replace with your background image URL
      }}
    >
      <div className="bg-black bg-opacity-70  lg:rounded-lg px-10 py-20 lg:p-20   text-white lg:flex justify-between gap-10 lg:min-h-[500px] h-full w-full">
        <div className="flex flex-col justify-center text-left flex-1">
          <div className="">
            <h3 className="text-sm bg-opacity-70  mb-6 bg-white p-3 rounded-md text-blue-700 inline-block font-bold">
              Trusted by thousands for a seamless rental experience.
            </h3>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            What Our Customers Are Saying
          </h2>
          <p className="max-w-2xl mx-auto mb-12 opacity-80">
            Our commitment to providing the best car rental service is reflected
            in the feedback we receive from our valued customers. Here’s what
            they have to say about their experiences with us.
          </p>
        </div>
        <div className="w-full flex justify-center items-center flex-1">
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-xs"
          >
            <CarouselContent className="-mt-1 h-[310px]">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="bg-white bg-opacity-90">
                      <CardHeader className="flex items-center justify-center space-x-4 pb-0">
                        <div className="flex items-center justify-center">
                          <img
                            src={testimonial.image}
                            alt={`${testimonial.name}'s photo`}
                            className="w-12 h-12 rounded-full"
                          />
                        </div>
                        <div className="!ml-0">
                          <CardTitle className="text-lg text-center ">
                            {testimonial.name}
                          </CardTitle>
                          <RatingComponent value={testimonial.rating} />
                        </div>
                      </CardHeader>
                      <CardContent className="">
                        <CardDescription className="text-center">
                          {testimonial.feedback}
                        </CardDescription>
                        <div className="flex items-center justify-center ">
                          <HoverCardReview />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-black" />
            <CarouselNext className="text-black" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
