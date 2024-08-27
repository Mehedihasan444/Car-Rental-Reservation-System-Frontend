import CarCard from "@/components/ui/CarCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const CarSlider = () => {
    const data = [
        {
          title: "Jeep Renegade",
          likes: 132,
          numberOfRented: 64,
          carType: "SUV",
          pricePerHour: 20,
          status: "available",
          isElectric: true,
          averageRating: 4.5,
          image:
            "https://www.madebydesignesia.com/themes/rentaly/images/cars-alt/jeep-renegade.png",
        },
        {
          title: "Tesla Model S",
          likes: 256,
          numberOfRented: 89,
          carType: "Sedan",
          pricePerHour: 35,
          status: "available",
          isElectric: true,
          averageRating: 4.9,
          image:
            "https://www.madebydesignesia.com/themes/rentaly/images/cars-alt/vw-polo.png",
        },
        {
          title: "Ford Mustang",
          likes: 178,
          numberOfRented: 120,
          carType: "Convertible",
          pricePerHour: 30,
          status: "unavailable",
          isElectric: false,
          averageRating: 4.7,
          image:
            "https://www.madebydesignesia.com/themes/rentaly/images/cars-alt/mini-cooper.png",
        },
        {
          title: "BMW X5",
          likes: 203,
          numberOfRented: 75,
          carType: "SUV",
          pricePerHour: 25,
          status: "available",
          isElectric: false,
          averageRating: 4.6,
          image:
            "https://www.madebydesignesia.com/themes/rentaly/images/cars-alt/bmw-m5.png",
        },
        {
          title: "Chevrolet Camaro",
          likes: 145,
          numberOfRented: 50,
          carType: "Sports",
          pricePerHour: 28,
          status: "available",
          isElectric: false,
          averageRating: 4.8,
          image:
            "https://www.madebydesignesia.com/themes/rentaly/images/cars-alt/chevrolet-camaro.png",
        },
        {
          title: "Nissan Leaf",
          likes: 97,
          numberOfRented: 38,
          carType: "Hatchback",
          pricePerHour: 18,
          status: "available",
          isElectric: true,
          averageRating: 4.3,
          image:
            "https://www.madebydesignesia.com/themes/rentaly/images/cars-alt/ford-raptor.png",
        },
      ];
      
  return (
    <div>
      <Carousel className="w-full max-w-7xl mx-auto">
        <CarouselContent className="-ml-1 ">
          {data?.map((car, index) => (
            <CarouselItem
              key={index}
              className="pl-1 mr-5 md:basis-1/2 lg:basis-1/4 gap-5 "
            >
             <CarCard {...car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarSlider;
