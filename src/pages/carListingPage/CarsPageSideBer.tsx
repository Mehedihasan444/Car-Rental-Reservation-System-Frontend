import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PriceSlider from "@/components/ui/priceSlider";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaFilter } from "react-icons/fa";
// fake data
const cars = [
  {
    id: 1,
    type: "SUV",
    brand: "Toyota",
    model: "RAV4",
    fuelType: "Hybrid",
    transmission: "Automatic",
    seatingCapacity: 5,
    pricePerDay: 85,
  },
  {
    id: 2,
    type: "Sedan",
    brand: "Honda",
    model: "Accord",
    fuelType: "Petrol",
    transmission: "Automatic",
    seatingCapacity: 5,
    pricePerDay: 75,
  },
  {
    id: 3,
    type: "Electric",
    brand: "Tesla",
    model: "Model 3",
    fuelType: "Electric",
    transmission: "Automatic",
    seatingCapacity: 5,
    pricePerDay: 120,
  },
  {
    id: 4,
    type: "Convertible",
    brand: "BMW",
    model: "Z4",
    fuelType: "Petrol",
    transmission: "Manual",
    seatingCapacity: 2,
    pricePerDay: 150,
  },
  {
    id: 5,
    type: "Minivan",
    brand: "Honda",
    model: "Odyssey",
    fuelType: "Petrol",
    transmission: "Automatic",
    seatingCapacity: 7,
    pricePerDay: 90,
  },
];

