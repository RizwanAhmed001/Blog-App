import { useContext, useEffect } from "react"
import BlogContext from "../context/BlogContext"
import Email from "../components/Email";

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

      <Email />
    </div>
  )
}

export default Blogs
