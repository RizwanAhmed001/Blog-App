import { useContext, useEffect, useState } from "react";
import AdminBlog from "../context/AdminBlog";
import { toast } from "react-toastify";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

const BlogLists = () => {
  const { backendUrl, admin, navigate } = useContext(AdminBlog);

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  const getBlogData = async () => {
    try {
      const response = await axios.get(backendUrl + "/allblogs", {
        withCredentials: true,
      });

      if (response.data.success) {
        setBlogData(response.data.allBlogs);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {

    const deleteBlog = confirm("Want To Delete This Blog!")

    if(!deleteBlog){
      return ;
    };

    try {
      const response = await axios.delete(backendUrl + `/deleteblog/${id}`, {withCredentials: true});

      

      if(response.data.success){
        toast.success("Blog Deleted!")
        location.reload();
      }else{
        toast.warn(response.data.message);
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const toggleStatus = async (id) => {
    try {
      const response = await axios.put(backendUrl + `/togglestatus/${id}`, {}, {withCredentials: true});

      if(response.data.success){
        toast.success("Status Updated!")
        location.reload();
      }else{
        toast.warn(response.dara.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div className="h-[78vh] flex flex-col p-3 bg-gray-50 rounded-xl shadow">
      
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">All Blogs</h2>

      {/* Table Container (Scrollable) */}
      <div className="flex-1 overflow-y-auto border rounded-lg bg-white">
        
        <table className="w-full text-sm text-left">
          
          {/* Header */}
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Blog Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>

          {/* Body */}
          {blogData.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan="6" className="text-center p-6">
                  <p>No Blog To Show!</p>
                  <button
                    onClick={() => navigate("/addblog")}
                    className="mt-2 text-blue-500 underline"
                  >
                    Create Your First Blog
                  </button>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {blogData.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3 font-medium">{blog.blogTitle}</td>

                  <td className="p-3">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        blog.status
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {blog.status ? "Published" : "Unpublish"}
                    </span>
                  </td>

                  {/* Toggle Action */}
                  <td onClick={() => toggleStatus(blog._id)} className="p-3">
                    <button className="text-blue-500 hover:underline">
                      {blog.status ? "Unpublish" : "Publish"}
                    </button>
                  </td>

                  {/* Delete */}
                  <td onClick={() => handleDelete(blog._id)} className="p-3 text-center">
                    <AiOutlineDelete className="text-red-500 cursor-pointer hover:scale-110 transition" />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default BlogLists;