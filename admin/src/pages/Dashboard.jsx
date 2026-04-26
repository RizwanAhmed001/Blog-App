import { useContext, useEffect, useState } from "react";
import AdminBlog from "../context/AdminBlog";
import { CiCalendar } from "react-icons/ci";
import { TbMessages } from "react-icons/tb";
import { MdOutlineDrafts } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const { backendUrl, admin, navigate } = useContext(AdminBlog);

  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState(0);
  const [blogsLen, setBlogsLen] = useState(0);

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  const getData = async () => {
    try {
      const response = await axios.get(backendUrl + "/dashboard", {
        withCredentials: true,
      });

      if (response.data.success) {
        setBlogsLen(response.data.blogLen);
        setComments(response.data.commentLen);
        setBlogs(response.data.blogs);
      } else {
        toast.warn("Something Went Wrong!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [admin]);

  return (
    <div className="h-[75vh] flex flex-col p-4">
      {/* Cards (fixed top) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-4 bg-white p-4 rounded shadow">
          <CiCalendar className="text-6xl text-blue-900 px-4 py-4 rounded bg-gray-50" />
          <div>
            <p className="text-xl font-semibold">{blogsLen}</p>
            <span className="text-gray-500 text-sm">Blogs</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded shadow">
          <TbMessages className="text-6xl text-blue-900  px-4 py-4 rounded bg-gray-100" />
          <div>
            <p className="text-xl font-semibold">{comments}</p>
            <span className="text-gray-500 text-sm">Comments</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded shadow">
          <MdOutlineDrafts className="text-6xl text-blue-900  px-4 py-4 rounded bg-gray-100" />
          <div>
            <p className="text-xl font-semibold">0</p>
            <span className="text-gray-500 text-sm">Drafts</span>
          </div>
        </div>
      </div>

      {/* Content Area (scrollable) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <h2 className="text-xl font-semibold mb-2">Latest Blogs</h2>

        <div className="flex-1 overflow-y-auto bg-white rounded shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-white sticky top-0 z-10">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">BLOG TITLE</th>
                <th className="p-3">DATE</th>
                <th className="p-3">STATUS</th>
              </tr>
            </thead>

            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6">
                    No Blogs Found
                  </td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr key={blog._id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{blog.blogTitle}</td>
                    <td className="p-3">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          blog.status
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {blog.status ? "Published" : "Unpublish"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
