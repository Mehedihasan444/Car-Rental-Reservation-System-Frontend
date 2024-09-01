import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom"; 
import { Separator } from "../ui/separator";
import { FaBars } from "react-icons/fa";

export function DashboardSidebar() {
  const location = useLocation();

  const getLinkClasses = (path:string) =>
    location.pathname === path
      ? "bg-gray-700 text-white"
      : "text-gray-300 hover:bg-gray-700";
  return (
    <div className=" lg:h-screen">
      <div className="grid grid-cols-1 gap-2 lg:hidden ">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button variant="ghost" size={"icon"} className="text-2xl m-5">
              <FaBars />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="bg-gray-800 text-white">
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-gray-200 text-center pb-5">
                Dashboard
              </SheetTitle>
            </SheetHeader>
            <Separator className="mb-3" />
            <div className="grid gap-4 mt-2">
              <Link to="/dashboard/user-dashboard">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/user-dashboard"
                  )}`}
                >
                  User Dashboard
                </Button>
              </Link>
              <Link to="/dashboard/booking-management">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/booking-management"
                  )}`}
                >
                  Booking Management
                </Button>
              </Link>
              <Link to="/dashboard/payment-management">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/payment-management"
                  )}`}
                >
                  Payment Management
                </Button>
              </Link>
              <Link to="/dashboard/admin-dashboard">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/admin-dashboard"
                  )}`}
                >
                  Admin Dashboard
                </Button>
              </Link>
              <Link to="/dashboard/manage-cars">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/manage-cars"
                  )}`}
                >
                  Manage Cars
                </Button>
              </Link>
              <Link to="/dashboard/manage-bookings">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/manage-bookings"
                  )}`}
                >
                  Manage Bookings
                </Button>
              </Link>
              <Link to="/dashboard/manage-return-cars">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/manage-return-cars"
                  )}`}
                >
                  Manage Return Cars
                </Button>
              </Link>
              <Link to="/dashboard/user-management">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/user-management"
                  )}`}
                >
                  User Management
                </Button>
              </Link>
              <Link to="/dashboard/reports">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/reports"
                  )}`}
                >
                  Reports
                </Button>
              </Link>
              <Link to="/dashboard/booking-page">
                <Button
                  variant="link"
                  className={`w-full text-left ${getLinkClasses(
                    "/dashboard/booking-page"
                  )}`}
                >
                  Booking Page
                </Button>
              </Link>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline" className="w-full mt-4">
                  Close Menu
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      {/*  */}

      <div className="hidden lg:flex flex-col  bg-gray-800 text-white  p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-200 text-center pb-5">
            Dashboard
          </h3>
          <Separator className="mb-3" />
        </div>
        <div className="grid gap-4 ">
          <Link to="/dashboard/user-dashboard">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/user-dashboard"
              )}`}
            >
              User Dashboard
            </Button>
          </Link>
          <Link to="/dashboard/booking-management">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/booking-management"
              )}`}
            >
              Booking Management
            </Button>
          </Link>
          <Link to="/dashboard/payment-management">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/payment-management"
              )}`}
            >
              Payment Management
            </Button>
          </Link>
          <Link to="/dashboard/admin-dashboard">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/admin-dashboard"
              )}`}
            >
              Admin Dashboard
            </Button>
          </Link>
          <Link to="/dashboard/manage-cars">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/manage-cars"
              )}`}
            >
              Manage Cars
            </Button>
          </Link>
          <Link to="/dashboard/manage-bookings">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/manage-bookings"
              )}`}
            >
              Manage Bookings
            </Button>
          </Link>
          <Link to="/dashboard/manage-return-cars">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/manage-return-cars"
              )}`}
            >
              Manage Return Cars
            </Button>
          </Link>
          <Link to="/dashboard/user-management">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/user-management"
              )}`}
            >
              User Management
            </Button>
          </Link>
          <Link to="/dashboard/reports">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/reports"
              )}`}
            >
              Reports
            </Button>
          </Link>
          <Link to="/dashboard/booking-page">
            <Button
              variant="link"
              className={`w-full text-left ${getLinkClasses(
                "/dashboard/booking-page"
              )}`}
            >
              Booking Page
            </Button>
          </Link>
        </div>
        <div className="mt-auto">
          <Button
            variant="outline"
            className="w-full mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Close Menu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
