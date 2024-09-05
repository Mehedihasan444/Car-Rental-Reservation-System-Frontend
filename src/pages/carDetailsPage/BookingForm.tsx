import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TCar } from "@/types/TCar";
import { useState } from "react";

const BookingForm = ({car}:{car:TCar}) => {
    const [selectedFeatures, setSelectedFeatures] = useState({
        insurance: false,
        gps: false,
        childSeat: false,
      });
    
    
    const handleFeatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFeatures({
          ...selectedFeatures,
          [e.target.name]: e.target.checked,
        });
      };
    return (
        <section className="my-12 bg-gray-100 p-8 rounded-md ">
            <h2 className="text-3xl font-bold mb-4">Book This Car</h2>
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
                      {car?.name} - TK{car?.pricePerHour}
                    </span>
                  </div>
                  <div className="flex gap-5 justify-between items-center">
                    <div className="space-y-2 w-full">
                      <Label htmlFor="pickupLocation">Pick Up Location</Label>
                      <Input
                        id="pickupLocation"
                        type="text"
                        placeholder="Enter your pickup location"
                      />
                    </div>

                    <div className="space-y-2 w-full">
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        type="text"
                        placeholder="Enter your destination"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pickupDateTime">
                        Pick Up Date & Time
                      </Label>
                      <div className="flex gap-1">
                        <Input
                          id="pickupDate"
                          type="date"
                          className="flex-grow"
                        />
                        <Input
                          id="pickupTime"
                          type="time"
                          className="flex-grow"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="returnDateTime">Return Date & Time</Label>
                      <div className="flex gap-1">
                        <Input
                          id="returnDate"
                          type="date"
                          className="flex-grow"
                        />
                        <Input
                          id="returnTime"
                          type="time"
                          className="flex-grow"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Additional Features */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">
                      Additional Features:
                    </h2>
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
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                      Book Now
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
    );
};

export default BookingForm;