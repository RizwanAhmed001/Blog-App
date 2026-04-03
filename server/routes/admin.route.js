import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.post("/register", adminRegister);
adminRoute.post("/login", adminLogin);
adminRoute.post("/logout", adminLogout);


export default adminRoute;