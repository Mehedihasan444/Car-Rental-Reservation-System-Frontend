import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    console.log('📊 Dashboard Component RENDERED', {
      currentPath: window.location.pathname,
      currentUrl: window.location.href
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <div className="w-full lg:w-72 shadow-2xl">
        <DashboardSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
