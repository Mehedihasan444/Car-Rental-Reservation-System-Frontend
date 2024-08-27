import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FaAngleDoubleRight } from "react-icons/fa";

export const HoverCardReview = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant={"link"} className="text-blue-700">
          Car Details
          <FaAngleDoubleRight className="ml-2 mt-1 " />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-80 ">
        <div className="flex justify-between space-x-4 z-50">
          <div className="flex-1">
            <img
              src="https://www.madebydesignesia.com/themes/rentaly/images/cars-alt/jeep-renegade.png"
              alt=""
              className=""
            />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-semibold">Jeep Renegade</h4>
            <h4 className="font-semibold">TK 20</h4>

              <span className="text-xs text-muted-foreground">
                Rented at :
              </span>
            <div className="flex items-center ">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span>8/27/2024</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
