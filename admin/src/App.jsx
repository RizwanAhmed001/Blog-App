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
    <div className="h-screen flex flex-col bg-gray-100">
      <ToastContainer />

      {location.pathname === "/login" ? (
        <AdminLogin />
      ) : (
        <>
          {/* HEADER */}
          <header className="h-[70px] bg-white shadow flex-shrink-0 z-10">
            <Header />
          </header>

          {/* BODY */}
          <div className="flex flex-1 overflow-hidden">
            
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r shadow-sm overflow-y-auto">
              <Sidebar />
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/addblog" element={<AddBlog />} />
                <Route path="/blogLists" element={<BlogLists />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </main>

          </div>
        </>
      )}
    </div>
  );
}

export default App;