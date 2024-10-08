import CarCard from "@/components/ui/CarCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllCarsQuery } from "@/redux/features/car/carApi";
import { TCar } from "@/types/TCar";
import Loading from "@/utils/Loading";

const CarSlider = () => {
  const { data = {}, isLoading } = useGetAllCarsQuery({ page: 1, limit: 10 });
  const { cars } = data.data || {};

  return (
    <div className="">
      <Carousel className="w-full max-w-xs md:max-w-2xl lg:max-w-7xl mx-auto ">
        <CarouselContent className="-ml-1 ">
          {isLoading ? (
            <Loading loading={true} />
          ) : (
            cars?.map((car: TCar, index: number) => (
              <CarouselItem
                key={index}
                className="pl-1 sm:mr-5  md:basis-1/2 lg:basis-1/4  flex justify-center items-center"
              >
                <CarCard {...car} />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious className="dark:text-white ml-7 sm:ml-0 text-blue-500 border-blue-500" />
        <CarouselNext className="dark:text-white mr-7 md:mr-0 sm:ml-0 text-blue-500 border-blue-500" />
      </Carousel>
    </div>
  );
};

export default CarSlider;
