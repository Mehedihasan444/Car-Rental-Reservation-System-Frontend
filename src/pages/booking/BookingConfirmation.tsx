import { toast } from "@/components/ui/use-toast";
import { useCreateBookingMutation } from "@/redux/features/booking/bookingApi";
import { clearInfo } from "@/redux/features/booking/bookingInfoSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TBookingDetails } from "@/types/TBookingDetails";
import { useNavigate } from "react-router-dom";

const BookingConfirmation = ({
  bookingDetails,
}: {
  bookingDetails: TBookingDetails;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [createBooking] = useCreateBookingMutation();

  const handleCancel = () => {
    dispatch(clearInfo());
    navigate("/");
  };

  // modify data
  const bookingData = {
    carId: bookingDetails._id,
    startTime: bookingDetails.pickupTime,
    pickupLocation: bookingDetails.pickupLocation,
    destination: bookingDetails.destination,
    returnDate: bookingDetails.returnDate,
    date: bookingDetails.pickupDate,
    additionalFeatures: {
      childSeat: bookingDetails.childSeat,
      gps: bookingDetails.gps,
      insurance: bookingDetails.insurance,
    },
    bookedUserInfo: {
      userName: bookingDetails.userName,
      email: bookingDetails.email,
      phone: bookingDetails.phone,
      nid: bookingDetails.nid,
      drivingLicense: bookingDetails.drivingLicense,
    },
  };

  const handleBooking = async () => {
    const res = await createBooking(bookingData);
    if (res?.data?.success) {
      toast({
        description: "Booking Placed Successfully",
      });
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg flex-1 w-full">
      <h2 className="text-2xl font-semibold mb-4">Booking Confirmation</h2>
      <p className="text-gray-700">
        <span className="font-semibold">Car:</span> {bookingDetails?.name}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Name:</span> {bookingDetails?.userName}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Email:</span> {bookingDetails?.email}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Phone:</span> {bookingDetails?.phone}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Pick-up Date:</span>{" "}
        {bookingDetails?.pickupDate}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Drop-off Date:</span>{" "}
        {bookingDetails?.returnDate}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Pickup Location:</span>{" "}
        {bookingDetails?.pickupLocation}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Destination:</span>{" "}
        {bookingDetails?.destination}
      </p>
      <div className="flex justify-between items-center gap-5">
        <button
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
          onClick={handleBooking}
        >
          Finalize Booking
        </button>
        <button
          onClick={handleCancel}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
