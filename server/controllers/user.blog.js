

export const userBlog = async (req, res) => {
  try {
    return res.json("User Working!")
  } catch (error) {
    return res.json("User Not Working!")
  }
}