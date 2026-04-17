import AdminBlog from "./AdminBlog"

const AdminBlogProvider = ({children}) => {
  const adminValue = {
    "name": "Admin"
  }
  return (
    <AdminBlog.Provider value={adminValue}>
      {children}
    </AdminBlog.Provider>
  )
}

export default AdminBlogProvider
