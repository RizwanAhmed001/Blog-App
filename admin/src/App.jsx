import { ToastContainer } from "react-toastify";
import Hearder from "./components'/Header";
import Sidebar from "./components'/Sidebar";
import { Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <div>
      <ToastContainer />
      <Hearder />
      {location.pathname === "/login" ? (
        <AdminLogin />
      ) : (
        <div>
          <Sidebar />
          <Routes>
            
          </Routes>
        </div>
      )}
    </div>
  );
}

export default App;
