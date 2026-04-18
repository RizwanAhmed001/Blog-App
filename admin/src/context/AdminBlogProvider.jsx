import { useState } from "react"
import AdminBlog from "./AdminBlog"
import { useNavigate } from "react-router-dom";

const AdminBlogProvider = ({children}) => {
  
  const [admin, setAdmin] = useState(null);

  const [currentPage, setCurrentPage] = useState("");

  const navigate = useNavigate();

  const adminValue = {
    admin,
    setAdmin,
    navigate,
    currentPage,
    setCurrentPage
  }

  return (
    <AdminBlog.Provider value={adminValue}>
      {children}
    </AdminBlog.Provider>
  )
}

export default AdminBlogProvider
