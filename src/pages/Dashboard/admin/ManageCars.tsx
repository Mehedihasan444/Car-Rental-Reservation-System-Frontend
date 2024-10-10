import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllCarsQuery } from "@/redux/features/car/carApi";
import { TCar } from "@/types/TCar";
import { Separator } from "@/components/ui/separator";
import CarForm from "./CarForm";
import { DeleteCar } from "./DeleteCar";

const ManageCars = () => {
  // fetch data from
  const { data = {} } = useGetAllCarsQuery({ page: 1, limit: 10 });
  const { cars } = data.data || {};
  //
  const [formState, setFormState] = useState(false);
  const [selectedCar, setSelectedCar] = useState<TCar | null>(null);
  // Ref for the top bar section
  const topRef = useRef<HTMLDivElement>(null);

  const handleEdit = (car: TCar) => {
    setSelectedCar(car);
      // Scroll to the top bar
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      }
  };

  return (
    <div className="p-6 bg-gray-50 h-screen overflow-y-scroll">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="shadow-lg" ref={topRef}>
          <CardHeader className="flex justify-between items-center flex-row">
            <CardTitle>Manage Cars</CardTitle>
            <Button
              onClick={() => (setFormState(!formState), setSelectedCar(null))}
            >
              {formState ? "Cancel" : "Add New Car"}
            </Button>
          </CardHeader>
          <CardContent>
            <Separator />
          </CardContent>
        </Card>
        {/* Form for adding/updating cars */}
        {formState && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>
                {selectedCar ? "Update Car" : "Add New Car"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CarForm selectedCar={selectedCar ? selectedCar : null} />
            </CardContent>
          </Card>
        )}
        {/* List of cars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!cars?.length ? (
            <p className="mt-5">No Cars available.</p>
          ) : (
            cars?.map((car: TCar) => (
              <Card key={car._id} className="shadow-lg">
                <CardContent className="p-5">
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    className="w-full h-48 object-cover  rounded-lg mb-4 border"
                  />
                  <div className="text-lg font-bold">{car.name}</div>
                  <div className="text-sm text-gray-600">
                    Model: {car.model}
                  </div>
                  <div className="text-sm text-gray-600">Year: {car?.year}</div>
                  <div className="text-sm text-gray-600">
                    Price Per Hour: ${car.pricePerHour}
                  </div>
                  <div className={`text-sm text-gray-600 `}>
                    Status: <span className={`${car.status=="available"?"text-green-500":"text-red-500"}`}>{car.status}</span> 
                  </div>
                  <div className="text-sm text-gray-600">
                    Current Location: {car?.currentLocation}
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() => {
                        handleEdit(car);
                        setFormState(!formState);
                      }}
                      className="w-1/2 mr-2"
                    >
                      Edit
                    </Button>

                    <DeleteCar car={car} />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageCars;
