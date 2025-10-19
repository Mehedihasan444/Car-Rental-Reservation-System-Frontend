import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Separator } from "@/components/ui/separator";
import BookingSteps from "./BookingSteps";
import { Link, useParams } from "react-router-dom";
import { useGetCarQuery } from "@/redux/features/car/carApi";
import ReviewForm from "./ReviewForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setInfo } from "@/redux/features/booking/bookingInfoSlice";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaPalette, FaCog, FaDollarSign, FaShieldAlt, FaMapMarkerAlt, FaBaby, FaCheck } from "react-icons/fa";

const CarDetailsPage = () => {
  const { id } = useParams();
  const { data = {} } = useGetCarQuery(id);
  const { data: car } = data;
  const [selectedFeatures, setSelectedFeatures] = useState({
    insurance: false,
    gps: false,
    childSeat: false,
  });
  const dispatch = useAppDispatch();
  const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFeatures({
      ...selectedFeatures,
      [e.target.name]: e.target.checked,
    });
  };

  const handleBooking = () => {
    dispatch(setInfo({...car,...selectedFeatures}));
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Car Details Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:border-r border-gray-200 dark:border-slate-700"
            >
              <div className="p-6">
                <ImageGallery
                  items={(car?.images || []).map((image: string) => ({
                    original: image,
                    thumbnail: image,
                  }))}
                  showPlayButton={false}
                  showFullscreenButton={true}
                  showBullets={true}
                  showNav={true}
                />
              </div>
            </motion.div>

            {/* Car Information */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8"
            >
              {/* Brand Badge */}
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-sm font-medium rounded">
                  {car?.brand}
                </span>
              </div>

              {/* Car Name */}
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {car?.name}
              </h1>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {car?.description}
              </p>

              {/* Specifications Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                    <FaPalette className="mr-2" size={16} />
                    <span className="text-sm">Color</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">{car?.color}</p>
                </div>

                <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                    <FaCog className="mr-2" size={16} />
                    <span className="text-sm">Engine Type</span>
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold">{car?.engineType}</p>
                </div>

                <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                    <FaDollarSign className="mr-2" size={16} />
                    <span className="text-sm">Price Per Hour</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">৳{car?.pricePerHour}</p>
                </div>

                <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4">
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                    <FaClock className="mr-2" size={16} />
                    <span className="text-sm">Availability</span>
                  </div>
                  <p
                    className={`font-semibold ${
                      car?.status === "available"
                        ? "text-green-600 dark:text-green-400"
                        : car?.status === "booked"
                        ? "text-red-600 dark:text-red-400"
                        : "text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {car?.status === "available"
                      ? "Available"
                      : car?.status === "booked"
                      ? "Booked"
                      : car?.status === "maintenance"
                      ? "Maintenance"
                      : ""}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <FaCheckCircle className="mr-2 text-blue-600" />
                  Features
                </h3>
                <div className="flex flex-wrap gap-2">
                  {car?.features?.map((feature: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm rounded-md border border-gray-200 dark:border-slate-600"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <Separator className="my-6" />

              {/* Additional Options */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  Additional Options
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <input
                      type="checkbox"
                      name="insurance"
                      checked={selectedFeatures?.insurance}
                      onChange={handleFeatureChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <FaShieldAlt className="ml-3 mr-2 text-gray-400" size={18} />
                    <span className="text-gray-700 dark:text-gray-300">Insurance Protection</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <input
                      type="checkbox"
                      name="gps"
                      checked={selectedFeatures?.gps}
                      onChange={handleFeatureChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <FaMapMarkerAlt className="ml-3 mr-2 text-gray-400" size={18} />
                    <span className="text-gray-700 dark:text-gray-300">GPS Navigation</span>
                  </label>
                  <label className="flex items-center p-3 border border-gray-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <input
                      type="checkbox"
                      name="childSeat"
                      checked={selectedFeatures?.childSeat}
                      onChange={handleFeatureChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <FaBaby className="ml-3 mr-2 text-gray-400" size={18} />
                    <span className="text-gray-700 dark:text-gray-300">Child Seat</span>
                  </label>
                </div>
              </div>

              {/* Book Now Button */}
              <Button
                disabled={car?.status === "booked"}
                onClick={handleBooking}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Link to="/booking" className="w-full flex items-center justify-center">
                  {car?.status === "booked" ? "Currently Unavailable" : (
                    <>
                      <FaCheck className="mr-2" />
                      Book Now
                    </>
                  )}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Review Section */}
        <ReviewForm car={car?._id} />

        {/* Booking Steps */}
        <BookingSteps />
      </div>
    </div>
  );
};

export default CarDetailsPage;
