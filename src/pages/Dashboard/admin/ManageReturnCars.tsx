import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the type for BookedCar
interface BookedCar {
  id: string;
  customerName: string;
  carName: string;
  bookingDate: string;
  returnDate?: string;
  status: "Booked" | "Returned";
}

// Static data for booked cars
const initialBookedCars: BookedCar[] = [
  {
    id: "1",
    customerName: "John Doe",
    carName: "Toyota Corolla",
    bookingDate: "2024-09-15",
    status: "Booked",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    carName: "Honda Civic",
    bookingDate: "2024-09-16",
    returnDate: "2024-09-20",
    status: "Returned",
  },
  {
    id: "3",
    customerName: "Michael Johnson",
    carName: "Ford Mustang",
    bookingDate: "2024-09-17",
    status: "Booked",
  },
];

const ManageReturnCars = () => {
  const [bookedCars, setBookedCars] = useState<BookedCar[]>(initialBookedCars);

  const handleReturn = (id: string) => {
    setBookedCars(
      bookedCars.map((car) =>
        car.id === id ? { ...car, status: "Returned", returnDate: new Date().toISOString().split("T")[0] } : car
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Manage Return Cars Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Manage Return Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookedCars.map((car) => (
                  <tr key={car.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{car.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.carName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{car.bookingDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.returnDate ? car.returnDate : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium leading-5 rounded-full ${
                          car.status === "Booked" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {car.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {car.status === "Booked" && (
                        <Button
                          onClick={() => handleReturn(car.id)}
                          className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                          Return Car
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageReturnCars;
