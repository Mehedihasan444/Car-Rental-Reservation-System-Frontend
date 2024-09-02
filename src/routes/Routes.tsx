import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/login/Login";
import Home from "@/pages/home/Home";
import Register from "@/pages/register/Register";
import AboutUsPage from "@/pages/about/About";
import CarDetailsPage from "@/pages/carDetailsPage/CarDetailsPage";
import CarListingPage from "@/pages/carListingPage/CarListingPage";
import Dashboard from "@/components/layout/Dashboard";
import UserDashboard from "@/pages/Dashboard/user/UserDashboard";
import BookingManagement from "@/pages/Dashboard/user/BookingManagement";
import PaymentManagement from "@/pages/Dashboard/user/PaymentManagement";
import AdminDashboard from "@/pages/Dashboard/admin/AdminDashboard";
import ManageCars from "@/pages/Dashboard/admin/ManageCars";
import ManageBookings from "@/pages/Dashboard/admin/ManageBookings";
import ManageReturnCars from "@/pages/Dashboard/admin/ManageReturnCars";
import UserManagement from "@/pages/Dashboard/admin/UserManagement";
import ReportsPage from "@/pages/Dashboard/admin/ReportsPage";
import BookingPage from "@/pages/booking/BookingPage";
import ProtectedRoute from "@/components/layout/ProtectedRoute";


// Define routes for users
const userRoutes = [
    {
      path: "/dashboard/user/user-dashboard",
      element: <UserDashboard />,
    },
    {
      path: "/dashboard/user/booking-management",
      element: <BookingManagement />,
    },
    {
      path: "/dashboard/user/payment-management",
      element: <PaymentManagement />,
    },
  ];
  
  // Define routes for admins
  const adminRoutes = [
    {
      path: "/dashboard/admin/admin-dashboard",
      element: <AdminDashboard />,
    },
    {
      path: "/dashboard/admin/manage-cars",
      element: <ManageCars />,
    },
    {
      path: "/dashboard/admin/manage-bookings",
      element: <ManageBookings />,
    },
    {
      path: "/dashboard/admin/manage-return-cars",
      element: <ManageReturnCars />,
    },
    {
      path: "/dashboard/admin/user-management",
      element: <UserManagement />,
    },
    {
      path: "/dashboard/admin/reports",
      element: <ReportsPage />,
    },
  ];
  

  const Router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <h1>Error</h1>,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "cars",
          element: <CarListingPage />,
        },
        {
          path: "about",
          element: <AboutUsPage />,
        },
        {
          path: "details/:id",
          element: <CarDetailsPage />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "booking",
          element: <BookingPage />,
        },
      ],
    },
    {
      path: "/dashboard/user",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <h1>Error</h1>,
      children: userRoutes,
    },
    {
      path: "/dashboard/admin",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <h1>Error</h1>,
      children: adminRoutes,
    },
  ]);


export default Router;
