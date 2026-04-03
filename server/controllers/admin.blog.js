
export const adminBlog = async (req, res) => {
  try {
    return res.json("Admin Working!")
  } catch (error) {
    return res.json("Admin Not Working!")
  }
}