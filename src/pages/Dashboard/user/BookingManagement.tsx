import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/TBooking";
import { UpdateBooking } from "./UpdateBooking";
import { CancelBooking } from "./CancelBooking";

const BookingManagement = () => {
  // fetch user bookings
  const { data = {} } = useGetUserBookingsQuery(undefined);
  const { data: bookings } = data;

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
                      <UpdateBooking booking={booking} />

                      {/* <Button
                        variant="destructive"
                        disabled={booking.isBooked === "confirmed"}
                        onClick={() => handleCancel(booking._id)}
                      >
                        Cancel
              
                      </Button> */}
                      <CancelBooking booking={booking} />
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