export function CarsPageSideBer() {
  return (
    <div className="">
      <div className="lg:hidden">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="flex gap-2 text-lg float-right border"
            >
              <FaFilter /> Filter
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Filter Cars</SheetTitle>
              <SheetDescription>
                Select filters to narrow down your search.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {/* Car Type filter */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="carType" className="text-right">
                  Car Type
                </Label>
                <select
                  id="carType"
                  className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">All Car Types</option>
                  {cars?.map((car, idx) => (
                    <option value={car.type} key={idx}>
                      {car?.type}
                    </option>
                  ))}
                </select>
              </div>
              {/*  */}
              <div className="grid grid-cols-4 items-center gap-4 ">
                <Label htmlFor="sortBy" className="text-right">
                  Sort By:
                </Label>
                <div>
                  <select
                    // value={queries?.sort}
                    // onChange={(e) =>
                    //   setQueries({ ...queries, sort: e.target.value })
                    // }
                    className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="" disabled selected>
                      Price
                    </option>
                    <option value="desc">High To Low</option>
                    <option value="asc">Low To High</option>
                  </select>
                </div>
              </div>
              {/* Brand filter */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Brand
                </Label>
                <select
                  id="brand"
                  className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">All Brands</option>
                  {cars?.map((car, idx) => (
                    <option value={car.brand} key={idx}>
                      {car?.brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Type filter */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fuelType" className="text-right">
                  Fuel Type
                </Label>
                <select
                  id="fuelType"
                  className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">All Fuel Types</option>
                  {cars?.map((car, idx) => (
                    <option value={car?.fuelType} key={idx}>
                      {car?.fuelType}
                    </option>
                  ))}
                </select>
              </div>

              {/* Transmission filter */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transmission" className="text-right">
                  Transmission
                </Label>
                <select
                  id="transmission"
                  className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">All Transmissions</option>
                  {cars?.map((car, idx) => (
                    <option value={car?.transmission} key={idx}>
                      {car?.transmission}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seating Capacity filter */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="seatingCapacity" className="text-right">
                  Seating Capacity
                </Label>
                <select
                  id="seatingCapacity"
                  className="col-span-3 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="">All Seating Capacities</option>
                  {cars?.map((car, idx) => (
                    <option value={car?.seatingCapacity} key={idx}>
                      {car?.seatingCapacity} seats
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range filter */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priceRange" className="text-right">
                  Price Range
                </Label>
                <div className="col-span-3 flex justify-between items-center gap-2">
                  <PriceSlider />
                  <Button variant={"outline"} className="">
                    Set
                  </Button>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Apply Filters</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/*  */}
      <div className="hidden lg:inline-block w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
          <Button variant={"outline"} className="">
            Reset
          </Button>
        </div>

        {/* Category filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Car Type</h3>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <option value="">All Car Types</option>
            {cars?.map((car, idx) => (
              <option value={car.type} key={idx}>
                {car?.type}
              </option>
            ))}
          </select>
        </div>

        {/* Brand filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Brand</h3>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <option value="">All Brands</option>
            {cars?.map((car, idx) => (
              <option value={car.brand} key={idx}>
                {car.brand}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel Type filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Fuel Type</h3>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <option value="">All Fuel Types</option>
            {cars?.map((car, idx) => (
              <option value={car.fuelType} key={idx}>
                {car.fuelType}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission filter */}
        <div className="mb-4 ">
          <h3 className="text-sm font-semibold mb-2">Transmission</h3>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <option value="">All Transmissions</option>
            {cars?.map((car, idx) => (
              <option value={car.transmission} key={idx}>
                {car.transmission}
              </option>
            ))}
          </select>
        </div>

        {/* Seating Capacity filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Seating Capacity</h3>
          <select className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
            <option value="">All Seating Capacities</option>
            {cars?.map((car, idx) => (
              <option value={car?.seatingCapacity} key={idx}>
                {car?.seatingCapacity} seats
              </option>
            ))}
          </select>
        </div>

        {/* Price range filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Price Range</h3>
          <div className="flex justify-between items-center gap-2">
            <PriceSlider />
            <Button
              variant={"outline"}
              className=""
              // onClick={() =>
              //   setQueries({
              //     ...queries,
              //     minPrice: 1,
              //     maxPrice: priceRange[0],
              //   })
              // }
            >
              Set
            </Button>
          </div>
          <div>
            {/* <p>Selected price range: $1 - ${priceRange.join(" - ")}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import PriceSlider from "@/components/ui/priceSlider";
// import { Button } from "@/components/ui/button";

// export function CarsPageSideBer({ queries, setQueries }) {
//   const [items, setItems] = useState([]);
//   const [priceRange, setPriceRange] = useState([50]);

//   useEffect(() => {
//     fetch("https://car-rental-api.com/api/v1/cars")
//       .then((response) => response.json())
//       .then((data) => setItems(data?.data?.cars));
//   }, []);

//   // Get unique car types
//   const carTypes = Array.from(new Set(items?.map((car) => car?.type)));

//   return (
//     <>
//       <div className="flex justify-between items-center">
//         <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
//         <Button
//           variant={"default"}
//           className="bg-green-900 hover:bg-green-700"
//           onClick={() => setQueries({})}
//         >
//           Reset
//         </Button>
//       </div>

//       {/* Car Type filter */}
//       <div className="mb-4">
//         <h3 className="text-sm font-semibold mb-2">Car Type</h3>
//         <select
//           value={queries.type || ""}
//           onChange={(e) => setQueries({ ...queries, type: e.target.value })}
//           className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
//         >
//           <option value="">All Types</option>
//           {carTypes?.map((type) => (
//             <option value={type} key={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Price range filter */}
//       <div className="mb-4">
//         <h3 className="text-sm font-semibold mb-2">Price Range</h3>
//         <div className="flex justify-between items-center gap-2">
//           <PriceSlider value={priceRange} onChange={setPriceRange} />
//           <Button
//             variant={"default"}
//             className="bg-green-900 hover:bg-green-700"
//             onClick={() =>
//               setQueries({
//                 ...queries,
//                 minPrice: 1,
//                 maxPrice: priceRange[0],
//               })
//             }
//           >
//             Set
//           </Button>
//         </div>
//         <div>
//           <p>Selected price range: $1 - ${priceRange.join(" - ")}</p>
//         </div>
//       </div>
//     </>
//   );
// }
