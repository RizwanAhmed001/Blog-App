import { useContext } from "react"
import AdminBlog from "../context/AdminBlog"
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const BlogLists = () => {

  const {backendUrl, admin, navigate} = useContext(AdminBlog);

  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    if(!admin){
      navigate("/login")
    }
  }, [admin])

  const getBlogData = async () => {
    try {
      const response = await axios.get(backendUrl + "/allblogs", {withCredentials: true});
      console.log(response);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getBlogData();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>

      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Blog Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          {

          }
        </table>
      </div>
    </div>
  )
}

export default BlogLists
