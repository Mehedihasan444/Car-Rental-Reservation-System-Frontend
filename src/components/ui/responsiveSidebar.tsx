import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Drawer,
//   DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Link } from "react-router-dom"



export function ResponsiveSidebar() {


  return (
    <div className="sm:hidden">

    <Drawer>
    <DrawerTrigger asChild>
      <Button variant="outline">
        <Menu className="h-6 w-6" />
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="p-4">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block text-lg font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-lg font-medium">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/booking" className="block text-lg font-medium">
                Booking
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-lg font-medium">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <DrawerFooter className="flex flex-col space-y-2">
          <Link to="/login" className="w-full ">
          <Button className="w-full">Login</Button>
        </Link>
     

        <Link to="/register" className="w-full">
        <Button variant="outline" className="w-full">Sign Up</Button>
        </Link>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
    </div>
  )
}
