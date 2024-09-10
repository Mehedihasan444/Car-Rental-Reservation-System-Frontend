import { FaMapPin, FaRoad, FaTag, FaTrophy } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <div className="mx-5 my-10 lg:my-0   lg:h-screen max-w-7xl lg:mx-auto flex flex-col justify-center items-center space-y-10">
      <div className="text-center mb-10 space-y-3 max-w-xl mx-auto">
        <h4 className="text-blue-600 p-3 text-xs  inline-flex font-bold rounded-md bg-gray-200">
          Why Choose Us
        </h4>
        <h2 className="text-4xl font-bold text-center dark:text-white">Our Features</h2>
        <p className="inline-flex text-gray-600 font-semibold">
          Discover a world of convenience, safety, and customization, paving the
          way for unforgettable adventures and seamless mobility solutions.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4  justify-center items-center gap-5">
        {/* col-1 */}
        <div className="space-y-5">
          <div className="flex justify-between gap-5">
            <div className="">
              <div className="bg-blue-700 p-5 rounded-md ">
                <FaTrophy size={30} className="" color="white" />
              </div>
            </div>
            <div className="">
              <h3 className="font-bold text-xl dark:text-white">First class services</h3>
              <p className="dark:text-white">
                Where luxury meets exceptional care, creating unforgettable
                moments and exceeding your every expectation.
              </p>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div className="">
              <div className="bg-blue-700 p-5 rounded-md ">
                <FaRoad size={30} className="" color="white" />
              </div>
            </div>
            <div className="dark:text-white">
              <h3 className="font-bold text-xl">24/7 road assistance</h3>
              <p className="">
                Reliable support when you need it most, keeping you on the move
                with confidence and peace of mind.
              </p>
            </div>
          </div>
        </div>
        {/* col-2 */}
        <div className="lg:col-span-2">
          <img
            src="https://www.madebydesignesia.com/themes/rentaly/images/misc/car-2.png"
            alt="car"
            className=""
          />
        </div>
        {/* col-3 */}
        <div className="space-y-5 dark:text-white">
          <div className="flex justify-between gap-5">
            <div className="text-right">
              <h3 className="font-bold text-xl"> Quality at Minimum Expense</h3>
              <p className="">
                Unlocking affordable brilliance with elevating quality while
                minimizing costs for maximum value.
              </p>
            </div>
            <div className="">
              <div className="bg-blue-700 p-5 rounded-md ">
                <FaTag size={30} className="" color="white" />
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5">
            <div className="text-right">
              <h3 className="font-bold text-xl">Free Pick-Up & Drop-Off</h3>
              <p className="">
                Enjoy free pickup and drop-off services, adding an extra layer
                of ease to your car rental experience.
              </p>
            </div>
            <div className="">
              <div className="bg-blue-700 p-5 rounded-md ">
                <FaMapPin size={30} className="" color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
