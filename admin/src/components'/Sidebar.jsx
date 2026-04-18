import { TbSmartHome } from "react-icons/tb";
import { TbLibraryPlus } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import { useContext } from "react";
import AdminBlog from "../context/AdminBlog";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { currentPage, setCurrentPage } = useContext(AdminBlog);

  const getClass = (page) =>
    `flex items-center gap-3 p-2 md:p-3 cursor-pointer transition-all
     ${
       currentPage === page
         ? "bg-blue-100 border-r-4 md:border-r-4 border-b-2 md:border-b-0 border-blue-900 text-blue-900"
         : "text-gray-700 hover:bg-gray-200"
     }`;

  return (
    <div
      className="
      w-full md:w-64 
  h-[85vh] 
  overflow-y-auto
  border-r-2 border-gray-100 
  flex md:flex-col justify-around md:justify-start
    "
    >
      <Link
        to={"/"}
        onClick={() => setCurrentPage("Dashboard")}
        className={getClass("Dashboard")}
      >
        <TbSmartHome />
        <h2 className="hidden sm:block">Dashboard</h2>
      </Link>

      <Link
        to={"/addBlog"}
        onClick={() => setCurrentPage("add")}
        className={getClass("add")}
      >
        <TbLibraryPlus />
        <h2 className="hidden sm:block">Add Blog</h2>
      </Link>

      <Link
        to={"/blogLists"}
        onClick={() => setCurrentPage("blog")}
        className={getClass("blog")}
      >
        <HiOutlineClipboardList />
        <h2 className="hidden sm:block">Blog Lists</h2>
      </Link>

      <Link
        to={"/comments"}
        onClick={() => setCurrentPage("comment")}
        className={getClass("comment")}
      >
        <FaRegCommentDots />
        <h2 className="hidden sm:block">Comments</h2>
      </Link>
    </div>
  );
};

export default Sidebar;
