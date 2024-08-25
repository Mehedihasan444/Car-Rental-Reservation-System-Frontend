import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const Router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        errorElement:<h1>Error</h1>,
        children:[
            {
                path:"",
                element:<h2>Home</h2>
            },
            {
                path:"about",
                element:<h2>About</h2>
            },
            {
                path:"contact",
                element:<h2>Contact</h2>
            }
        ]
    }
])

export default Router;