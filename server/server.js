import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import userRoute from "./routes/user.route.js";
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute)

app.get("/", (req, res) => {
  res.send("API WORKING!")
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:${port}`)
})