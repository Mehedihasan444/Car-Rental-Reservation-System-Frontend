/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // Static Data for Search Results
// const cars = [
//   {
//     id: 1,
//     name: "Toyota Camry",
//     model: "2023",
//     pricePerHour: "$20",
//     features: "Air Conditioning, GPS, Leather Seats",
//     image: "https://via.placeholder.com/150",
//   },
//   {
//     id: 2,
//     name: "Honda Civic",
//     model: "2022",
//     pricePerHour: "$18",
//     features: "Bluetooth, Backup Camera, Cruise Control",
//     image: "https://via.placeholder.com/150",
//   },
//   // Add more cars as needed
// ];

// const BookingPage = () => {
//   const [selectedCar, setSelectedCar] = useState<any>(null);
//   const [searchResults, setSearchResults] = useState(cars);
//   const [formData, setFormData] = useState({
//     carType: "",
//     features: "",
//     name: "",
//     email: "",
//     phone: "",
//     nidPassport: "",
//     drivingLicense: "",
//     paymentInfo: "",
//     additionalOptions: {
//       gps: false,
//       childSeat: false,
//     },
//   });

//   const handleSearch = () => {
//     // For simplicity, we'll just use the static data here
//     // You should replace this with actual search logic
//     setSearchResults(cars.filter((car) => car.name.includes(formData.carType)));
//   };

//   const handleCarSelect = (car: any) => {
//     setSelectedCar(car);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Search Form */}
//         <Card className="shadow-lg mb-6">
//           <CardHeader>
//             <CardTitle>Search Cars</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 <div>
//                   <Label htmlFor="carType">Car Type</Label>
//                   <Input
//                     id="carType"
//                     name="carType"
//                     placeholder="Enter car type"
//                     value={formData.carType}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="features">Features</Label>
//                   <Input
//                     id="features"
//                     name="features"
//                     placeholder="Enter features"
//                     value={formData.features}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <Button onClick={handleSearch} className="w-full bg-blue-500 text-white hover:bg-blue-600">
//                 Search
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Search Results */}
//         {searchResults.length > 0 && !selectedCar && (
//           <div className="space-y-6">
//             {searchResults.map((car) => (
//               <Card key={car.id} className="shadow-lg mb-6">
//                 <CardHeader>
//                   <CardTitle>{car.name}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center">
//                     <img src={car.image} alt={car.name} className="w-32 h-32 object-cover mr-4" />
//                     <div>
//                       <p><strong>Model:</strong> {car.model}</p>
//                       <p><strong>Price per Hour:</strong> {car.pricePerHour}</p>
//                       <p><strong>Features:</strong> {car.features}</p>
//                       <Button
//                         onClick={() => handleCarSelect(car)}
//                         className="mt-4 bg-green-500 text-white hover:bg-green-600"
//                       >
//                         Book Now
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}

