import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the type for Booking
interface Booking {
  id: string;
  customerName: string;
  carName: string;
  bookingDate: string;
  status: "Pending" | "Approved" | "Canceled";
}

// Static data for bookings
const initialBookings: Booking[] = [
  {
    id: "1",
    customerName: "John Doe",
    carName: "Toyota Corolla",
    bookingDate: "2024-09-15",
    status: "Pending",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    carName: "Honda Civic",
    bookingDate: "2024-09-16",
    status: "Approved",
  },
  {
    id: "3",
    customerName: "Michael Johnson",
    carName: "Ford Mustang",
    bookingDate: "2024-09-17",
    status: "Pending",
  },
];

const ManageBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleApprove = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Approved" } : booking
      )
    );
  };

  const handleCancel = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Canceled" } : booking
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Manage Bookings Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Manage Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.carName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.bookingDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium leading-5 rounded-full ${
                          booking.status === "Pending" ? "bg-yellow-100 text-yellow-800" : booking.status === "Approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {booking.status === "Pending" && (
                        <div className="flex space-x-2">
                          <Button onClick={() => handleApprove(booking.id)} className="bg-green-500 text-white hover:bg-green-600">
                            Approve
                          </Button>
                          <Button onClick={() => handleCancel(booking.id)} className="bg-red-500 text-white hover:bg-red-600">
                            Cancel
                          </Button>
                        </div>
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

export default ManageBookings;
