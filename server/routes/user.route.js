import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";
import { addComment, getAllBlogs, getSingleBlog } from "../controllers/blog.controller.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

userRoute.post("/comment/:blogid", userAuth, addComment);
userRoute.get("/allblogs", userAuth, getAllBlogs);
userRoute.get("/singleblog/:blogid", userAuth, getSingleBlog);


export default userRoute;