import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export type TBookingData = {
  userName: string;
  email: string;
  nid: string;
  drivingLicense?: string;
  phone: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
};

const BookingForm = ({
  onConfirmBooking,
}: {
  onConfirmBooking: (data: TBookingData) => void;
}) => {
  const [formData, setFormData] = useState<TBookingData>({
    userName: "",
    email: "",
    nid: "",
    drivingLicense: "",
    phone: "",
    pickupLocation: "",
    destination: "",
    pickupDate: "",
    pickupTime: "",
    returnDate: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmBooking(formData);
    setIsSubmitted(true);
  };

  return (
    // <div className="bg-white rounded-lg p-6 max-w-md mx-auto flex-1 w-full">
    <div
      className={`bg-white  rounded-lg p-6 max-w-md mx-auto flex-1 w-full ${
        isSubmitted ? "blur-sm" : ""
      }`}
    >
      <h2 className="text-2xl font-semibold mb-4">Complete Your Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </Label>
          <Input
            type="text"
            name="userName"
            placeholder="Name"
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="nid"
            className="block text-sm font-medium text-gray-700"
          >
            NID/Passport
          </Label>
          <Input
            type="text"
            name="nid"
            placeholder="NID"
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="drivingLicense"
            className="block text-sm font-medium text-gray-700"
          >
            Driving License (optional)
          </Label>
          <Input
            type="text"
            name="drivingLicense"
            placeholder="Driving License"
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone No.
          </Label>
          <Input
            type="text"
            name="phone"
            placeholder="Phone number"
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        {/*  */}
        <div className="flex gap-5 justify-between items-center mt-4">
          <div className="space-y-2 w-full">
            <Label htmlFor="pickupLocation">Pick Up Location</Label>
            <Input
              name="pickupLocation"
              type="text"
              onChange={handleInputChange}
              placeholder="Enter your pickup location"
              required
            />
          </div>

          <div className="space-y-2 w-full">
            <Label htmlFor="destination">Destination</Label>
            <Input
              name="destination"
              type="text"
              onChange={handleInputChange}
              placeholder="Enter your destination"
              required
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="pickupDateTime">Pick Up Date & Time</Label>
          <div className="flex gap-5">
            <Input
              required
              name="pickupDate"
              onChange={handleInputChange}
              type="date"
              className="flex-grow"
            />
            <Input
              required
              name="pickupTime"
              onChange={handleInputChange}
              type="time"
              className="flex-grow"
            />
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <Label htmlFor="returnDate">Return Date & Time</Label>
          <div className="flex gap-1">
            <Input
              required
              name="returnDate"
              onChange={handleInputChange}
              type="date"
              className="flex-grow"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitted}
          className="bg-blue-600 mt-4 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
