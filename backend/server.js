import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/post.route.js"
dotenv.config();
const app = express();
const port = 9090;

app.use(express.json());
app.use(express.static("uploads"));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(userRouter);
app.use(postRouter)

const start = async () => {
  const connectDb = await mongoose.connect(
    "mongodb+srv://aryanarya0502:aryan555555@promeet.asxcnfo.mongodb.net/?appName=proMeet",
  );
  app.listen(port, () => {
    console.log(`App is listining to port :${port}`);
  });
};

start();
