
import CarSlider from "./CarSlider";
import { Sparkles } from "lucide-react";

const FeaturedCars = () => {

  return (
    <div className="relative my-10 lg:my-0 lg:min-h-screen flex justify-center items-center flex-col py-20 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center mb-16 space-y-6 max-w-3xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-blue-700 dark:text-blue-300 text-sm font-bold uppercase tracking-wider">
            Enjoy Your Ride
          </span>
        </div>

        {/* Main Heading with gradient */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold dark:text-white">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-400 dark:to-white">
            Featured Cars
          </span>
        </h2>

        {/* Description with better typography */}
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
          Driving your dreams to reality with an exquisite fleet of{" "}
          <span className="text-blue-600 dark:text-blue-400 font-bold">versatile vehicles</span>{" "}
          for unforgettable journeys.
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400"></div>
        </div>
      </div>

      {/* Car Slider with enhanced container */}
      <div className="relative z-10 w-full px-4">
        <div className="max-w-7xl mx-auto">
          <CarSlider/>
        </div>
      </div>

      {/* Bottom decorative element */}
      <div className="mt-16 flex items-center justify-center gap-2">
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default FeaturedCars;
