import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BlogContext from "../context/BlogContext";
import { CgProfile } from "react-icons/cg";

const Blog = () => {
  const { blogid } = useParams();

  const { user, backendUrl, navigate } = useContext(BlogContext);

  const [sinBlog, setSinBlog] = useState({
    comments: [],
  });

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  }, [user]);

  const singleBlog = async () => {
    try {
      const response = await axios.get(backendUrl + `/singleblog/${blogid}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setSinBlog(response.data.singleBlog);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    singleBlog();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* ✅ CENTERED HEADER */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-blue-700 px-4 py-1 rounded-full text-sm mb-4">
          <span className="font-medium">
            Published on{" "}
            {sinBlog.createdAt
              ? new Date(sinBlog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">
          {sinBlog.blogTitle}
        </h1>

        <p className="text-gray-600 mt-2">{sinBlog.subTitle}</p>

        <div className="flex justify-center items-center gap-2 mt-3 text-gray-700">
          <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm mb-4">
            <CgProfile />
            <span className="font-medium">{sinBlog.admin?.name}</span>
          </div>
        </div>
      </div>

      {/* Image */}
      <img
        src={sinBlog.image}
        alt="blog"
        className="w-full h-[300px] md:h-[400px] object-cover rounded-xl shadow-md mb-8"
      />

      {/* Content */}
      <div className="text-gray-700 leading-7 mb-10">
        {sinBlog.blogDescription}
      </div>

      {/* Comments */}
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">
          Comments ({sinBlog.comments.length})
        </h3>

        {/* Comments List */}
        {sinBlog.comments.length > 0 ? (
          sinBlog.comments.map((comment) => (
            <div key={comment._id} className="border-b py-4 flex gap-3">
              <CgProfile className="text-2xl text-gray-500" />
              <div>
                <h4 className="font-semibold text-gray-800">{comment.name}</h4>
                <p className="text-gray-600 text-sm">{comment.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}

        {/* ✅ Add Comment (Better Width + Left Button) */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Add your comment</h3>

          <div className="flex flex-col gap-4 max-w-md">
            {/* Name */}
            <input
              type="text"
              placeholder="Your name"
              className="border border-gray-300 px-3 py-2 rounded outline-none"
            />

            {/* Comment */}
            <textarea
              placeholder="Write your comment..."
              rows="4"
              className="border border-gray-300 px-3 py-2 rounded outline-none"
            ></textarea>

            {/* ✅ Small Left Button */}
            <button className="bg-blue-900 text-white px-5 py-2 rounded w-fit hover:bg-blue-600 transition">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
