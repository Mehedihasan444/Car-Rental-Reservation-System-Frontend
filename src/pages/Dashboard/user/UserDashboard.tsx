
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserDashboard = () => {
  // Sample data (replace this with actual data from your API or state)
  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
  };

  const bookingHistory = [
    {
      carName: "Tesla Model 3",
      bookingDates: "2024-08-01 to 2024-08-07",
      status: "Completed",
    },
    {
      carName: "Ford Mustang",
      bookingDates: "2024-07-15 to 2024-07-20",
      status: "Cancelled",
    },
    {
      carName: "Chevrolet Camaro",
      bookingDates: "2024-06-10 to 2024-06-15",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Personal Information */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div>
                <p className="text-sm font-semibold">Name:</p>
                <p>{userInfo.name}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Email:</p>
                <p>{userInfo.email}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Phone:</p>
                <p>{userInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Address:</p>
                <p>{userInfo.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking History */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
          </CardHeader>
          <CardContent>
            {bookingHistory.length > 0 ? (
              <div className="space-y-4">
                {bookingHistory.map((booking, index) => (
                  <div
                    key={index}
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
                          : "text-red-500"
                      }`}
                    >
                      Status: {booking.status}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No booking history available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
