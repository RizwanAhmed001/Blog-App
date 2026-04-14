import { useContext, useEffect } from "react"
import BlogContext from "../context/BlogContext"

const Blogs = () => {

  const {user, navigate} = useContext(BlogContext);

  useEffect(() => {
    if(!user){
      navigate("/register")
    }
  }, [user])
  return (
    <div>
      Blogs
    </div>
  )
}

export default Blogs
