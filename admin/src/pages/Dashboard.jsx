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
  }, []);

  return (
    <div className="h-[75vh] flex flex-col p-4 bg-gray-50 rounded-xl shadow">
      {/* Cards (fixed top) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
          <CiCalendar className="text-3xl text-blue-500" />
          <div>
            <p className="text-xl font-semibold">{blogsLen}</p>
            <span className="text-gray-500 text-sm">Blogs</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
          <TbMessages className="text-3xl text-green-500" />
          <div>
            <p className="text-xl font-semibold">{comments}</p>
            <span className="text-gray-500 text-sm">Comments</span>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow">
          <MdOutlineDrafts className="text-3xl text-yellow-500" />
          <div>
            <p className="text-xl font-semibold">0</p>
            <span className="text-gray-500 text-sm">Drafts</span>
          </div>
        </div>
      </div>

      {/* Content Area (scrollable) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <h2 className="text-xl font-semibold mb-2">Latest Blogs</h2>

        <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">Blog Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
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
                  <tr key={blog._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{blog.blogTitle}</td>
                    <td className="p-3">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          blog.status
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
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
