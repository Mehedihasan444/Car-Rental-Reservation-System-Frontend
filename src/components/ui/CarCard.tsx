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
  title,
  likes,
  numberOfRented,
  carType,
  pricePerHour,
  status,
  image
}: TCar) => {
  return (
    <Card className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] mx-auto my-4 sm:my-6 bg-white  rounded-md overflow-hidden">
      <CardHeader className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center py-3">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <span className="flex gap-1 items-center text-red-500">
            <BsSuitHeartFill size={20} />
            {likes}
          </span>
        </div>
        <div className="text-sm flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <FaUser size={14} color="blue" />
            {numberOfRented}
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <GiSuitcase size={18} color="blue" />
            {numberOfRented}
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <FaCar size={16} color="blue" />
            {carType}
          </span>
          <span className="flex items-center gap-1 font-medium text-gray-700">
            <GiCarDoor size={16} color="blue" />
            {numberOfRented}
          </span>
        </div>
      </CardContent>
      <hr className="mx-6 my-2 border-gray-200" />
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-4">
        <div className="text-center sm:text-left">
          <span className="font-medium text-gray-600">Per Hour Rate</span>
          <h2 className="font-bold text-xl">TK {pricePerHour}</h2>
        </div>
        <Link to="/details">
        
        <Button 
          className="mt-4 sm:mt-0 " 
          disabled={status !== "available"}
          // variant={status === "available" ? "primary" : "secondary"}
        >
          Rent Now
        </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
