import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "@/pages/login/Login";
import Home from "@/pages/home/Home";

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
                path:"about",
                element:<h2>About</h2>
            },
            {
                path:"login",
                element:<Login/>
            }
        ]
    }
])

export default Router;