import { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useContext } from "react";
import BlogContext from "../context/BlogContext";
import axios from "axios";

const Register = () => {
  const { backendUrl, setUser, navigate, user } = useContext(BlogContext);

  const [login, setLogin] = useState(true);
  const [passwordVis, setPasswordVis] = useState(true);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserDetails((user) => ({
      ...user,
      [name]: value,
    }));

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!login) {
        if (userDetails.password !== userDetails.confirmPassword) {
          toast.info("Mismatch in confirm password!");
          return;
        }

        const response = await axios.post(
          backendUrl + "/register",
          {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
          },
          { withCredentials: true },
        );

        if (response.data.success) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("User Register!")
          setUserDetails({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        } else {
          toast.warning(response.data.message);
        }

      } else {
        const response = await axios.post(
          backendUrl + "/login",
          {
            email: userDetails.email,
            password: userDetails.confirmPassword,
          },
          { withCredentials: true },
        );

        if (response.data.success) {
          setUser(response.data.user);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          toast.success("User Login!")
          setUserDetails({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigate("/");
        } else {
          toast.warning(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 w-[320px] shadow">
        {!login && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              <span className="relative inline-block">
                Re
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500"></span>
              </span>
              gistration
            </h2>

            {/* Name */}
            <div className="flex items-center border-b border-gray-400 py-2 focus-within:border-blue-500">
              <LuUser className="mr-2 text-gray-500" />
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="outline-none w-full bg-transparent"
                required
              />
            </div>

            {/* Email */}
            <div className="flex items-center border-b border-gray-400 py-2 focus-within:border-blue-500">
              <MdOutlineEmail className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="outline-none w-full bg-transparent"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center border-b border-gray-400 py-2 focus-within:border-blue-500">
              <IoLockClosedOutline className="mr-2 text-gray-500" />
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="Create password"
                className="outline-none w-full bg-transparent"
                required
              />
            </div>

            {/* Confirm Password */}
            <div className="flex items-center border-b border-gray-400 py-2 focus-within:border-blue-500">
              <IoLockClosedOutline className="mr-2 text-gray-500" />
              <input
                type={passwordVis ? "password" : "text"}
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="outline-none w-full bg-transparent"
                required
              />
              {passwordVis ? (
                <FaRegEye
                  className="cursor-pointer text-gray-500"
                  onClick={() => setPasswordVis(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="cursor-pointer text-gray-500"
                  onClick={() => setPasswordVis(true)}
                />
              )}
            </div>

            <button className="bg-blue-500 text-white py-2 hover:bg-blue-600 transition">
              Register Now
            </button>

            <p className="text-sm text-center">
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setLogin(true)}
              >
                Login now
              </span>
            </p>
          </form>
        )}

        {login && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">
              <span className="relative inline-block">
                Lo
                <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500"></span>
              </span>
              gin
            </h2>

            {/* Email */}
            <div className="flex items-center border-b border-gray-400 py-2 focus-within:border-blue-500">
              <MdOutlineEmail className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="outline-none w-full bg-transparent"
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center border-b border-gray-400 py-2 focus-within:border-blue-500">
              <IoLockClosedOutline className="mr-2 text-gray-500" />
              <input
                type={passwordVis ? "password" : "text"}
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleChange}
                placeholder="Enter password"
                className="outline-none w-full bg-transparent"
                required
              />
              {passwordVis ? (
                <FaRegEye
                  className="cursor-pointer text-gray-500"
                  onClick={() => setPasswordVis(false)}
                />
              ) : (
                <FaRegEyeSlash
                  className="cursor-pointer text-gray-500"
                  onClick={() => setPasswordVis(true)}
                />
              )}
            </div>

            <button className="bg-blue-500 text-white py-2 hover:bg-blue-600 transition">
              Login Now
            </button>

            <p className="text-sm text-center">
              Don’t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => setLogin(false)}
              >
                Signup now
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
