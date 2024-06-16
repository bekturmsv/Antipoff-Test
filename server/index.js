import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_CONNECT)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.log("MongoDB connection is failed err:" + errors));

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});
