import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const emailExist = await UserModel.findOne({ email: email.toLowerCase() });

    if (emailExist) {
      return res
        .status(409)
        .json({ success: false, message: "Email Already Registered!" });
    }

    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while hashing password",
      });
    }
    
    if (!hashedPassword) {
      return res.status(500).json({
        success: false,
        message: "Hashing failed",
      });
    }

    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true, // secure (not accessible in JS)
      secure: process.env.NODE_ENV === "production", // change in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.status(201).json({
      success: true,
      message: "User Registered!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields Are Mandatory!" });
    }

    const emailExist = await UserModel.findOne({ email: email.toLowerCase() });

    if (!emailExist) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Email or Password!" });
    }

    let isMatch;

    try {
      isMatch = await bcrypt.compare(password, emailExist.password);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error while comparing password",
      });
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: emailExist._id, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true, // secure (not accessible in JS)
      secure: process.env.NODE_ENV === "production", // change in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: emailExist._id,
        name: emailExist.name,
        email: emailExist.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, // secure (not accessible in JS)
      secure: process.env.NODE_ENV === "production", // change in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
