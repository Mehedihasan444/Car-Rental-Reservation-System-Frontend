import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllCarsQuery } from "@/redux/features/car/carApi";
import { Calendar as CalendarIcon, ClockIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { TCar } from "@/types/TCar";
import { TBooking } from "@/types/TBooking";
import { useUpdateBookingMutation } from "@/redux/features/booking/bookingApi";
import { toast } from "@/components/ui/use-toast";

export function UpdateBooking({ booking }: { booking: TBooking }) {

  const { data = {} } = useGetAllCarsQuery({page:1,limit:10});
  const {  cars } = data.data|| {};
  const [formData, setFormData] = useState({
    car: booking?.car?._id || "",
    date: new Date(booking?.date).toISOString().split("T")[0],
    startTime: booking?.startTime || "",
  });
  const [updateBooking] = useUpdateBookingMutation();
  const handleDateChange = (day: Date | undefined) => {
    if (day) {
      setFormData((prevData) => ({
        ...prevData,
        date: day.toISOString().split("T")[0],
      }));
    }
  };

  const handleTimeChange = (time: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      startTime: time || "",
    }));
  };

  const handleCarChange = (car: string) => {
    setFormData((prevData) => ({
      ...prevData,
      car,
    }));
  };

  const handleSaveChanges = () => {
    updateBooking({ bookingId: booking._id, ...formData })
      .unwrap()
      .then((res) => {
        if (res.success) {

          toast({
            description: "Booking updated successfully!",
          });
        }
      })
      .catch((error) => {
        console.error("Failed to update booking:", error);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={booking?.isBooked === "confirmed" || booking?.isBooked === "returned"}
        >
          Modify
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update booking</DialogTitle>
          <DialogDescription>
            Make changes to your booking here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4 w-full">
            <Label htmlFor="car" className="text-right">
              Car
            </Label>
            <Select
              onValueChange={handleCarChange}
              defaultValue={formData?.car}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={booking?.car?.name} />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectLabel>Cars</SelectLabel>
                  {cars?.map((car: TCar) => (
                    <SelectItem key={car._id} value={car?._id}>
                      <div className="flex flex-row justify-between items-center gap-5">
                        <img src={car.images[0]} alt="" className="h-10 w-10" />
                        <span>{car?.name}</span>
                      </div>
                    </SelectItem>
                  )) ?? []}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !formData.date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date
                    ? format(new Date(formData.date), "PPP")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <div className="rounded-md border">
                  <Calendar
                    mode="single"
                    selected={new Date(formData.date)}
                    onSelect={handleDateChange}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !formData.startTime && "text-muted-foreground"
                  )}
                >
                  <ClockIcon className="mr-2 h-4 w-4" />
                  {formData.startTime ? formData.startTime : "Pick a time"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <div className="rounded-md border">
                  <TimePicker
                    onChange={handleTimeChange}
                    value={formData.startTime}
                    disableClock={true}
                    clearIcon={null}
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveChanges}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
