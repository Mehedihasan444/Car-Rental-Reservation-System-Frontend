
import MainLayout from "./components/layout/MainLayout";
import './utils/forceLogout'; // Import for global debugging

function App() {
  return (
    <div className="dark:bg-slate-900">
      <MainLayout />
    </div>
  );
}

export default App;
