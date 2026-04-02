import express from "express";
import { adminRegister } from "../controllers/admin.controller.js";

const adminRoute = express.Router();

adminRoute.post("/register", adminRegister);

export default adminRoute;