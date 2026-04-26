import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { lazy } from "react";

const Header = lazy(() => import("./components'/Header"));
const Sidebar = lazy(() => import("./components'/Sidebar"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddBlog = lazy(() => import("./pages/AddBlog"));
const BlogLists = lazy(() => import("./pages/BlogLists"));
const Comments = lazy(() => import("./pages/Comments"));
const Error = lazy(() => import("./pages/Error"));

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
          <header className="h-[70px] bg-white border-b border-gray-300 flex-shrink-0 z-10">
            <Header />
          </header>

          {/* BODY */}
          <div className="flex flex-1 overflow-hidden">
            
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r border-r-gray-300 overflow-y-auto">
              <Sidebar />
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 overflow-y-auto p-6 bg-blue-50">
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