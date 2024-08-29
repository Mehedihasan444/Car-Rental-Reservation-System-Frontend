// import { useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import BookingSteps from "./BookingSteps";

const car = {
  _id: "666d58cd595ea918e0cc766a",
  name: "Tesla Model S",
  description: "An electric car with advanced technology and performance.",
  color: "Red",
  isElectric: true,
  status: "available",
  features: [
    "Autopilot",
    "Long Range Battery",
    "Premium Interior",
    "Enhanced Safety Features",
    "Fast Charging",
  ],
  pricePerHour: 5000,
  images: [
    "https://cdn.euroncap.com/media/72827/tesla-model-s.png",
    "https://media.ed.edmunds-media.com/tesla/model-s/2024/oem/2024_tesla_model-s_sedan_plaid_fq_oem_1_1600.jpg",
    "https://hips.hearstapps.com/hmg-prod/images/2024-tesla-model-s-109-6572200e14a8f.jpg?crop=1.00xw:0.920xh;0,0.0801xh&resize=1200:*",
  ],
};

const CarDetailsPage = () => {
  // const [selectedFeatures, setSelectedFeatures] = useState({
  //   insurance: false,
  //   gps: false,
  //   childSeat: false,
  // });

  // const handleFeatureChange = (e) => {
  //   setSelectedFeatures({
  //     ...selectedFeatures,
  //     [e.target.name]: e.target.checked,
  //   });
  // };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Car Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="md:col-span-1">
          <ImageGallery
            items={car?.images?.map((image) => ({
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
          <h1 className="text-4xl font-bold">{car.name}</h1>
          <p className="text-lg">{car.description}</p>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Features:</h2>
            <div className="flex flex-wrap gap-2">
              {car.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="bg-blue-300  shadow-inner  rounded-md px-4 py-1 text-sm  font-semibold"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Color:</h2>
            <p className="bg-blue-300  shadow-inner  rounded-md px-4 py-1 text-sm  font-semibold">
              {car.color}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Type:</h2>
            <p className="bg-blue-300  shadow-inner  rounded-md px-4 py-1 text-sm  font-semibold">
              {car?.isElectric ? "Electric" : "Petrol"}
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Per Hour:</h2>
            <p className="text-xl font-semibold">TK{car.pricePerHour}</p>
          </div>

          <div className="flex gap-5 items-center">
            <h2 className="text-xl font-semibold">Availability:</h2>
            <p
              className={`${
                car.status === "available" ? "text-green-700 " : "text-red-700 "
              } text-sm  font-semibold`}
            >
              {car.status === "available" ? "Available" : "Not Available"}
            </p>
          </div>

          {/* Additional Features
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Additional Features:</h2>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="insurance"
                  checked={selectedFeatures.insurance}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                Insurance
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="gps"
                  checked={selectedFeatures.gps}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                GPS
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="childSeat"
                  checked={selectedFeatures.childSeat}
                  onChange={handleFeatureChange}
                  className="mr-2"
                />
                Child Seat
              </label>
            </div>
          </div> */}
        </div>
      </div>
<Separator className="mt-10"/>
      {/* Booking Form */}
      <section className="my-12 bg-gray-100 p-8 rounded-md ">
        <h2 className="text-3xl font-bold mb-4">Book This Car</h2>
        {/* <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="text" placeholder="123-456-7890" />
          </div>
          <div>
            <Label htmlFor="rentalDuration">Rental Duration (in hours)</Label>
            <Input id="rentalDuration" type="number" placeholder="Enter hours" />
          </div>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Submit Booking
          </Button>
        </form> */}
        <div className=" bg-white p-6  rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Booking a Car</h2>
          <div className="sm:flex justify-between items-center gap-6">
            {/* Left Section */}
            <div className="space-y-4 flex-1">
              <div className="flex items-center border p-4 rounded-lg">
                <img
                  src={car?.images[0]}
                  alt="Car"
                  className="w-16 h-16 mr-4"
                />
                <span className="text-lg font-semibold">
                  Jeep Renegade - TK265
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pickupLocation">Pick Up Location</Label>
                <Input
                  id="pickupLocation"
                  type="text"
                  placeholder="Enter your pickup location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="Enter your destination"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pickupDateTime">Pick Up Date & Time</Label>
                  <div className="flex">
                    <Input id="pickupDate" type="date" className="flex-grow" />
                    <Input id="pickupTime" type="time" className="flex-grow" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="returnDateTime">Return Date & Time</Label>
                  <div className="flex">
                    <Input id="returnDate" type="date" className="flex-grow" />
                    <Input id="returnTime" type="time" className="flex-grow" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Submit
                </Button>
              </div>
            </div>
            <div className="">
              <Separator orientation="vertical" className="bg-blue-500" />
            </div>
            {/* Right Section */}
            <div className="space-y-4 flex-1">
              <h3 className="text-xl font-bold">Enter Your Details</h3>
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" type="text" placeholder="Your Name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input id="email" type="email" placeholder="Your Email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Your Phone</Label>
                <Input id="phone" type="tel" placeholder="Your Phone" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requests">Do you have any request?</Label>
                <textarea
                  id="requests"
                  placeholder="Do you have any request?"
                  className="w-full p-2 border rounded"
                  rows={3}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* BookingSteps */}
      <BookingSteps />
    </div>
  );
};

export default CarDetailsPage;
