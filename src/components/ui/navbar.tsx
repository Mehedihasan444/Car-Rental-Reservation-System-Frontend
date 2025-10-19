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
import tokenManager from "@/utils/tokenManager";
// import { FaMoon, FaSun } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import Avatar from "react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
export function Navbar() {
  const user = useAppSelector((state: RootState) => state?.auth?.user);
  const token = useAppSelector((state: RootState) => state?.auth?.token);
  const dispatch = useAppDispatch();

  // Debug logging
  React.useEffect(() => {
    console.log('🔍 Navbar - User state:', user);
    console.log('🔍 Navbar - User role:', user?.role);
    console.log('🔍 Navbar - Token state:', token ? 'Present' : 'Not present');
    console.log('🔍 Navbar - Current URL:', window.location.href);
    console.log('🔍 Navbar - Current pathname:', window.location.pathname);
  }, [user, token]);

  const handleLogout = () => {
    // Clear tokens from tokenManager
    tokenManager.clearTokens();
    // Logout from Redux
    dispatch(logout());
  };
  return (
    <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-5 lg:px-0">
      {/* Logo and Company Name */}
      {/* logo */}
      <div className="relative ml-5 lg:ml-0">
        <Link to="/">
          <img src={carLogo} alt="logo" className="w-16 h-16" />
          <span className="font-serif absolute top-11 -left-3 text-sm font-bold  uppercase dark:text-white">
            RentoCar
          </span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <div className="flex gap-3 ">
        <div className="lg:hidden">
          <ModeToggle />
        </div>
        {/* mobile */}
        {user && (
          <Avatar
            name={user?.name}
            size="45"
            className=" rounded-full lg:hidden"
          />
        )}
        <ResponsiveSidebar />
        {/* Desktop */}
        <NavigationMenu className="hidden lg:inline-block ">
          <NavigationMenuList className="space-x-4 ">
            <NavigationMenuItem className="dark:text-white ">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink
                  to="/"
                  className={({ isActive, isPending, isTransitioning }) =>
                    cn(
                      isPending && "pending",
                      isActive && "text-blue-500",
                      isTransitioning && "transitioning"
                    )
                  }
                >
                  Home
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark:text-white ">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink
                  to="/cars"
                  className={({ isActive, isPending, isTransitioning }) =>
                    cn(
                      isPending && "pending",
                      isActive && "text-blue-500",
                      isTransitioning && "transitioning"
                    )
                  }
                >
                  Cars
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark:text-white">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink
                  to="/about"
                  className={({ isActive, isPending, isTransitioning }) =>
                    cn(
                      isPending && "pending",
                      isActive && "text-blue-500",
                      isTransitioning && "transitioning"
                    )
                  }
                >
                  About Us
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="dark:text-white">
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink
                  to="/booking"
                  className={({ isActive, isPending, isTransitioning }) =>
                    cn(
                      isPending && "pending",
                      isActive && "text-blue-500",
                      isTransitioning && "transitioning"
                    )
                  }
                >
                  Booking
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* {user && (
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
            )} */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Login/Sign Up Buttons */}
      <div className="space-x-2 hidden lg:inline-block">
        {/* <Button variant={"outline"}>
          <FaMoon />
        </Button>
        <Button variant={"outline"}>
          <FaSun />
        </Button> */}

        {user ? (
          <div className="flex items-center justify-between gap-3">
            <ModeToggle />
            {/* <Button
              className="dark:border-black dark:border"
              onClick={handleLogout}
            >
              Logout
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar name={user?.name} size="45" className=" rounded-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 pl-6">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to={`/dashboard/${user?.role}`} className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Avatar src="http://www.gravatar.com/avatar/a16a38cdfe8b2cbd38e8a56ab93238d3" size="45" className=" rounded-full"/> */}
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
