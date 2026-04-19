import { useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AdminBlog from "../context/AdminBlog";

const Header = () => {
  const { admin, setAdmin, navigate } = useContext(AdminBlog);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <div className="h-full flex items-center justify-between px-6">
      
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <span className="text-blue-900">Quick</span>
        <span className="text-gray-800">Blog</span>
      </Link>

      {/* Button */}
      <button
        onClick={admin ? handleLogout : () => navigate("/login")}
        className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-full text-sm font-medium transition"
      >
        {admin ? "Logout" : "Login"}
        <FaArrowRightLong />
      </button>
    </div>
  );
};

export default Header;