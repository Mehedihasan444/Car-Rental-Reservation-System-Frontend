import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Static Data for Search Results
const cars = [
  {
    id: 1,
    name: "Toyota Camry",
    model: "2023",
    pricePerHour: "$20",
    features: "Air Conditioning, GPS, Leather Seats",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Honda Civic",
    model: "2022",
    pricePerHour: "$18",
    features: "Bluetooth, Backup Camera, Cruise Control",
    image: "https://via.placeholder.com/150",
  },
  // Add more cars as needed
];

const BookingPage = () => {
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [searchResults, setSearchResults] = useState(cars);
  const [formData, setFormData] = useState({
    carType: "",
    features: "",
    name: "",
    email: "",
    phone: "",
    nidPassport: "",
    drivingLicense: "",
    paymentInfo: "",
    additionalOptions: {
      gps: false,
      childSeat: false,
    },
  });

  const handleSearch = () => {
    // For simplicity, we'll just use the static data here
    // You should replace this with actual search logic
    setSearchResults(cars.filter((car) => car.name.includes(formData.carType)));
  };

  const handleCarSelect = (car: any) => {
    setSelectedCar(car);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search Form */}
        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle>Search Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <Label htmlFor="carType">Car Type</Label>
                  <Input
                    id="carType"
                    name="carType"
                    placeholder="Enter car type"
                    value={formData.carType}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="features">Features</Label>
                  <Input
                    id="features"
                    name="features"
                    placeholder="Enter features"
                    value={formData.features}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button onClick={handleSearch} className="w-full bg-blue-500 text-white hover:bg-blue-600">
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && !selectedCar && (
          <div className="space-y-6">
            {searchResults.map((car) => (
              <Card key={car.id} className="shadow-lg mb-6">
                <CardHeader>
                  <CardTitle>{car.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <img src={car.image} alt={car.name} className="w-32 h-32 object-cover mr-4" />
                    <div>
                      <p><strong>Model:</strong> {car.model}</p>
                      <p><strong>Price per Hour:</strong> {car.pricePerHour}</p>
                      <p><strong>Features:</strong> {car.features}</p>
                      <Button
                        onClick={() => handleCarSelect(car)}
                        className="mt-4 bg-green-500 text-white hover:bg-green-600"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Car Details */}
        {selectedCar && (
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Car Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-64 object-cover" />
                <p><strong>Name:</strong> {selectedCar.name}</p>
                <p><strong>Model:</strong> {selectedCar.model}</p>
                <p><strong>Price per Hour:</strong> {selectedCar.pricePerHour}</p>
                <p><strong>Features:</strong> {selectedCar.features}</p>
                <div>
                  <h3 className="text-lg font-medium">Booking Form</h3>
                  <div className="mt-4 space-y-4">
                    <Input
                      id="nidPassport"
                      name="nidPassport"
                      placeholder="NID/Passport Number"
                      value={formData.nidPassport}
                      onChange={handleChange}
                    />
                    <Input
                      id="drivingLicense"
                      name="drivingLicense"
                      placeholder="Driving License Number"
                      value={formData.drivingLicense}
                      onChange={handleChange}
                    />
                    <Input
                      id="paymentInfo"
                      name="paymentInfo"
                      placeholder="Payment Information"
                      value={formData.paymentInfo}
                      onChange={handleChange}
                    />
                    <div>
                      <Label>
                        <input
                          type="checkbox"
                          name="gps"
                          checked={formData.additionalOptions.gps}
                          onChange={handleChange}
                        />
                        GPS
                      </Label>
                      <Label>
                        <input
                          type="checkbox"
                          name="childSeat"
                          checked={formData.additionalOptions.childSeat}
                          onChange={handleChange}
                        />
                        Child Seat
                      </Label>
                    </div>
                    <Button
                      onClick={() => alert('Booking Confirmed!')}
                      className="w-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
