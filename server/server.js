import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import userRoute from "./routes/user.route.js";
import adminRoute from "./routes/admin.route.js";
import cloudinaryConfig from "./config/cloudinary.js";
dotenv.config();

const app = express();
cloudinaryConfig();
connectDB();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: (origin, callback) => {

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, origin); // ✅ IMPORTANT CHANGE
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("API WORKING!");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:${port}`);
});
