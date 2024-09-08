import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/TBooking";
import { toast } from "@/components/ui/use-toast";

const ManageReturnCars = () => {
  // fetch user bookings
  const { data = {} } = useGetAllBookingsQuery(undefined);
  const { data: bookings } = data;
  const bookedCars = bookings?.filter(
    (booking: TBooking) => booking.isBooked === "confirmed"
  );
  // update bookings
  const [updateBooking] = useUpdateBookingMutation();

  const handleReturn = async (booking: TBooking) => {
    const newData = {
      isBooked: "returned",
      bookingId: booking?._id,
    };
    const res = await updateBooking(newData);
    console.log(res);
    if (res?.data?.success) {
      toast({
        description: "Booking updated successfully!",
      });
    }
  };

  return (
    <div className="p-6 bg-gray-50 h-screen overflow-y-scroll">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Car
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Return Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookedCars?.map((car: TBooking) => (
                  <tr key={car._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {car?.user?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car?.car?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car?.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.startTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {car.isBooked === "returned" ? car.endTime : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium leading-5 rounded-full ${
                          car.isBooked === "confirmed"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {car?.isBooked === "confirmed" ? "Booked" : "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {car.isBooked === "confirmed" && (
                        <Button
                          onClick={() => handleReturn(car)}
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
