import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TCar } from "@/types/TCar";
import { BsSuitHeartFill } from "react-icons/bs";
import { FaCar, FaUser } from "react-icons/fa";
import { GiCarDoor, GiSuitcase } from "react-icons/gi";

const SearchResults = ({
  cars,
  onSelectCar,
}: {
  cars: TCar[];
  onSelectCar: (car: TCar) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {cars?.map((car: TCar) => (
        <Card className="w-full   mx-auto my-4 sm:my-6 bg-white  rounded-md overflow-hidden">
          <CardHeader className="relative p-3">
            <img
              src={car?.images[0] || ""}
              alt={car?.name}
              className="w-full h-48 rounded-md border  object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center py-3">
              <CardTitle className="text-lg font-semibold">
                {car?.name}
              </CardTitle>
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
                {car?.seatingCapacity}
              </span>
              <span className="flex items-center gap-1 font-medium text-gray-700">
                <FaCar size={16} color="blue" />
                {car?.type}
              </span>
              <span className="flex items-center gap-1 font-medium text-gray-700">
                <GiCarDoor size={16} color="blue" />
                {car?.noOfDoors}
              </span>
            </div>
          </CardContent>
          <hr className="mx-6 my-2 border-gray-200" />
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-4">
            <div className="text-center sm:text-left">
              <span className="font-medium text-gray-600">Per Hour Rate</span>
              <h2 className="font-bold text-xl">TK {car?.pricePerHour}</h2>
            </div>
            <Button
              className="mt-4 sm:mt-0 "
              disabled={car?.status === "booked"}
              onClick={() => onSelectCar(car)}
            >
              Book Now
            </Button>
          </CardFooter>
        </Card>
        // <div key={car._id} className="border rounded-lg shadow p-4">
        //   <img
        //     src={car.images[0]}
        //     alt={car.name}
        //     className="w-full h-40 object-cover rounded-md mb-4"
        //   />
        //   <h3 className="text-xl font-semibold">{car.name}</h3>
        //   <p className="text-sm text-gray-600">{car.description}</p>
        //   <p className="text-lg font-semibold mt-2">
        //     ${car.pricePerHour} / day
        //   </p>
        //   <button
        //     onClick={() => onSelectCar(car)}
        //     className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        //   >
        //     Book Now
        //   </button>
        // </div>
      ))}
    </div>
  );
};

export default SearchResults;
