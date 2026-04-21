import { v2 as cloudinary } from "cloudinary";
import BlogModel from "../models/blog.model.js";
import UserModel from "../models/user.model.js";
import AdminModel from "../models/admin.model.js";

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
      admin: id,
      image: result.secure_url,
      blogTitle,
      subTitle,
      blogDescription,
    });

    await newBlog.save();

    return res.status(201).json({
      success: true,
      message: "New Blog Created!",
      blog: { image: newBlog.image, title: newBlog.blogTitle },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePublished = async (req, res) => {
  try {
    const { id } = req.admin;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    const { blogid } = req.params;

    if (!blogid) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Id Is Required!" });
    }

    const blogPost = await BlogModel.findById(blogid);

    if (!blogPost) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Exist!" });
    }

    blogPost.status = !blogPost.status;

    await blogPost.save();

    return res.status(200).json({
      success: true,
      message: blogPost.status ? "Blog Published" : "Blog Unpublished",
      status: blogPost.status,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    const userExist = await UserModel.findById(id);

    if (!userExist) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Exist!" });
    }

    const { blogid } = req.params;

    if (!blogid) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Id Is Required!" });
    }

    const { name, comment } = req.body;

    if (!name || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const blog = await BlogModel.findById(blogid);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Exist!" });
    }

    blog.comments.push({ user: id, name, comment });

    await blog.save();

    return res
      .status(200)
      .json({ success: true, message: "New Comment Added", comment: comment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.admin;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    const { blogid } = req.params;

    const blogDeleted = await BlogModel.findByIdAndDelete(blogid);

    if (!blogDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Blog Not Exist!" });
    }

    return res.status(200).json({
      success: true,
      message: "Blog Deleted",
      blog: blogDeleted,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.admin;
    const { blogid, commentid } = req.params;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    if (!blogid || !commentid) {
      return res
        .status(404)
        .json({ success: false, message: "Both Id's Are Required!" });
    }

    const blog = await BlogModel.findById(blogid);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comment = blog.comments.id(commentid);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    comment.deleteOne();

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Comment deleted",
      comments: blog.comments,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleComment = async (req, res) => {
  try {
    const { id } = req.admin;
    const { blogid, commentid } = req.params;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    if (!blogid || !commentid) {
      return res
        .status(404)
        .json({ success: false, message: "Both Id's Are Required!" });
    }

    const blog = await BlogModel.findById(blogid);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    const comment = blog.comments.id(commentid);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    comment.approved = !comment.approved;

    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Comment status updated",
      comment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    const allBlogs = await BlogModel.find();

    return res
      .status(200)
      .json({ success: true, message: "All Blogs Recieved!", allBlogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { id } = req.admin;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    const allBlogs = await BlogModel.find();

    return res
      .status(200)
      .json({ success: true, message: "All Blogs Recieved!", allBlogs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.user;

    const { blogid } = req.params;

    if (!id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized!" });
    }

    if (!blogid) {
      return res
        .status(403)
        .json({ success: false, message: "Blogid IS Required!" });
    }

    const singleBlog = await BlogModel.findById(blogid).populate("admin", "name");;

    if (!singleBlog) {
      return res
        .status(404)
        .json({ success: false, message: "No Such Blog!", singleBlog });
    }

    return res
      .status(200)
      .json({
        success: true,
        message: "Blog Recieved!",
        singleBlog
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
