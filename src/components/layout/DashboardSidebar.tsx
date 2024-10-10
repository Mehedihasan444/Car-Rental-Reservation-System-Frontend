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
import {
  FaBars,
  FaHome,
  FaCar,
  FaUser,
  FaClipboardList,
  FaFileAlt,
  FaChartBar,
  FaBook,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";

export function DashboardSidebar() {
  const location = useLocation();
  const role = useAppSelector((state: RootState) => state.auth.user?.role);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Logout logic here
    dispatch(logout());
  };
  const commonRoutes = [
    {
      path: "/dashboard/user",
      label: "User Dashboard",
      icon: <FaUser size={20} className="mr-2" />,
    },
    {
      path: "/dashboard/user/booking-management",
      label: "Booking Management",
      icon: <FaClipboardList size={20} className="mr-2" />,
    },
    {
      path: "/dashboard/user/payment-management",
      label: "Payment Management",
      icon: <FaBook size={20} className="mr-2" />,
    },
  ];

  const adminRoutes = [
    {
      path: "/dashboard/admin",
      label: "Admin Dashboard",
      icon: <FaChartBar size={20} className="mr-2" />,
    },
    {
      path: "/dashboard/admin/manage-cars",
      label: "Manage Cars",
      icon: <FaCar size={20} className="mr-2" />,
    },
    {
      path: "/dashboard/admin/manage-bookings",
      label: "Manage Bookings",
      icon: <FaClipboardList size={20} className="mr-2" />,
    },
    {
      path: "/dashboard/admin/manage-return-cars",
      label: "Manage Return Cars",
      icon: <FaCar size={20} className="mr-2" />,
    },
    {
      path: "/dashboard/admin/user-management",
      label: "User Management",
      icon: <FaUser size={20} className="mr-2" />,
    },
    {
      path: "/dashboard/admin/reports",
      label: "Reports",
      icon: <FaFileAlt size={20} className="mr-2" />,
    },
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
      <div className="grid grid-cols-1 gap-2 overflow-y-scroll lg:hidden">
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
                    className={`w-full text-left flex items-center ${getLinkClasses(
                      route.path
                    )}`}
                  >
                    {route.icon} <span className="ml-2">{route.label}</span>
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
      <div className="hidden h-screen lg:flex flex-col bg-gray-800 text-white ">
        <div className=" pt-6   ">
          <h3 className="text-3xl font-bold text-white text-center pb-5 ">
            Dashboard
          </h3>
        </div>
        <Separator className="mb-5" />
        <div className="grid gap-4 justify-center ">
          {combinedRoutes.map((route) => (
            <Link to={route.path} key={route.path} className="">
              <Button
                variant="link"
                className={`w-full px-14 flex items-center justify-start ${getLinkClasses(
                  route.path
                )}`}
              >
                {route.icon} <span className="ml-2">{route.label}</span>
              </Button>
            </Link>
          ))}
        </div>
        <div className="mt-auto flex justify-between items-center bg-white border-x-4 border-gray-800 px-3">
          <Link to="/">
            <button className="flex flex-1 justify-center w-full  my-5 font-semibold text-gray-800">
              <FaHome size={25} className="mr-5" /> Back To Home
            </button>
          </Link>
          <Separator className="ml-8 " orientation="vertical" />
          <button
            className="flex-1 flex justify-center w-full  my-5 font-semibold text-gray-800"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={25} className="mr-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
