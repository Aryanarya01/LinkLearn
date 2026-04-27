import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js"
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = 9090;
 
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors())
app.use(cookieParser())
app.use(userRouter)
 
const start = async()=>{
    const connectDb = await mongoose.connect("mongodb+srv://aryanarya0502:aryan555555@promeet.asxcnfo.mongodb.net/?appName=proMeet");
    app.listen(port,()=>{
        console.log(`App is listining to port :${port}`)
    })
}

start();