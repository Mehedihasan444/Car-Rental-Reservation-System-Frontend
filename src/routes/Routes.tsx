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
    ],
  },
  {
    path:"/dashboard",
    element: <Dashboard/>,
    errorElement: <h1>Error</h1>,
    children: [
      {
path:"/dashboard/user-dashboard",
element:<UserDashboard/>
      }]
  }
]);

export default Router;
