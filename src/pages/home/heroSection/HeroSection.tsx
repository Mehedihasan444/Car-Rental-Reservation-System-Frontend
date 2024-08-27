import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const HeroSection = () => {
  const [pickUpDate, setPickUpDate] = useState<Date>();
  const [dropOffDate, setDropOffDate] = useState<Date>();

  return (
    <div
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://admiral.com/sites/default/files/public/styles/magazine_article_800/public/2023-07/Article%20Photo%20%2817%29.jpg?itok=XK3apsUQ')`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center text-white max-w-3xl mx-auto p-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
          Find the Perfect Ride for Your Journey
        </h1>
        <p className="text-lg sm:text-xl mb-6 sm:mb-8">
          Trusted by thousands for a seamless rental experience.
        </p>

        <Button size="lg" className="bg-red-600 hover:bg-red-700 mb-6 sm:mb-10">
          Book Now
        </Button>

        <div className="bg-white bg-opacity-90 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-2xl">
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="relative w-full sm:w-auto flex-1">
              <MapPin
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
              />
              <Input
                placeholder="Enter location"
                className="pl-10 flex-1 text-black"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-auto justify-start text-left font-normal text-black",
                    !pickUpDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-black" />
                  {pickUpDate ? (
                    format(pickUpDate, "PPP")
                  ) : (
                    <span className="text-black">Pick-up date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={pickUpDate}
                  onSelect={setPickUpDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-auto justify-start text-left font-normal text-black",
                    !dropOffDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-black" />
                  {dropOffDate ? (
                    format(dropOffDate, "PPP")
                  ) : (
                    <span className="text-black">Drop-off date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dropOffDate}
                  onSelect={setDropOffDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
              Check Availability
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
