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
import Avatar from 'react-avatar';

export const Testimonial = () => {
  const {data={}}=useGetAllReviewsQuery(undefined)
  const {data:reviews}=data
console.log(reviews)
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
        {/* testimonials */}
        <div className="w-full flex justify-center items-center flex-1">
          <Carousel
            opts={{
              align: "start",
            }}
            orientation="vertical"
            className="w-full max-w-xs"
          >
            <CarouselContent className="-mt-1 h-[310px]">
              {reviews?.map((testimonial:TReview, index:number) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="bg-white bg-opacity-90">
                      <CardHeader className="flex items-center justify-center space-x-4 pb-0">
                        <div className="flex items-center justify-center">
                        <Avatar name={testimonial.name} size="50" className="rounded-full"/>
                          {/* <img
                            src={testimonial?.image}
                            alt={`${testimonial.name}'s photo`}
                            className="w-12 h-12 rounded-full"
                          /> */}
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
                          {testimonial.comment}
                        </CardDescription>
                        <div className="flex items-center justify-center ">
                          <HoverCardReview testimonial={testimonial}/>
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
