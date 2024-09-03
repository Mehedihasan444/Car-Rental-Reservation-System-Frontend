import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useDeleteBookingMutation } from "@/redux/features/booking/bookingApi";
import { TBooking } from "@/types/TBooking";

export function CancelBooking({ booking }: { booking: TBooking }) {
  const [deleteBooking] = useDeleteBookingMutation();

  const confirmCancel = async () => {
    const res = await deleteBooking(booking?._id);
    if (res?.data?.success) {
      toast({
        description: "Booking canceled successfully!",
      });
    } else {
      console.error("Failed to delete booking");
    }
  };

  return (
    <div>
      {/* Cancel Confirmation Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="destructive"
            disabled={booking?.isBooked === "confirmed"}
          >
            Cancel
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Do you really want to cancel? Unsaved changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">No, Go Back</Button>
            </DialogClose>
              <Button variant="destructive" onClick={confirmCancel}>
                Yes, Cancel
              </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
