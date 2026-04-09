import { useState } from "react";
import BlogContext from "./BlogContext.js";
import { useNavigate } from "react-router-dom";

const BlogContextProvider = ({children}) => {

  const backendUrl = "http://localhost:4000/api/user";

  const [user, setUser] = useState(localStorage.getItem("user") || null);

  const navigate = useNavigate();

  const value = {
    backendUrl,
    user, 
    setUser,
    navigate
  }
  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContextProvider
