import { Outlet } from "react-router-dom";


const Mainlayout = () => {
    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default Mainlayout;