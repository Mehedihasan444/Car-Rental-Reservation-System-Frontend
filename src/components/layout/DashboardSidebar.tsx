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
      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105"
      : "text-gray-300 hover:bg-gray-700/80 hover:text-white hover:scale-102";

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
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col h-full border-r border-gray-700"
          >
            <SheetHeader>
              <SheetTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center pb-5">
                Dashboard
              </SheetTitle>
            </SheetHeader>
            <Separator className="mb-3 bg-gray-700" />

            {/* Main content area with flex-grow */}
            <div className=" grid gap-3 mt-2">
              {combinedRoutes?.map((route) => (
                <Link to={route.path} key={route.path}>
                  <Button
                    variant="link"
                    className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${getLinkClasses(
                      route.path
                    )}`}
                  >
                    <span className="text-xl">{route.icon}</span>
                    <span className="font-medium">{route.label}</span>
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
      <div className="hidden h-screen lg:flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl">
        <div className="pt-6">
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center pb-5">
            Dashboard
          </h3>
        </div>
        <Separator className="mb-5 bg-gray-700" />
        <div className="grid gap-3 justify-center px-4">
          {combinedRoutes.map((route) => (
            <Link to={route.path} key={route.path} className="">
              <Button
                variant="link"
                className={`w-full px-6 py-3 flex items-center gap-3 justify-start rounded-lg transition-all duration-300 ${getLinkClasses(
                  route.path
                )}`}
              >
                <span className="text-xl">{route.icon}</span>
                <span className="font-medium">{route.label}</span>
              </Button>
            </Link>
          ))}
          <button
            className={`w-full px-6 py-3 flex items-center gap-3 justify-start rounded-lg transition-all duration-300 `}
            onClick={handleLogout}
          >
            <FaSignOutAlt size={25} className="mr-3" />
            Logout
          </button>
        </div>
        <div className="mt-auto flex justify-center items-center bg-gradient-to-r from-white to-gray-100 border-t-4 border-blue-500 px-3 py-2">
          <Link to="/">
            <button className="flex flex-1 justify-center w-full my-3 font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300">
              <FaHome size={25} className="mr-3" /> Back To Home
            </button>
          </Link>
          {/* <Separator className="ml-8 bg-gray-300" orientation="vertical" />
          <button
            className="flex-1 flex justify-center w-full my-3 font-semibold text-gray-800 hover:text-red-600 transition-colors duration-300"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={25} className="mr-3" />
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardSidebar;
