import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import BookingForm, { TBookingData } from "./BookingForm";
import BookingConfirmation from "./BookingConfirmation";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TQueries } from "@/types/TQueries";
import { useGetAllCarsQuery } from "@/redux/features/car/carApi";
import { TCar } from "@/types/TCar";
import { TBookingDetails } from "@/types/TBookingDetails";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  // Use the useLocation hook to get the current location object
  const location = useLocation();

  // Create a URLSearchParams object to extract query parameters
  const queryParams = new URLSearchParams(location.search);

  // Get the 'search' query parameter
  const searchQuery = queryParams.get("search");

  const bookingCarDetails = useAppSelector(
    (state: RootState) => state?.bookingInfo?.bookingInfo
  );

  const [bookingDetails, setBookingDetails] = useState(
    bookingCarDetails || null
  );
  const [queries, setQueries] = useState<TQueries>({ page: 1, limit: 10 });
  const { data = {}, isLoading } = useGetAllCarsQuery(queries);
  const { cars: allCars } = data.data || {};
  const [userData, setUserData] = useState<TBookingData | null>(null);
  const [cars, setCars] = useState<TCar[]>([]);
  const availableCars = useAppSelector((state: RootState) => state?.cars?.availableCars) || [];

  // UseEffect to set cars based on queries
  useEffect(() => {
    if (searchQuery === 'true') {
      setCars(availableCars);
    } else {
      setCars(allCars || []);
    }
  }, [queries, allCars, availableCars]);
 
  const handleSelectCar = (car: TCar) => {
    // Set the selected car details for booking
    setBookingDetails(car);
  };

  const handleConfirmBooking = (bookingData: TBookingData) => {
    setUserData(bookingData);
    const bookingInfo = {
      ...bookingDetails,
      ...bookingData,
    };
    setBookingDetails(bookingInfo as TBookingDetails);
  };

  return (
    <div className="bg-gray-100 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-5 py-10">
        {bookingDetails ? (
          <div className="">
            <div className="p-5 shadow-lg border rounded-lg bg-white  mb-5">
              <h1 className="text-xl font-semibold">Finalize Your Booking</h1>
            </div>
            <div className="lg:flex justify-between gap-5 p-5 shadow-lg border rounded-lg bg-white ">
              <div className="flex-1">
                <BookingForm onConfirmBooking={handleConfirmBooking} />
              </div>
              <div className="flex-1">
                <Card key={bookingDetails?._id} className="mb-6">
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
                          <strong>Features:</strong>{" "}
                          {bookingDetails?.features?.join(", ")}
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
            <SearchForm queries={queries} setQueries={setQueries} />
            {!isLoading && cars?.length > 0 && (
              <SearchResults cars={cars} onSelectCar={handleSelectCar} />
            )}
            {isLoading && <p>Loading cars...</p>}
            {!isLoading && cars?.length === 0 && (
              <p className="mx-5 sm:mx-0">No cars found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
