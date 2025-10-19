import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "./StatsCard";
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetAllCarsQuery } from "@/redux/features/car/carApi";
import { TBooking } from "@/types/TBooking";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { motion } from "framer-motion";
import { FaCar, FaClipboardList, FaDollarSign, FaPlus, FaUsers, FaChartLine } from "react-icons/fa";
import { useEffect } from "react";

const AdminDashboard = () => {
  const { data = {}, error: bookingError } = useGetAllBookingsQuery(undefined);
  const { data: bookings = [] } = data;

  const { data: allCars = {}, error: carsError } = useGetAllCarsQuery({ page: 1, limit: 10 });
  const { cars } = allCars.data || {};

  useEffect(() => {
    console.log('🎛️ AdminDashboard Component RENDERED', {
      currentPath: window.location.pathname,
      currentUrl: window.location.href
    });
  }, []);

  // Log any API errors for debugging
  if (bookingError) {
    console.error('Booking API Error:', bookingError);
  }
  if (carsError) {
    console.error('Cars API Error:', carsError);
  }

  // Calculate total income from returned bookings
  const totalIncome = bookings
    .filter((booking: TBooking) => booking.isBooked === "returned")
    .reduce((sum: number, booking: TBooking) => sum + booking?.totalCost, 0);
  const stats = {
    totalBookings: bookings?.length,
    availableCars: cars?.length,
    totalRevenue: totalIncome,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className=" bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 h-screen overflow-y-scroll"
    >
      <div className=" space-y-8 ">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Welcome back! Here's what's happening with your car rental business.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <StatsCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<FaClipboardList />}
            description="All time bookings"
            gradient="from-blue-500 to-cyan-600"
            index={0}
          />
          <StatsCard
            title="Available Cars"
            value={stats.availableCars}
            icon={<FaCar />}
            description="Ready to rent"
            gradient="from-green-500 to-emerald-600"
            index={1}
          />
          <StatsCard
            title="Total Revenue"
            value={`TK ${stats.totalRevenue.toLocaleString()}`}
            icon={<FaDollarSign />}
            description="Lifetime earnings"
            gradient="from-purple-500 to-pink-600"
            index={2}
          />
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
                  Booking Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <PieChart />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full">
              <CardHeader className="border-b border-gray-100 dark:border-gray-700">
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="h-8 w-1 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
                  Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <LineChart />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Add New Car", icon: <FaPlus />, gradient: "from-blue-500 to-cyan-500", emoji: "🚗" },
            { label: "View Bookings", icon: <FaClipboardList />, gradient: "from-purple-500 to-pink-500", emoji: "📋" },
            { label: "Manage Users", icon: <FaUsers />, gradient: "from-green-500 to-emerald-500", emoji: "👥" },
            { label: "Generate Report", icon: <FaChartLine />, gradient: "from-orange-500 to-red-500", emoji: "📊" },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden bg-gradient-to-br ${action.gradient} p-6 rounded-xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 group`}
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-4xl mb-3">{action.emoji}</div>
                <div className="text-sm font-medium">{action.label}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
