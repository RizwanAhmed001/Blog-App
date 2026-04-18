import { ToastContainer } from "react-toastify";
import Hearder from "./components'/Header";
import Sidebar from "./components'/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";
import BlogLists from "./pages/BlogLists";
import Comments from "./pages/Comments";
import Error from "./pages/Error";

function App() {

  const location = useLocation(); // ✅ FIX

  return (
    <div className="min-h-screen">
      <ToastContainer />
      <Hearder />

      {location.pathname === "/login" ? (
        <AdminLogin />
      ) : (
        <div className="flex flex-col md:flex-row">
          
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addblog" element={<AddBlog />} />
              <Route path="/blogLists" element={<BlogLists />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;