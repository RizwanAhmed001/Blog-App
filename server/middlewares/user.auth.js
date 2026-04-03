import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decode);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