//         {/* Car Details */}
//         {selectedCar && (
//           <Card className="shadow-lg mb-6">
//             <CardHeader>
//               <CardTitle>Car Details</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-64 object-cover" />
//                 <p><strong>Name:</strong> {selectedCar.name}</p>
//                 <p><strong>Model:</strong> {selectedCar.model}</p>
//                 <p><strong>Price per Hour:</strong> {selectedCar.pricePerHour}</p>
//                 <p><strong>Features:</strong> {selectedCar.features}</p>
//                 <div>
//                   <h3 className="text-lg font-medium">Booking Form</h3>
//                   <div className="mt-4 space-y-4">
//                     <Input
//                       id="nidPassport"
//                       name="nidPassport"
//                       placeholder="NID/Passport Number"
//                       value={formData.nidPassport}
//                       onChange={handleChange}
//                     />
//                     <Input
//                       id="drivingLicense"
//                       name="drivingLicense"
//                       placeholder="Driving License Number"
//                       value={formData.drivingLicense}
//                       onChange={handleChange}
//                     />
//                     <Input
//                       id="paymentInfo"
//                       name="paymentInfo"
//                       placeholder="Payment Information"
//                       value={formData.paymentInfo}
//                       onChange={handleChange}
//                     />
//                     <div>
//                       <Label>
//                         <input
//                           type="checkbox"
//                           name="gps"
//                           checked={formData.additionalOptions.gps}
//                           onChange={handleChange}
//                         />
//                         GPS
//                       </Label>
//                       <Label>
//                         <input
//                           type="checkbox"
//                           name="childSeat"
//                           checked={formData.additionalOptions.childSeat}
//                           onChange={handleChange}
//                         />
//                         Child Seat
//                       </Label>
//                     </div>
//                     <Button
//                       onClick={() => alert('Booking Confirmed!')}
//                       className="w-full bg-blue-500 text-white hover:bg-blue-600"
//                     >
//                       Confirm Booking
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookingPage;
import { useState } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import BookingForm from "./BookingForm";
import BookingConfirmation from "./BookingConfirmation";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const BookingPage = () => {
  const bookingCarDetails = useAppSelector(
    (state: RootState) => state?.bookingInfo?.bookingInfo
  );

  const [bookingDetails, setBookingDetails] = useState(
    bookingCarDetails || null
  );
  const [userData, setUserData] = useState<any | null>(null);
  const [cars, setCars] = useState<any[]>([]);
  const [selectedCar, setSelectedCar] = useState<any | null>(null);

  const handleSearch = (searchData: any) => {
    // Fetch cars based on search criteria
    const fetchedCars = [
      // Dummy data
      {
        id: 1,
        name: "Toyota Prius",
        image: "/images/prius.jpg",
        description: "Hybrid, GPS, 4 Seats",
        price: 100,
      },
      // More car data
    ];
    setCars(fetchedCars);
  };

  const handleSelectCar = (car: any) => {
    setSelectedCar(car);
  };

  const handleConfirmBooking = (bookingData: any) => {
    setUserData(bookingData);
    setBookingDetails({ ...bookingDetails, ...bookingData });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-5 py-10">
        {bookingDetails ? (
          <div className="">
            <div className="p-5 shadow-lg border rounded-lg bg-white mb-5">

            <h1 className="text-xl font-semibold">Finalize Your Booking</h1>
            </div>
            <div className="lg:flex justify-between gap-5 p-5 shadow-lg border rounded-lg bg-white">
              <div className="flex-1">
                <BookingForm onConfirmBooking={handleConfirmBooking} />
              </div>
              <div className="flex-1">
                <Card key={bookingDetails?._id} className=" mb-6">
                  <CardContent>
                    <div className="flex items-center mt-5">
                      <img
                        src={bookingDetails?.images[0]}
                        alt={bookingDetails?.name}
                        className="w-40 h-auto mr-4"
                      />
                      <div>
                        <p>
                          <strong>Name:</strong> {bookingDetails?.name}
                        </p>
                        <p>
                          <strong>Model:</strong> {bookingDetails?.model}
                        </p>
                        <p>
                          <strong>Price per Hour:</strong>{" "}
                          {bookingDetails?.pricePerHour}
                        </p>
                        <p>
                          <strong>Features:</strong> {bookingDetails?.features}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col justify-start items-start">
                    <div className="mt-4 text-left">
                      <p className="text-lg font-semibold">Insurance Options</p>
                      <p className="text-sm">
                        Optional insurance packages available.
                      </p>
                    </div>
                    <div className="mt-4 text-left">
                      <p className="text-lg font-semibold">
                        Cancellation Policy
                      </p>
                      <p className="text-sm">
                        Free cancellation up to 24 hours before pick-up.
                      </p>
                    </div>
                  </CardFooter>
                </Card>
                {userData && (
                  <BookingConfirmation bookingDetails={bookingDetails} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <SearchForm onSearch={handleSearch} />
            {cars.length > 0 && (
              <SearchResults cars={cars} onSelectCar={handleSelectCar} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
