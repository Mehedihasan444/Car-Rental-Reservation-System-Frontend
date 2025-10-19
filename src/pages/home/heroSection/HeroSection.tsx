import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { MapPin } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAvailabilityCheckQuery } from "@/redux/features/car/carApi";
import { TQueries } from "@/types/TQueries";
import { useAppDispatch } from "@/redux/hooks";
import { setAvailableCars } from "@/redux/features/car/carSlice";


export const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [queries, setQueries] = useState<TQueries>({ page: 1, limit: 10 });

  const { data = {},isSuccess } = useAvailabilityCheckQuery(queries);
  const { data: cars } = data;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQueries({ ...queries, searchTerm });
    if (isSuccess) {
      dispatch(setAvailableCars(cars));
      
      navigate(
        "/booking?search=true"
      );
    }
  };
 
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105 transition-transform duration-[2000ms]"
        style={{
          backgroundImage: `url('https://admiral.com/sites/default/files/public/styles/magazine_article_800/public/2023-07/Article%20Photo%20%2817%29.jpg?itok=XK3apsUQ')`,
        }}
      />
      
      {/* Modern gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-blue-900/50"></div>
      
      {/* Animated accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-blue-500/50 to-transparent animate-pulse"></div>
        <div className="absolute top-20 right-1/3 w-px h-40 bg-gradient-to-b from-red-500/50 to-transparent animate-pulse delay-300"></div>
        <div className="absolute bottom-20 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center text-white max-w-6xl mx-auto p-6">
        <div className="space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Premium Car Rental Service
          </div>

          {/* Main Heading with gradient text */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
              Find the Perfect Ride
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-500">
              for Your Journey
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto font-light">
            Trusted by <span className="font-bold text-blue-400">10,000+</span> customers worldwide for a seamless rental experience
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
              onClick={() => navigate("/booking")} 
            >
              Book Now
              <span className="ml-2">→</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white hover:text-white transition-all duration-300 px-8 py-6 text-lg font-semibold"
              onClick={() => navigate("/cars")}
            >
              Explore Fleet
            </Button>
          </div>

          {/* Search Card with glass morphism */}
          <div className="flex justify-center items-center">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-2xl hover:bg-white/15 transition-all duration-300">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row items-center justify-center gap-4"
              >
                <div className="relative w-full flex-1">
                  <MapPin
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                  />
                  <Input
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchTerm(e.target.value)
                    }
                    placeholder="Enter your location or destination"
                    required
                    className="pl-12 pr-4 py-6 w-full bg-white/90 border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 text-gray-900 placeholder:text-gray-500 rounded-xl text-lg font-medium shadow-inner"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/50 w-full md:w-auto px-8 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  Check Availability
                </Button>
              </form>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-300">Premium Cars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
