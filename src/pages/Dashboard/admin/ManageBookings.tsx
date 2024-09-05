import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import {
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/TBooking";
import { CancelBooking } from "../user/CancelBooking";

const ManageBookings = () => {
  // fetch user bookings
  const { data = {} } = useGetAllBookingsQuery(undefined);
  const { data: bookings } = data;
  // update bookings
  const [updateBooking] = useUpdateBookingMutation();

  const handleApprove = async (booking: TBooking) => {
    const newData = {
      isBooked: "confirmed",
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
        {/* Manage Bookings Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Manage Bookings</CardTitle>
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings?.map((booking: TBooking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking?.user?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking?.car?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking?.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium leading-5 rounded-full ${
                          booking?.isBooked === "unconfirmed"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking?.isBooked === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking?.isBooked}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleApprove(booking)}
                            disabled={
                              booking?.isBooked === "returned" ||
                              booking?.isBooked === "confirmed"
                            }
                            className="bg-green-500 text-white hover:bg-green-600"
                          >
                            Approve
                          </Button>
                          <CancelBooking booking={booking}/>
                          {/* <Button
                            onClick={() => handleCancel(booking)}
                            disabled={booking?.isBooked === "returned"}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Cancel
                          </Button> */}
                        </div>
                      }
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
