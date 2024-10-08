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
import { Link } from "react-router-dom";

const CarCard = ({
  _id,
  name,
  type,
  pricePerHour,
  status,
  // brand,
  // model,
  // fuelType,
  // transmission,
  seatingCapacity,
  noOfDoors,
  images,
}: TCar) => {
  return (
    <Card className="w-[280px] sm:w-[300px]  mx-auto my-4 sm:my-6 bg-white  rounded-md overflow-hidden">
      <CardHeader className="relative p-3">
        <img
          src={images[0] || ""}
          alt={name}
          className="w-full sm:h-48 rounded-md border  object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center py-3">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <span className="flex gap-1 items-center text-red-500">
            <BsSuitHeartFill size={20} />
            {44}
          </span>
        </div>
        <div className="text-sm flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <FaUser size={14} color="blue" />
            {26}
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <GiSuitcase size={18} color="blue" />
            {seatingCapacity}
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <FaCar size={16} color="blue" />
            {type}
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <GiCarDoor size={16} color="blue" />
            {noOfDoors}
          </span>
        </div>
      </CardContent>
      <hr className="mx-6 my-2 border-gray-200" />
      <CardFooter className="flex  flex-row justify-between items-center p-4">
        <div className=" sm:text-left">
          <span className="font-medium text-gray-600">Per Hour Rate</span>
          <h2 className="font-bold text-xl">TK {pricePerHour}</h2>
        </div>
        <Button className="mt-4 sm:mt-0 " disabled={status === "booked"}>
          <Link to={`/details/${_id}`}>
            {status === "booked" ? "Booked" : "Rent Now"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
