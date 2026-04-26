import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
const app = express();
const port = 9090;
dotenv.config();
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    res.send("working")
})
const start = async()=>{
    const connectDb = await mongoose.connect("mongodb+srv://aryanarya0502:aryan555555@promeet.asxcnfo.mongodb.net/?appName=proMeet");
    app.listen(port,()=>{
        console.log(`App is listining to port :${port}`)
    })
}

start();