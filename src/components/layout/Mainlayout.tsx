import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/navbar";
import { Footer } from "@/pages/home/footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
