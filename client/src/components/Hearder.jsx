import { useContext } from "react"
import BlogContext from "../context/BlogContext"
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";

const Hearder = () => {

  const {user, navigate, backendUrl, setUser} = useContext(BlogContext);

  const handleLogout = async () => {
    try {
      const response = await axios.post(backendUrl + "/logout", {}, {withCredentials: true});

      if(response.data.success){
        setUser(null);
        localStorage.removeItem("user")
        navigate("/register");
      }else{
        toast.warning(response.data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-black cursor-pointer">
        Quickblog
      </h1>

      <div>
        {
          user 
          ? (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-full transition duration-200"
            >
              Logout <FaArrowRightLong />
            </button>
          ) 
          : (
            <button 
              onClick={() => navigate("/register")}
              className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-full transition duration-200"
            >
              Login <FaArrowRightLong />
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Hearder