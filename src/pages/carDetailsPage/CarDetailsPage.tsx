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
    <div className="max-w-7xl mx-auto p-6">
      {/* Car Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="md:col-span-1">
          <ImageGallery
            items={(car?.images || []).map((image: string) => ({
              original: image,
              thumbnail: image,
            }))}
            showPlayButton={false}
            showFullscreenButton={true}
            showBullets
            showNav
          />
        </div>

        {/* Car Details */}
        <div className="md:col-span-1 space-y-4">
          <h1 className="text-4xl font-bold">{car?.name}</h1>
          <p className="text-lg">{car?.description}</p>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Features:</h2>
            <div className="flex flex-wrap gap-2">
              {car?.features?.map((feature: string, idx: number) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800  shadow-inner  rounded-md px-4 py-1 text-sm  font-semibold"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Color:</h2>
            <p className="bg-blue-100 text-blue-800  shadow-inner  rounded-md px-4 py-1 text-sm  font-semibold">
              {car?.color}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Type:</h2>
            <p className="bg-blue-100 text-blue-800  shadow-inner  rounded-md px-4 py-1 text-sm  font-semibold">
              {car?.engineType}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Per Hour:</h2>
            <p className="text-xl font-semibold">TK{car?.pricePerHour}</p>
          </div>

          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Availability:</h2>
            <p
              className={`${
                car?.status === "available"
                  ? "text-green-700 "
                  : "text-red-700 "
              } text-sm  font-semibold`}
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
          {/* Additional Features */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Additional Features:</h2>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="insurance"
                  checked={selectedFeatures?.insurance}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                Insurance
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="gps"
                  checked={selectedFeatures?.gps}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                GPS
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="childSeat"
                  checked={selectedFeatures?.childSeat}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                Child Seat
              </label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
              <Button
              disabled={car?.status === "booked"}
                onClick={handleBooking}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
            <Link to="/booking">
                Book Now
            </Link>
              </Button>
          </div>
        </div>
      </div>
      <Separator className="mt-10" />
      {/* Review form */}
      <ReviewForm car={car?._id} />

      {/* BookingSteps */}
      <BookingSteps />
    </div>
  );
};

export default CarDetailsPage;
