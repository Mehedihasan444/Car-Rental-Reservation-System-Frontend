import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const Dashboard = () => {
  return (
    <div className="lg:flex justify-between items-center gap-5">
      <div className="lg:w-1/4">
        <DashboardSidebar />
      </div>
      <div className="lg:w-3/4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
