import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/user.auth.js";
import { addComment } from "../controllers/blog.controller.js";

const userRoute = express.Router();

userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.post("/logout", logout);

userRoute.post("/comment/:blogid", userAuth, addComment);


export default userRoute;