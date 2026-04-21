import AdminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(403).json({
        success: false,
        message: "Invalid Admin Credentials!",
      });
    }

    const existingAdmin = await AdminModel.findOne({
      email: email.toLowerCase(),
    });

    if (existingAdmin) {
      return res
        .status(409)
        .json({ success: false, message: "Email Already Exists!" });
    }

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error While Hashing!" });
    }

    if (!hashedPassword) {
      return res
        .status(500)
        .json({ success: false, message: "Password Hashing Failed!" });
    }

    const newAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    const token = jwt.sign({ id: newAdmin._id, role: "admin" }, process.env.JWT_SECRET);

    res.cookie("adminToken", token, {
      httpOnly: true, // secure (not accessible in JS)
      secure: process.env.NODE_ENV === "production", // change in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Admin Registered!",
      admin: { name: newAdmin.name, email: newAdmin.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const emailExist = await AdminModel.findOne({ email: email.toLowerCase() });

    if (!emailExist) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Admin Credentials!" });
    }

    let isMatch;

    try {
      isMatch = await bcrypt.compare(password, emailExist.password);
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error While Hashing!" });
    }

    if (!isMatch) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Admin Credentials!" });
    }

    const token = jwt.sign({ id: emailExist._id, role: "admin" }, process.env.JWT_SECRET);

    res.cookie("adminToken", token, {
      httpOnly: true, // secure (not accessible in JS)
      secure: process.env.NODE_ENV === "production", // change in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({
      success: true,
      message: "Admin Login Successful!",
      admin: { name: emailExist.name, email: emailExist.email },
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true, // secure (not accessible in JS)
      secure: process.env.NODE_ENV === "production", // change in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res
      .status(200)
      .json({ success: true, message: "Admin Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}