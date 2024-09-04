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
import { useDeleteCarMutation } from "@/redux/features/car/carApi";
import { TCar } from "@/types/TCar";

export function DeleteCar({ car }: { car: TCar }) {
  const [deleteCar] = useDeleteCarMutation();

  const confirmDelete = async () => {
    const res = await deleteCar(car?._id);
    if (res?.data?.success) {
      toast({
        description: "Booking Deleteed successfully!",
      });
    } else {
      console.error("Failed to delete booking");
    }
  };

  return (
    <div>
      {/* Delete Confirmation Dialog */}
      <Dialog>
        <DialogTrigger asChild className="w-full">
          <Button
            variant="destructive"
            className="w-full"
            // disabled={car?. === "confirmed"}
          >
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Do you really want to Delete? Unsaved changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">No, Go Back</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
