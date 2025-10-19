import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "@/utils/Loading";
import App from "../App";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Dashboard from "@/components/layout/Dashboard";

// Lazy load all page components
const Login = lazy(() => import("@/pages/login/Login"));
const Home = lazy(() => import("@/pages/home/Home"));
const Register = lazy(() => import("@/pages/register/Register"));
const AboutUsPage = lazy(() => import("@/pages/about/About"));
const CarDetailsPage = lazy(() => import("@/pages/carDetailsPage/CarDetailsPage"));
const CarListingPage = lazy(() => import("@/pages/carListingPage/CarListingPage"));
const BookingPage = lazy(() => import("@/pages/booking/BookingPage"));

// User Dashboard Pages
const UserDashboard = lazy(() => import("@/pages/Dashboard/user/UserDashboard"));
const BookingManagement = lazy(() => import("@/pages/Dashboard/user/BookingManagement"));
const PaymentManagement = lazy(() => import("@/pages/Dashboard/user/PaymentManagement"));

// Admin Dashboard Pages
const AdminDashboard = lazy(() => import("@/pages/Dashboard/admin/AdminDashboard"));
const ManageCars = lazy(() => import("@/pages/Dashboard/admin/ManageCars"));
const ManageBookings = lazy(() => import("@/pages/Dashboard/admin/ManageBookings"));
const ManageReturnCars = lazy(() => import("@/pages/Dashboard/admin/ManageReturnCars"));
const UserManagement = lazy(() => import("@/pages/Dashboard/admin/UserManagement"));
const ReportsPage = lazy(() => import("@/pages/Dashboard/admin/ReportsPage"));

// Error page
const ErrorPage = lazy(() => import("@/pages/ErrorPage/ErrorPage"));

// Wrapper component for Suspense
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Loading loading={true} message="Loading page..." />}>
    {children}
  </Suspense>
);

// Define routes for users
const userRoutes = [
  {
    index: true,
    element: (
      <SuspenseWrapper>
        <UserDashboard />
      </SuspenseWrapper>
    ),
  },
  {
    path: "booking-management",
    element: (
      <SuspenseWrapper>
        <BookingManagement />
      </SuspenseWrapper>
    ),
  },
  {
    path: "payment-management",
    element: (
      <SuspenseWrapper>
        <PaymentManagement />
      </SuspenseWrapper>
    ),
  },
];

// Define routes for admins
const adminRoutes = [
  {
    index: true,
    element: (
      <SuspenseWrapper>
        <AdminDashboard />
      </SuspenseWrapper>
    ),
  },
  {
    path: "manage-cars",
    element: (
      <SuspenseWrapper>
        <ManageCars />
      </SuspenseWrapper>
    ),
  },
  {
    path: "manage-bookings",
    element: (
      <SuspenseWrapper>
        <ManageBookings />
      </SuspenseWrapper>
    ),
  },
  {
    path: "manage-return-cars",
    element: (
      <SuspenseWrapper>
        <ManageReturnCars />
      </SuspenseWrapper>
    ),
  },
  {
    path: "user-management",
    element: (
      <SuspenseWrapper>
        <UserManagement />
      </SuspenseWrapper>
    ),
  },
  {
    path: "reports",
    element: (
      <SuspenseWrapper>
        <ReportsPage />
      </SuspenseWrapper>
    ),
  },
];

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <SuspenseWrapper>
        <ErrorPage />
      </SuspenseWrapper>
    ),
    children: [
      {
        path: "/",
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: "cars",
        element: (
          <SuspenseWrapper>
            <CarListingPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "about",
        element: (
          <SuspenseWrapper>
            <AboutUsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "details/:id",
        element: (
          <SuspenseWrapper>
            <CarDetailsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute allowedRoles={['user', 'admin']}>
            <SuspenseWrapper>
              <BookingPage />
            </SuspenseWrapper>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard/user",
    element: (
      <ProtectedRoute allowedRoles={['user']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: (
      <SuspenseWrapper>
        <ErrorPage />
      </SuspenseWrapper>
    ),
    children: userRoutes,
  },
  {
    path: "/dashboard/admin",
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: (
      <SuspenseWrapper>
        <ErrorPage />
      </SuspenseWrapper>
    ),
    children: adminRoutes,
  },
]);

export default Router;
