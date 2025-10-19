import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetUserBookingsQuery } from "@/redux/features/booking/bookingApi";
import { useGetUserQuery, useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TBooking } from "@/types/TBooking";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserDashboard = () => {
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  // fetch user information
  const { data = {} } = useGetUserQuery(user?._id);
  const { data: userInfo } = data;
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    email: userInfo?.email || "",
    phone: userInfo?.phone || "",
    address: userInfo?.address || "",
  });
  // fetch user bookings
  const { data: bookings = {} } = useGetUserBookingsQuery(undefined);
  const { data: bookingHistory } = bookings;
  // update user information
  const [updateUser]=useUpdateUserMutation()


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave =async () => {
   const res = await updateUser({UserId:user?._id,...formData});
   console.log(res)
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      phone: userInfo?.phone || "",
      address: userInfo?.address || "",
    });
    setIsEditing(false);
  };
useEffect(()=>{
  setFormData(
    {
      name: userInfo?.name ,
      email: userInfo?.email ,
      phone: userInfo?.phone ,
      address: userInfo?.address ,
    }
  )
},[userInfo])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200";
      case "unconfirmed":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200";
      case "returned":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20 border-blue-200";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <FaCheckCircle className="text-green-600" />;
      case "unconfirmed":
        return <FaClock className="text-yellow-600" />;
      case "returned":
        return <FaCheckCircle className="text-blue-600" />;
      default:
        return <FaTimesCircle className="text-gray-600" />;
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8 overflow-y-auto"
    >
      <div className=" space-y-8">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            My Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your profile and view your booking history
          </p>
        </motion.div>

        {/* Personal Information Card */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <FaUser className="text-3xl" />
                  Personal Information
                </CardTitle>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold"
                  >
                    <FaEdit className="mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FaUser className="text-purple-500" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="name"
                      value={formData?.name}
                      onChange={handleInputChange}
                      className="border-2 border-purple-200 focus:border-purple-500 transition-colors"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {formData?.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FaEnvelope className="text-purple-500" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <Input
                      name="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                      className="border-2 border-purple-200 focus:border-purple-500 transition-colors"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {formData?.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FaPhone className="text-purple-500" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      value={formData?.phone}
                      onChange={handleInputChange}
                      className="border-2 border-purple-200 focus:border-purple-500 transition-colors"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {formData?.phone}
                    </p>
                  )}
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-purple-500" />
                    Address
                  </label>
                  {isEditing ? (
                    <Input
                      name="address"
                      value={formData?.address}
                      onChange={handleInputChange}
                      className="border-2 border-purple-200 focus:border-purple-500 transition-colors"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      {formData?.address}
                    </p>
                  )}
                </div>
              </div>

              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex gap-4"
                >
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 border-2 border-gray-300 hover:bg-gray-100 font-semibold"
                  >
                    <FaTimes className="mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-semibold"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Booking History Card */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
            <CardHeader className="border-b border-gray-100 dark:border-gray-700">
              <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="h-10 w-1.5 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full" />
                Booking History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {bookingHistory?.length > 0 ? (
                <div className="space-y-4">
                  {bookingHistory?.slice(0, 5)?.map((booking: TBooking, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="relative overflow-hidden border-2 border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700"
                    >
                      {/* Accent Line */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500" />

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Car Name
                          </p>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {booking?.car?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Booking Date
                          </p>
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {booking?.date}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                            Status
                          </p>
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm border ${getStatusColor(booking?.isBooked)}`}
                          >
                            {getStatusIcon(booking?.isBooked)}
                            <span className="capitalize">{booking?.isBooked}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-xl font-semibold text-gray-600 dark:text-gray-400">
                    No booking history available
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                    Your bookings will appear here once you make a reservation
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;
