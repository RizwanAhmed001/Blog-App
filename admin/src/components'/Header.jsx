import { useContext } from "react"
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AdminBlog from "../context/AdminBlog";

const Hearder = () => {

  const {admin} = useContext(AdminBlog);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold text-black cursor-pointer">
        <span className="text-blue-900">Quick</span>blog
      </Link>

      <div>
        {
          admin 
          ? (
            <button 
              className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-full transition duration-200"
            >
              Logout <FaArrowRightLong />
            </button>
          ) 
          : (
            <button 
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
