import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { FaBars, FaHome } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export function DashboardSidebar() {
  const location = useLocation();
  const role = useAppSelector((state: RootState) => state.auth.user?.role);

  const commonRoutes = [
    { path: "/dashboard/user", label: "User Dashboard" },
    { path: "/dashboard/user/booking-management", label: "Booking Management" },
    { path: "/dashboard/user/payment-management", label: "Payment Management" },
  ];

  const adminRoutes = [
    // ...commonRoutes,
    { path: "/dashboard/admin", label: "Admin Dashboard" },
    { path: "/dashboard/admin/manage-cars", label: "Manage Cars" },
    { path: "/dashboard/admin/manage-bookings", label: "Manage Bookings" },
    {
      path: "/dashboard/admin/manage-return-cars",
      label: "Manage Return Cars",
    },
    { path: "/dashboard/admin/user-management", label: "User Management" },
    { path: "/dashboard/admin/reports", label: "Reports" },
    // { path: "/dashboard/admin/booking-page", label: "Booking Page" },
  ];

  const userRoutes = [...commonRoutes];

  const combinedRoutes = role === "admin" ? adminRoutes : userRoutes;

  const getLinkClasses = (path: string) =>
    location.pathname === path
      ? "bg-white text-black dark:text-black"
      : "text-gray-300 hover:bg-gray-700";

  return (
    <div className="lg:h-screen">
      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-2  overflow-y-scroll lg:hidden">
        <Sheet key={"left"}>
          <SheetTrigger asChild>
            <Button variant="ghost" size={"icon"} className="text-2xl m-5">
              <FaBars />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={"left"}
            className="bg-gray-800 text-white flex flex-col h-full"
          >
            <SheetHeader>
              <SheetTitle className="text-2xl font-semibold text-gray-200 text-center pb-5">
                Dashboard
              </SheetTitle>
            </SheetHeader>
            <Separator className="mb-3 " />

            {/* Main content area with flex-grow */}
            <div className=" grid gap-4 mt-2">
              {combinedRoutes?.map((route) => (
                <Link to={route.path} key={route.path}>
                  <Button
                    variant="link"
                    className={`w-full text-left ${getLinkClasses(route.path)}`}
                  >
                    {route.label}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Footer area that stays at the bottom */}
            <SheetFooter className="mt-auto">
              <Link to="/" className="w-full">
                <Button
                  variant="outline"
                  className="w-full mt-4 text-gray-800 text-lg flex items-center justify-center dark:text-white"
                >
                  <FaHome size={25} className="mr-5" />
                  Back To Home
                </Button>
              </Link>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden h-screen lg:flex flex-col bg-gray-800 text-white p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-200 text-center pb-5">
            Dashboard
          </h3>
          <Separator className="mb-3" />
        </div>
        <div className="grid gap-4">
          {combinedRoutes.map((route) => (
            <Link to={route.path} key={route.path}>
              <Button
                variant="link"
                className={`w-full text-left ${getLinkClasses(route.path)}`}
              >
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
        <div className="mt-auto">
          <Link to="/">
            <Button
              variant="outline"
              className="w-full mt-4 text-gray-800 text-lg dark:text-white"
            >
              <FaHome size={25} className="mr-5" /> Back To Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
