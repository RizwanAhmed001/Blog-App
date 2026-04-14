import { Route, Routes, useLocation } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import Hearder from "./components/Hearder";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/register" ||
    (!["/", "/register"].includes(location.pathname) &&
      !location.pathname.startsWith("/blogs/"));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      
      {/* Toast */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      {!hideLayout && (
        <header className="shadow-sm bg-white/90 backdrop-blur z-50 border-b">
          <Hearder />
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route element={<Blogs />} path="/" />
            <Route element={<Blog />} path="/blogs/:blogid" />
            <Route element={<Register />} path="/register" />
            <Route element={<Error />} path="*" />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      {!hideLayout && (
        <footer className="mt-auto border-t border-gray-200">
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default App;