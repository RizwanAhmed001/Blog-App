import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import AdminBlog from "../context/AdminBlog";

const AddBlog = () => {
  const { admin, backendUrl, navigate } = useContext(AdminBlog);

  const [blogData, setBlogData] = useState({
    file: null,
    blogTitle: "",
    subTitle: "",
    blogDescription: "",
  });

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setBlogData({ ...blogData, file: files[0] });
    } else {
      setBlogData({ ...blogData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", blogData.file);
    formData.append("blogTitle", blogData.blogTitle);
    formData.append("subTitle", blogData.subTitle);
    formData.append("blogDescription", blogData.blogDescription);

    try {
      const response = await axios.post(
        backendUrl + "/newblog",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Blog added successfully!");
        navigate("/");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-[70vh] px-4">
      
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-5 rounded shadow-md space-y-4 overflow-y-auto"
      >
        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-800 text-center">
          Add New Blog
        </h2>

        {/* File Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Upload Thumbnail
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="w-full border border-gray-300 p-1 rounded text-sm cursor-pointer"
            required
          />
        </div>

        {/* Blog Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Blog Title
          </label>
          <input
            type="text"
            name="blogTitle"
            placeholder="Enter blog title"
            onChange={handleChange}
            required
            className="w-full px-1 py-1 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sub Title */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Sub Title
          </label>
          <input
            type="text"
            name="subTitle"
            placeholder="Enter subtitle"
            onChange={handleChange}
            required
            className="w-full px-1 py-1 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Blog Description
          </label>
          <textarea
            name="blogDescription"
            rows="3"
            placeholder="Write your blog..."
            onChange={handleChange}
            required
            className="w-full px-1 py-1 border border-gray-300 rounded text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-blue-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-800 transition"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;