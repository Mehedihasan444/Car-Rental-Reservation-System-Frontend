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
  seatingCapacity,
  noOfDoors,
  images,
}: TCar) => {
  const isBooked = status === "booked";

  return (
    <Card className=" mx-auto my-4 sm:my-6 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="relative p-0">
        <div className="relative overflow-hidden">
          <img
            src={images[0] || ""}
            alt={name}
            className="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
          {isBooked && (
            <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Booked
            </div>
          )}
          {!isBooked && (
            <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Available
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </CardTitle>
          <button
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
            aria-label="Add to favorites"
          >
            <BsSuitHeartFill size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaUser className="text-blue-600 dark:text-blue-400" size={14} />
            <span className="font-medium">{seatingCapacity} Seats</span>
          </span>
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <GiCarDoor className="text-blue-600 dark:text-blue-400" size={16} />
            <span className="font-medium">{noOfDoors} Doors</span>
          </span>
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FaCar className="text-blue-600 dark:text-blue-400" size={14} />
            <span className="font-medium">{type}</span>
          </span>
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <GiSuitcase className="text-blue-600 dark:text-blue-400" size={16} />
            <span className="font-medium">2 Bags</span>
          </span>
        </div>
      </CardContent>

      <hr className="border-gray-200 dark:border-slate-700" />

      <CardFooter className="flex flex-row justify-between items-center p-4">
        <div>
          <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
            Per Hour Rate
          </span>
          <h2 className="font-bold text-xl text-gray-900 dark:text-white">
            ৳{pricePerHour}
          </h2>
        </div>
        <Button
          className={`${isBooked
            ? "bg-gray-400 cursor-not-allowed hover:bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            } text-white font-semibold rounded-lg transition-all duration-300 px-6 py-2`}
          disabled={isBooked}
        >
          <Link to={`/details/${_id}`} className={isBooked ? "pointer-events-none" : ""}>
            {isBooked ? "Booked" : "Rent Now"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CarCard;
