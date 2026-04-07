import jwt from "jsonwebtoken";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);


    if (decode.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied (Admin only)",
      });
    }

    req.admin = decode;

    next();

  } catch (error) {
    return res.status(401).json({success: false, message: "Invalid or expired token"})
  }
}