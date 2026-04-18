import { useState } from "react"
import AdminBlog from "./AdminBlog"
import { useNavigate } from "react-router-dom";

const AdminBlogProvider = ({children}) => {
  
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate();

  const adminValue = {
    admin,
    setAdmin,
    navigate
  }

  return (
    <AdminBlog.Provider value={adminValue}>
      {children}
    </AdminBlog.Provider>
  )
}

export default AdminBlogProvider
