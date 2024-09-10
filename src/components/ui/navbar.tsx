import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./button";
import carLogo from "../../assets/carLogo.png";
import { ResponsiveSidebar } from "./responsiveSidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";
// import { FaMoon, FaSun } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    // Logout logic here
    dispatch(logout());
  };
  return (
    <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-5 lg:px-0">
      {/* Logo and Company Name */}
      {/* logo */}
      <div className="relative ">
        <Link to="/">
          <img src={carLogo} alt="logo" className="w-16 h-16" />
        </Link>
        <span className="font-serif absolute top-11 -left-3 text-sm font-bold  uppercase dark:text-white">
          RentoCar
        </span>
      </div>

      {/* Navigation Menu */}
      <div className="flex gap-3 ">
        <div className="sm:hidden">
          <ModeToggle />
        </div>
        {/* mobile */}
        <ResponsiveSidebar />
        {/* Desktop */}
        <NavigationMenu className="hidden sm:inline-block ">
          <NavigationMenuList className="space-x-4 ">
            <NavigationMenuItem className="dark:text-white ">
              <NavLink
                to="/"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "text-blue-500" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join("")
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()} >
                  Home
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark:text-white ">
              <NavLink
                to="/cars"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "text-blue-500" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Cars
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark:text-white">
              <NavLink
                to="/about"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "text-blue-500" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark:text-white">
              <NavLink
                to="/booking"
                className={({ isActive, isPending, isTransitioning }) =>
                  [
                    isPending ? "pending" : "",
                    isActive ? "text-blue-500" : "",
                    isTransitioning ? "transitioning" : "",
                  ].join(" ")
                }
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Booking
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            {user && (
              <NavigationMenuItem className="dark:text-white">
                <NavLink
                  to={`/dashboard/${user?.role}`}
                  className={({ isActive, isPending, isTransitioning }) =>
                    [
                      isPending ? "pending" : "",
                      isActive ? "text-blue-500" : "",
                      isTransitioning ? "transitioning" : "",
                    ].join("dark:text-white ")
                  }
                >
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </NavLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Login/Sign Up Buttons */}
      <div className="space-x-2 hidden sm:inline-block">
        {/* <Button variant={"outline"}>
          <FaMoon />
        </Button>
        <Button variant={"outline"}>
          <FaSun />
        </Button> */}

        {user ? (
          <div className="flex items-center justify-between gap-3">
            <ModeToggle />
            <Button
              className="dark:border-black dark:border"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-end justify-center gap-3">
            <ModeToggle />
            <Link to="/login">
              <Button variant="outline" className="dark:text-white">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="dark:border-black dark:border">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none  space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
