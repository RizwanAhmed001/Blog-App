import BlogContext from "./BlogContext.js";

const BlogContextProvider = ({children}) => {
  const value = {
    owner: "Rizwan"
  }
  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContextProvider
