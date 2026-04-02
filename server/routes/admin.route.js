import express from "express";
import { adminLogin, adminRegister } from "../controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.post("/register", adminRegister);
adminRoute.post("/login", adminLogin);

export default adminRoute;