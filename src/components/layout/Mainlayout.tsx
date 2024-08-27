import { Outlet } from "react-router-dom";
import { Navbar } from "../ui/navbar";


const Mainlayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Mainlayout;