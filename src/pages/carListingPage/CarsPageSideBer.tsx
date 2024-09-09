import { Button } from "@/components/ui/button";
import PriceSlider from "@/components/ui/priceSlider";
import { Separator } from "@/components/ui/separator";
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

import { TQueries } from "@/types/TQueries";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

export function CarsPageSideBer({
  queries,
  setQueries,
}: {
  queries: TQueries;
  setQueries: React.Dispatch<React.SetStateAction<TQueries>>;
}) {
  const [priceRange, setPriceRange] = useState<number[]>([50]);
  const handlePriceChange = (value:number[]) => {
    setPriceRange(value);
  };

  return (
    <div className="lg:w-full">
      <div className="lg:hidden">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="flex gap-2 text-lg  border"
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
              {/* Category filter */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Car Type</h3>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={queries.type || ""}
                  onChange={(e) =>
                    setQueries({ ...queries, type: e.target.value })
                  }
                >
                  <option selected value="" disabled>
                    Select Type
                  </option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Convertible">Convertible</option>
                  <option value="Truck">Truck</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Minivan">Minivan</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              {/* Brand filter */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Brand</h3>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={queries.brand || ""}
                  onChange={(e) =>
                    setQueries({ ...queries, brand: e.target.value })
                  }
                >
                  <option selected value="">
                    All Brands
                  </option>
                  {["Toyota", "Honda", "BMW", "Mercedes", "Tesla", "Ford"].map(
                    (brand, idx) => (
                      <option value={brand} key={idx}>
                        {brand}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Fuel Type filter */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Fuel Type</h3>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={queries.fuelType || ""}
                  onChange={(e) =>
                    setQueries({ ...queries, fuelType: e.target.value })
                  }
                >
                  <option selected value="" disabled>
                    Select Fuel Type
                  </option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="CNG">CNG</option>
                  <option value="LPG">LPG</option>
                </select>
              </div>

              {/* Transmission filter */}
              <div className="mb-4 ">
                <h3 className="text-sm font-semibold mb-2">Transmission</h3>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={queries.transmission || ""}
                  onChange={(e) =>
                    setQueries({ ...queries, transmission: e.target.value })
                  }
                >
                  <option selected value="" disabled>
                    Select Transmission
                  </option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>

              {/* Seating Capacity filter */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Seating Capacity</h3>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={queries.seatingCapacity || ""}
                  onChange={(e) =>
                    setQueries({ ...queries, seatingCapacity: Number(e.target.value) })
                  }
                >
                  <option value="">All Seating Capacities</option>
                  {[4, 6, 8, 10, 12, 14]?.map((seatingCapacity, idx) => (
                    <option value={seatingCapacity} key={idx}>
                      {seatingCapacity} seats
                    </option>
                  ))}
                </select>
              </div>
              {/*number of  doors */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">No. of Doors</h3>
                <select
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                  value={queries.noOfDoors || ""}
                  onChange={(e) =>
                    setQueries({ ...queries, noOfDoors: Number(e.target.value) })
                  }
                >
                  <option value="" selected disabled>
                    Select Number of Doors
                  </option>
                  <option value={2}>2 Doors</option>
                  <option value={3}>3 Doors</option>
                  <option value={4}>4 Doors</option>
                  <option value={5}>5 Doors</option>
                </select>
              </div>
              {/* Price range filter */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold mb-2">Price Range</h3>
                <div className="flex justify-between items-center gap-2">
                  <PriceSlider value={priceRange} onChange={handlePriceChange}/>
                  <Button
                    variant={"outline"}
                    className=""
                    onClick={() =>
                      setQueries({
                        ...queries,
                        minPrice: 1,
                        maxPrice: priceRange[0],
                      })
                    }
                  >
                    Set
                  </Button>
                </div>
                <div>
                  <p>Selected price range: $1 - ${priceRange.join(" - ")}</p>
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
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FaFilter/>Filter Options</h2>
          <Button
            variant={"outline"}
        className="dark:text-white"
            onClick={() => setQueries({})}
          >
            Reset
          </Button>
        </div>
        <Separator className="my-2"/>

        {/* Category filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Car Type</h3>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={queries.type || ""}
            onChange={(e) => setQueries({ ...queries, type: e.target.value })}
          >
            <option selected value="" disabled>
              Select Type
            </option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Convertible">Convertible</option>
            <option value="Truck">Truck</option>
            <option value="Coupe">Coupe</option>
            <option value="Minivan">Minivan</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Brand filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Brand</h3>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={queries.brand || ""}
            onChange={(e) => setQueries({ ...queries, brand: e.target.value })}
          >
            <option selected value="">
              All Brands
            </option>
            {["Toyota", "Honda", "BMW", "Mercedes", "Tesla", "Ford"].map(
              (brand, idx) => (
                <option value={brand} key={idx}>
                  {brand}
                </option>
              )
            )}
          </select>
        </div>

        {/* Fuel Type filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Fuel Type</h3>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={queries.fuelType || ""}
            onChange={(e) =>
              setQueries({ ...queries, fuelType: e.target.value })
            }
          >
            <option selected value="" disabled>
              Select Fuel Type
            </option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
            <option value="CNG">CNG</option>
            <option value="LPG">LPG</option>
          </select>
        </div>

        {/* Transmission filter */}
        <div className="mb-4 ">
          <h3 className="text-sm font-semibold mb-2">Transmission</h3>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={queries.transmission || ""}
            onChange={(e) =>
              setQueries({ ...queries, transmission: e.target.value })
            }
          >
            <option selected value="" disabled>
              Select Transmission
            </option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>
        </div>

        {/* Seating Capacity filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Seating Capacity</h3>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={queries.seatingCapacity || ""}
            onChange={(e) =>
              setQueries({ ...queries, seatingCapacity: Number(e.target.value )})
            }
          >
            <option value="">All Seating Capacities</option>
            {[4, 6, 8, 10, 12, 14]?.map((seatingCapacity, idx) => (
              <option value={seatingCapacity} key={idx}>
                {seatingCapacity} seats
              </option>
            ))}
          </select>
        </div>
        {/*number of  doors */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">No. of Doors</h3>
          <select
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            value={queries.noOfDoors || ""}
            onChange={(e) =>
              setQueries({ ...queries, noOfDoors: Number(e.target.value) })
            }
          >
            <option value="" selected disabled>
              Select Number of Doors
            </option>
            <option value={2}>2 Doors</option>
            <option value={3}>3 Doors</option>
            <option value={4}>4 Doors</option>
            <option value={5}>5 Doors</option>
          </select>
        </div>
        {/* Price range filter */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2">Price Range</h3>
          <div className="flex justify-between items-center gap-2">
            <PriceSlider  value={priceRange} onChange={handlePriceChange}/>
            <Button
              variant={"outline"}
               className="dark:text-white"
              onClick={() =>
                setQueries({
                  ...queries,
                  minPrice: 1,
                  maxPrice: priceRange[0],
                })
              }
            >
              Set
            </Button>
          </div>
          <div>
            <p>Selected price range: TK1 - TK{priceRange.join(" - ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
