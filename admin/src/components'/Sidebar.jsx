import { TbSmartHome } from "react-icons/tb";
import { TbLibraryPlus } from "react-icons/tb";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import { useContext } from "react";
import AdminBlog from "../context/AdminBlog";

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
    <div className="
      w-full md:w-64 
      h-auto md:h-screen 
      bg-gray-100 
      flex md:flex-col justify-around md:justify-start
    ">
      
      <div onClick={() => setCurrentPage("Dashboard")} className={getClass("Dashboard")}>
        <TbSmartHome />
        <h2 className="hidden sm:block">Dashboard</h2>
      </div>

      <div onClick={() => setCurrentPage("add")} className={getClass("add")}>
        <TbLibraryPlus />
        <h2 className="hidden sm:block">Add Blog</h2>
      </div>

      <div onClick={() => setCurrentPage("blog")} className={getClass("blog")}>
        <HiOutlineClipboardList />
        <h2 className="hidden sm:block">Blog Lists</h2>
      </div>

      <div onClick={() => setCurrentPage("comment")} className={getClass("comment")}>
        <FaRegCommentDots />
        <h2 className="hidden sm:block">Comments</h2>
      </div>

    </div>
  );
};

export default Sidebar;