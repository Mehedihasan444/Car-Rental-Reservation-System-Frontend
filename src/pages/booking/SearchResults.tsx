import { TCar } from "@/types/TCar";

const SearchResults = ({ cars, onSelectCar }:{cars:TCar[], onSelectCar: (car: TCar) => void}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {cars?.map((car:TCar) => (
        <div key={car._id} className="border rounded-lg shadow p-4">
          <img
            src={car.images[0]}
            alt={car.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold">{car.name}</h3>
          <p className="text-sm text-gray-600">{car.description}</p>
          <p className="text-lg font-semibold mt-2">
            ${car.pricePerHour} / day
          </p>
          <button
            onClick={() => onSelectCar(car)}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          >
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
