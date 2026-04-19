import { TbSmartHome, TbLibraryPlus } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import { useContext } from "react";
import AdminBlog from "../context/AdminBlog";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { currentPage, setCurrentPage } = useContext(AdminBlog);

  const getClass = (page) =>
    `flex items-center gap-3 py-3 cursor-pointer transition-all
    ${
      currentPage === page
        ? "bg-blue-100 border-r-2 border-blue-900 text-blue-900 font-semibold"
        : "text-gray-600 hover:bg-gray-100 px-2"
    }`;

  return (
    <div className="py-2  space-y-2">

      <Link
        to="/"
        onClick={() => setCurrentPage("Dashboard")}
        className={getClass("Dashboard")}
      >
        <TbSmartHome size={20} />
        <span>Dashboard</span>
      </Link>

      <Link
        to="/addblog"
        onClick={() => setCurrentPage("add")}
        className={getClass("add")}
      >
        <TbLibraryPlus size={20} />
        <span>Add Blog</span>
      </Link>

      <Link
        to="/blogLists"
        onClick={() => setCurrentPage("blog")}
        className={getClass("blog")}
      >
        <HiOutlineClipboardList size={20} />
        <span>Blog Lists</span>
      </Link>

      <Link
        to="/comments"
        onClick={() => setCurrentPage("comment")}
        className={getClass("comment")}
      >
        <FaRegCommentDots size={20} />
        <span>Comments</span>
      </Link>

    </div>
  );
};

export default Sidebar;