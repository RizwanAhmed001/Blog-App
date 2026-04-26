import { useContext, useEffect, useState } from "react";
import BlogContext from "../context/BlogContext";
import { BsStars } from "react-icons/bs";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { lazy } from "react";

const Email = lazy(() => import("../components/Email"));

const Blogs = () => {
  const { user, navigate, backendUrl } = useContext(BlogContext);

  const [allBlogs, setAllBlogs] = useState([]);
  const [searchBlog, setSearchBlog] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  const getBlogs = async () => {
    try {
      const response = await axios.get(backendUrl + "/allblogs", {
        withCredentials: true,
      });

      if (response.data.success) {
        setAllBlogs(response.data.allBlogs);
        setSearchBlog(response.data.allBlogs);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSearchBlog(allBlogs);
      return;
    }

    const filterBlog = allBlogs.filter((blog) =>
      `${blog.blogTitle} ${blog.subTitle}`
        .toLowerCase()
        .includes(value.toLowerCase()),
    );

    setSearchBlog(filterBlog);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className="px-4 md:px-10 py-8">
      {/* Center Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm mb-4">
          <BsStars />
          <span className="font-medium">New: feature integrated</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          Your own <span className="text-blue-900">blogging</span> <br />
          platform.
        </h2>

        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6">
          This is your space to think out loud, to share what matters, and to
          write without filters.
        </p>

        {/* Search */}
        <div className="flex w-full max-w-md mx-auto border border-gray-300 rounded overflow-hidden">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search for blogs"
            className="grow px-4 py-3 outline-none text-sm"
          />
          <button className="px-6 bg-blue-900 text-white hover:bg-blue-800 transition">
            Search
          </button>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {searchBlog.map((blog) => (
          <Link
            to={`/blogs/${blog._id}`}
            key={blog._id}
            className="rounded shadow-md overflow-hidden hover:shadow-xl transition bg-white"
          >
            <img
              src={blog.image}
              alt="blog"
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900">
                {blog.blogTitle}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {blog.subTitle}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Email Section */}
      <div className="mt-12">
        <Email />
      </div>
    </div>
  );
};

export default Blogs;
