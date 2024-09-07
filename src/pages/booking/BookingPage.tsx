
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
