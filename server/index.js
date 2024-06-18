import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log("MongoDB connection is failed err:" + errors));

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
