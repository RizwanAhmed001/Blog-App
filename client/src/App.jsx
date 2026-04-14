import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import Hearder from "./components/Hearder";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Toast */}
      <ToastContainer />

      {/* Header */}
      {location.pathname === "/register" ? null : (
        <div className="shadow-md bg-white sticky top-0 z-50">
          <Hearder />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route element={<Blogs />} path="/" />
          <Route element={<Blog />} path="/blogs/:blogid" />
          <Route element={<Register />} path="/register" />
          <Route element={<Error />} path="*" />
        </Routes>
      </div>
    </div>
  );
}

export default App;