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
    // Redirect to the cars or booking page with query parameters
  };
 
  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://admiral.com/sites/default/files/public/styles/magazine_article_800/public/2023-07/Article%20Photo%20%2817%29.jpg?itok=XK3apsUQ')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto p-6 ">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Find the Perfect Ride for Your Journey
        </h1>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8">
          Trusted by thousands for a seamless rental experience.
        </p>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 mb-6 sm:mb-10 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
          onClick={() => navigate("/booking")} 
        >
          Book Now
        </Button>
        <div className="flex justify-center items-center">
          <div className="bg-white bg-opacity-50 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row items-center justify-center gap-4"
            >
              <div className="relative w-full  flex-1">
                <MapPin
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black dark:text-white"
                />
                <Input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder="Enter location"
                  required
                  className="pl-10 w-full   flex-1 text-black dark:text-white"
                />
              </div>

              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
              >
                Check Availability
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
