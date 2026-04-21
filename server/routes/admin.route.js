import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.js";
import { createBlog, deleteBlog, deleteComment, getAllBlogsAdmin, toggleComment, togglePublished } from "../controllers/blog.controller.js";
import { adminAuth } from "../middlewares/admin.auth.js";

const adminRoute = express.Router();

adminRoute.post("/register", adminRegister);
adminRoute.post("/login", adminLogin);
adminRoute.post("/logout", adminLogout);

adminRoute.post("/newblog", adminAuth, upload.single("file"), createBlog);
adminRoute.put("/togglestatus/:blogid", adminAuth, togglePublished);
adminRoute.delete("/deleteblog/:blogid", adminAuth, deleteBlog);
adminRoute.put("/togglecomment/:blogid/:commentid", adminAuth, toggleComment)
adminRoute.delete("/deletecomment/:blogid/:commentid", adminAuth, deleteComment)

adminRoute.get("/allblogs", adminAuth, getAllBlogsAdmin);

export default adminRoute;