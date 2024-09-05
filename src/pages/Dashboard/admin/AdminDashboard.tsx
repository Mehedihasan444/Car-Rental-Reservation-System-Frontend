import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "./StatsCard";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetAllCarsQuery } from "@/redux/features/car/carApi";
import { TBooking } from "@/types/TBooking";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

const AdminDashboard = () => {
  const { data = {} } = useGetAllBookingsQuery(undefined);
  const { data: bookings = [] } = data;

  const { data: allCars = {} } = useGetAllCarsQuery(undefined);
  const { data: cars } = allCars;

  const totalIncome = bookings
    .filter((booking: TBooking) => booking.isBooked === "returned")
    .reduce((sum: number, booking: TBooking) => sum + booking?.totalCost, 0);
  const stats = {
    totalBookings: bookings?.length,
    availableCars: cars?.length,
    totalRevenue: totalIncome,
  };

  return (
    <div className="p-6 bg-gray-50 h-screen overflow-y-scroll">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Dashboard Overview */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Admin Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard
                title="Total Bookings"
                value={stats.totalBookings}
                icon={<i className="fas fa-calendar-check text-blue-500"></i>} // Example icon
                description="Total number of bookings made."
              />
              <StatsCard
                title="Available Cars"
                value={stats.availableCars}
                icon={<i className="fas fa-car text-green-500"></i>} // Example icon
                description="Number of cars currently available for booking."
              />
              <StatsCard
                title="Total Revenue"
                value={`TK${stats.totalRevenue.toLocaleString()}`}
                icon={<i className="fas fa-dollar-sign text-yellow-500"></i>} // Example icon
                description="Total revenue generated from bookings."
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:flex justify-between items-center gap-5  mt-5">
        <Card className="shadow-lg  w-full flex-grow h-full">
          <PieChart />
        </Card>
        <Card className="shadow-lg w-full flex-grow h-full mt-5 lg:mt-0">
          <LineChart />
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
