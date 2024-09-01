import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "./button";
import carLogo from "../../assets/carLogo.png";
import { ResponsiveSidebar } from "./responsiveSidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/auth/authSlice";

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
        <span className="font-serif absolute top-11 -left-3 text-sm font-bold  uppercase">
          RentoCar
        </span>
      </div>

      {/* Navigation Menu */}
      <div className="">
        <ResponsiveSidebar />
        <NavigationMenu className="hidden sm:inline-block">
          <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/cars">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Cars
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/booking">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Booking
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/contact">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Login/Sign Up Buttons */}
      <div className="space-x-2 hidden sm:inline-block">
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
