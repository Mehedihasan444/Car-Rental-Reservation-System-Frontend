
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "./StatsCard";

const AdminDashboard = () => {
  // Static data for demonstration
  const stats = {
    totalBookings: 125,
    availableCars: 42,
    totalRevenue: 75420,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
                value={`$${stats.totalRevenue.toLocaleString()}`}
                icon={<i className="fas fa-dollar-sign text-yellow-500"></i>} // Example icon
                description="Total revenue generated from bookings."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
