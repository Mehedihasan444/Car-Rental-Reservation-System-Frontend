import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BookingManagement = () => {
  // Sample data (replace with actual data from your API or state)
  const bookings = [
    {
      id: 1,
      carName: "Tesla Model 3",
      bookingDates: "2024-08-15 to 2024-08-22",
      status: "Upcoming",
      isApproved: false,
    },
    {
      id: 2,
      carName: "Ford Mustang",
      bookingDates: "2024-07-01 to 2024-07-07",
      status: "Completed",
      isApproved: true,
    },
    {
      id: 3,
      carName: "Chevrolet Camaro",
      bookingDates: "2024-06-15 to 2024-06-20",
      status: "Cancelled",
      isApproved: true,
    },
  ];

  // Handlers for modifying or canceling bookings
  const handleModify = (bookingId: number) => {
    console.log(`Modify booking with ID: ${bookingId}`);
    // Implement modify booking logic here
  };

  const handleCancel = (bookingId: number) => {
    console.log(`Cancel booking with ID: ${bookingId}`);
    // Implement cancel booking logic here
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Booking Management */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Booking Management</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <p className="text-sm font-semibold">
                      Car Name: {booking.carName}
                    </p>
                    <p className="text-sm">Booking Dates: {booking.bookingDates}</p>
                    <p
                      className={`text-sm font-semibold ${
                        booking.status === "Completed"
                          ? "text-green-500"
                          : booking.status === "Cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      Status: {booking.status}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        variant="outline"
                        disabled={booking.isApproved || booking.status !== "Upcoming"}
                        onClick={() => handleModify(booking.id)}
                      >
                        Modify
                      </Button>
                      <Button
                        variant="destructive"
                        disabled={booking.isApproved || booking.status !== "Upcoming"}
                        onClick={() => handleCancel(booking.id)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No bookings available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingManagement;
