import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";
import { userBlog } from "../controllers/user.blog.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

userRoute.get("/blogs", userAuth, userBlog)

export default userRoute;