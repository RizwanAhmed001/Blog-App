import { ToastContainer } from "react-toastify";
import Header from "./components'/Header";
import Sidebar from "./components'/Sidebar";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";
import BlogLists from "./pages/BlogLists";
import Comments from "./pages/Comments";
import Error from "./pages/Error";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />

      {location.pathname === "/login" ? (
        <AdminLogin />
      ) : (
        <div className="flex flex-col h-screen">
          <div className="h-[10vh] shadow bg-white z-10">
            <Header />
          </div>

          <div className="flex flex-1 overflow-hidden">
            <div className="w-64 bg-white border-r h-full overflow-y-auto">
              <Sidebar />
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/blogLists" element={<BlogLists />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
