import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  //   DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";

export function ResponsiveSidebar() {
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Logout logic here
    dispatch(logout());
  };
  return (
    <div className="lg:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Menu className="h-6 w-6 dark:text-white" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="dark:text-white">Menu</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="block text-lg font-medium dark:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/cars" className="block text-lg font-medium dark:text-white">
                    Cars
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="block text-lg font-medium dark:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/booking" className="block text-lg font-medium dark:text-white">
                    Booking
                  </Link>
                </li>
                {user && (
                  <Link
                    to={`/dashboard/${user?.role}`}
                    className="block text-lg font-medium dark:text-white"
                  >
                    Dashboard
                  </Link>
                )}
              </ul>
            </div>
            <DrawerFooter className="flex flex-col space-y-2">
              {user ? (
                <div className="flex items-center justify-between gap-3 w-full">
                  <Button
                    className="dark:border-black dark:border w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login" className="w-full ">
                    <Button className="w-full">Login</Button>
                  </Link>

                  <Link to="/register" className="w-full">
                    <Button variant="outline" className="w-full dark:text-white dark:border dark:border-white">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
