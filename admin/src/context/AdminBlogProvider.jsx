import { useState } from "react"
import AdminBlog from "./AdminBlog"
import { useNavigate } from "react-router-dom";

const AdminBlogProvider = ({children}) => {
  
  const [admin, setAdmin] = useState(() => {
  const storedAdmin = localStorage.getItem("admin");
  return storedAdmin ? JSON.parse(storedAdmin) : null;
});

  const [currentPage, setCurrentPage] = useState("");

  const navigate = useNavigate();

  const backendUrl = "http://localhost:4000/api/admin"

  const adminValue = {
    admin,
    setAdmin,
    navigate,
    currentPage,
    setCurrentPage,
    backendUrl
  }

  return (
    <AdminBlog.Provider value={adminValue}>
      {children}
    </AdminBlog.Provider>
  )
}

export default AdminBlogProvider
