import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/TBooking";

const BookingManagement = () => {
  // fetch user bookings
  const { data = {} } = useGetUserBookingsQuery(undefined);
  const { data: bookings } = data;
  // Sample data (replace with actual data from your API or state)
  // const bookings = [
  //   {
  //     id: 1,
  //     carName: "Tesla Model 3",
  //     bookingDates: "2024-08-15 to 2024-08-22",
  //     status: "Upcoming",
  //     isApproved: false,
  //   },
  //   {
  //     id: 2,
  //     carName: "Ford Mustang",
  //     bookingDates: "2024-07-01 to 2024-07-07",
  //     status: "Completed",
  //     isApproved: true,
  //   },
  //   {
  //     id: 3,
  //     carName: "Chevrolet Camaro",
  //     bookingDates: "2024-06-15 to 2024-06-20",
  //     status: "Cancelled",
  //     isApproved: true,
  //   },
  // ];

  // Handlers for modifying or canceling bookings
  const handleModify = (bookingId:string) => {
    console.log(`Modify booking with ID: ${bookingId}`);
    // Implement modify booking logic here
  };

  const handleCancel = (bookingId:string) => {
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
            {bookings?.length > 0 ? (
              <div className="space-y-4">
                {bookings?.map((booking: TBooking) => (
                  <div
                    key={booking._id}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <p className="text-sm font-semibold">
                      Car Name: {booking?.car?.name}
                    </p>
                    <p className="text-sm">Booking Dates: {booking?.date}</p>
                    <p
                      className={`text-sm font-semibold ${
                        booking?.isBooked === "confirmed"
                          ? "text-green-500"
                          : booking?.isBooked === "canceled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      Status: {booking?.isBooked}
                    </p>
                    <div className="mt-4 flex space-x-2">
                      <Button
                        variant="outline"
                        disabled={
                          booking.isBooked !== "confirmed"
                        }
                        onClick={() => handleModify(booking?._id)}
                      >
                        Modify
                      </Button>
                      <Button
                        variant="destructive"
                        disabled={
                                booking.isBooked === "unconfirmed"
                        }
                        onClick={() => handleCancel(booking._id)}
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
