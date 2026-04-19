import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminBlog from "../context/AdminBlog";

const AdminLogin = () => {
  const { backendUrl, admin, setAdmin, navigate } = useContext(AdminBlog);

  const [adminData, setAdminData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (admin) {
      navigate("/");
    }
  }, [admin]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        backendUrl + "/login",
        adminData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Admin Login Successful!");
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        setAdmin(response.data.admin);
        navigate("/");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded p-8"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">
          <span className="text-blue-900">Admin</span> Login
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Enter your credentials to access the admin panel
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            value={adminData.email}
            onChange={handleChange}
            name="email"
            id="email"
            placeholder="your email id"
            required
            className="w-full px-2 py-2 border-b border-gray-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            value={adminData.password}
            onChange={handleChange}
            name="password"
            id="password"
            placeholder="your password"
            required
            className="w-full px-2 py-2 border-b border-gray-500 outline-none"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 font-medium hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;