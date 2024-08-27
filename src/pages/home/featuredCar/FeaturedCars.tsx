import CarSlider from "./CarSlider";

const FeaturedCars = () => {
  return (
    <div className="my-10 lg:my-0 lg:h-screen flex justify-center items-center flex-col">
      <div className="text-center mb-10 space-y-3 max-w-xl mx-auto">
        <h4 className="text-blue-600 p-3 text-xs inline-flex font-bold rounded-md bg-gray-200">
          Enjoy Your Ride
        </h4>
        <h2 className="text-4xl font-bold text-center ">Featured Cars</h2>
        <p className="inline-flex text-gray-600 font-semibold">
          Driving your dreams to reality with an exquisite fleet of versatile
          vehicles for unforgettable journeys.
        </p>
      </div>
      <div className="">
        <CarSlider />
      </div>
    </div>
  );
};

export default FeaturedCars;
