import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/TBooking";
import axios from "axios";
const PaymentManagement = () => {
  // fetch user bookings
  const { data = {} } = useGetUserBookingsQuery(undefined);
  const { data: bookings } = data;

  console.log(bookings)
  const returnedCars = bookings?.filter(
    (booking: TBooking) => booking.isBooked === "returned" && booking.payment==="due"
  );

  const handlePay = async (car: TBooking) => {
    // Implement payment logic here
    // const res = await axios.post("http://localhost:5000/api/payment", car);
    const res = await axios.post("https://car-rental-reservation-system-backend-sigma.vercel.app/api/payment", car);
    if (res?.data?.data?.payment_url)
      window.location.href = res?.data?.data?.payment_url;
  };

  return (
    <div className="p-6 bg-gray-50 h-screen overflow-y-scroll">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Payment Management */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Payment Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {returnedCars?.length > 0 ? (
                returnedCars?.map((car: TBooking) => (
                  <div
                    key={car._id}
                    className="border border-gray-200 p-4 rounded-lg"
                  >
                    <p className="text-sm font-semibold">
                      Car Name: {car?.car?.name}
                    </p>
                    <p className="text-sm">Return Time: {car.endTime}</p>
                    {car?.payment === "due" ? (
                      <p className="text-sm font-semibold text-red-500">
                        Amount Due: TK{car?.totalCost}
                      </p>
                    ) : (
                      <p className="text-sm font-semibold text-green-500">
                        Amount Paid: TK{car?.totalCost}
                      </p>
                    )}
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => handlePay(car)}
                      disabled={car?.payment === "paid"}
                    >
                      Pay Now
                    </Button>
                  </div>
                ))
              ) : (
                <p>No cars to process payment for.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentManagement;
