import { v2 as cloudinary } from "cloudinary";
import BlogModel from "../models/blog.model.js";

export const createBlog = async (req, res) => {
  try {
    const { id } = req.admin;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    const file = req.file;

    const { blogTitle, subTitle, blogDescription } = req.body;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "File Is Required!" });
    }

    if (!blogTitle || !subTitle || !blogDescription) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const newBlog = new BlogModel({
      admin: id, image: result.secure_url, blogTitle, subTitle, blogDescription
    })

    await newBlog.save();

    return res.status(201).json({ success: true, message: "New Blog Created!", blog: {image: newBlog.image, title: newBlog.blogTitle}});
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePublished = async (req, res) => {
  try {

    const {id} = req.admin;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    const {blogid} = req.params;

    if(!blogid){
      return res
        .status(404)
        .json({ success: false, message: "Blog Id Is Required!" });
    }

    const blogPost = await BlogModel.findById(blogid);

    if(!blogPost){
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Exist!" });
    }

    blogPost.status = !blogPost.status;

    await blogPost.save();

    return res.status(200).json({
      success: true,
      message: blogPost.status
        ? "Blog Published"
        : "Blog Unpublished",
      status: blogPost.status,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
