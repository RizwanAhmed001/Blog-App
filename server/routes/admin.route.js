import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/admin.auth.js";
import { adminBlog } from "../controllers/admin.blog.js";

const adminRoute = express.Router();

adminRoute.post("/register", adminRegister);
adminRoute.post("/login", adminLogin);
adminRoute.post("/logout", adminLogout);

adminRoute.get("/blogs", adminAuth, adminBlog);

export default adminRoute;