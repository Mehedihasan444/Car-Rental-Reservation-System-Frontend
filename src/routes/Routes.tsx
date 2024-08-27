import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/login/Login";
import Home from "@/pages/home/Home";
import Register from "@/pages/register/Register";

const Router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<h1>Error</h1>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"register",
                element:<Register/>
            },
            {
                path:"login",
                element:<Login/>
            }
        ]
    }
])

export default Router;