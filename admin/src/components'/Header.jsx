import { useContext } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AdminBlog from "../context/AdminBlog";
import {toast} from "react-toastify";
import axios from "axios";

const Header = () => {
  const { admin, setAdmin, navigate, backendUrl } = useContext(AdminBlog);

  const handleLogout = async () => {
    try {
      const response = await axios.post(backendUrl + "/logout", {}, {withCredentials: true});

      if(response.data.success){
        setAdmin(null);
        localStorage.removeItem("admin");
        navigate("/login")
      }else{
        toast.warn("Error While Loggin Out!")
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="h-full flex items-center justify-between px-6">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <span className="text-blue-900">Quick</span>
        <span className="text-gray-800">Blog</span>
      </Link>

      {/* Button */}
      {admin ? (
        <button onClick={handleLogout} className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-full text-sm font-medium transition">
          Logout
          <FaArrowRightLong />
        </button>
      ) : (
        <button onClick={() => navigate("/login")} className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-full text-sm font-medium transition">
          Login
          <FaArrowRightLong />
        </button>
      )}
    </div>
  );
};

export default Header;
