import { useEffect, useContext, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import AdminBlog from "../context/AdminBlog";
import { toast } from "react-toastify";
import axios from "axios";

const Comments = () => {
  const { backendUrl, admin, navigate } = useContext(AdminBlog);

  const [approved, setApproved] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!admin) {
      navigate("/login");
    }
  }, [admin]);

  const getComments = async () => {
    try {
      const response = await axios.get(backendUrl + "/allcomments", {
        withCredentials: true,
      });

      if (response.data.success) {
        const filtered = response.data.comments.filter(
          (c) => c.approved === approved
        );
        setComments(filtered);
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handledelete = async (commentId, blogId) => {
    try {

      const deleteComment = confirm("You Want To Delete This Comment");

      if(!deleteComment){
        return;
      };

      const response = await axios.delete(backendUrl + `/deletecomment/${blogId}/${commentId}`, {withCredentials: true});

      if(response.data.success){
        toast.success("Comment Deleted!")
        location.reload();
      }else{
        toast.warn(response.data.message)
      }


    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleToggle = async (commentId, blogId) => {
    try {
      const response = await axios.put(backendUrl + `/togglecomment/${blogId}/${commentId}`, {}, {withCredentials: true});

      if(response.data.success){
        toast.success("Action Successed!");
        location.reload();
      }else{
        toast.warn(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getComments();
  }, [approved]);

  return (
    <div className="h-[80vh] flex flex-col p-4 bg-gray-50 rounded-xl shadow">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Comments</h2>

        <div className="flex gap-2">
          <button
            onClick={() => setApproved(!approved)}
            className={`px-3 py-1 rounded ${
              approved ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Approved
          </button>

          <button
            onClick={() => setApproved(false)}
            className={`px-3 py-1 rounded ${
              !approved ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
          >
            Non Approved
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto border rounded-lg bg-white">
        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="p-3">Details</th>
              <th className="p-3">Action</th>
              <th className="p-3 text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {comments.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center p-6">
                  No Comments Found
                </td>
              </tr>
            ) : (
              comments.map((comment) => (
                <tr
                  key={comment._id}
                  className="border-t hover:bg-gray-50"
                >
                  {/* ✅ FIXED structure */}
                  <td className="p-3 space-y-1">
                    <p><span className="font-semibold">Blog:</span> {comment.blogTitle}</p>
                    <p><span className="font-semibold">Name:</span> {comment.name}</p>
                    <p><span className="font-semibold">Comment:</span> {comment.comment}</p>
                  </td>

                  {/* Status */}
                  <td className="p-3" onClick={() => handleToggle(comment._id, comment.blogId)}>
                    <span
                      className={`px-2 py-1 text-xs rounded cursor-pointer border  ${
                        comment.approved
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {comment.approved ? "Approved" : "Not Approved"}
                    </span>
                  </td>

                  {/* Delete */}
                  <td className="p-3 text-center">
                    <AiOutlineDelete onClick={() => handledelete(comment._id, comment.blogId)} className="text-red-500 cursor-pointer hover:scale-110 transition" />
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Comments;