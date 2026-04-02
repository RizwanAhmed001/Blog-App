import AdminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const adminRegister = async (req, res) => {
  try {
    const { name, email, password, adminkey } = req.body;

    if (!name || !email || !password || !adminkey) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    if (adminkey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: "Invalid Admin Access!",
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

    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
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
