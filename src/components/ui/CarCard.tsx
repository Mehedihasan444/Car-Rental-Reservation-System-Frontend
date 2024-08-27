import { TCar } from "@/types/TCar";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaCar, FaUser } from "react-icons/fa";
import { GiCarDoor, GiSuitcase } from "react-icons/gi";


const CarCard = (car:TCar) => {
const {title,
  likes,
  numberOfRented,
  carType,
  pricePerHour,
  status,
  // isElectric,
  // averageRating,
  image}=car

  return (
    <Card className="w-[300px] sm:w-auto">
      <CardHeader>
        <img
          src={image}
          alt=""
          className="hover:scale-105  transform transition-transform duration-300 ease-in-out "
        />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center py-3">
          <CardTitle>{title}</CardTitle>
          <span className="flex gap-1 items-center justify-center">
            <BsSuitHeartFill className="size-4" />
            {likes}
          </span>
        </div>
        <div className="text-xs flex items-center gap-4 ">
          <span className="flex items-center justify-start gap-1 font-bold">
            <FaUser className="size-3" color="blue"/>
            {numberOfRented}
          </span>
          <span className="flex items-center justify-start gap-1 font-bold">
            <GiSuitcase className="size-4" color="blue"/>
            {numberOfRented}
          </span>
          <span className="flex items-center justify-start gap-1 font-bold">
            <FaCar className="size-4" color="blue"/>
            {carType}
          </span>
          <span className="flex items-center justify-start gap-1 font-bold">
            <GiCarDoor className="size-3" color="blue"/>
            {numberOfRented}
          </span>
        </div>
      </CardContent>
      <hr className="mx-6 py-1" />
      <CardFooter className="flex justify-between">
        <div className="">
          <span className="font-semibold text-gray-400">Per Hour Rate</span>
          <h2 className="font-bold text-2xl">TK {pricePerHour}</h2>
        </div>

        <Button className="" disabled={status !== "available"}>
          Rent Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
