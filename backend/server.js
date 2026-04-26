import express from "express";
import dotenv from "dotenv"
import cors from "cors"
const app = express();
const port = 9090;
dotenv.config();
app.use(express.json());
app.use(cors())


const start = async()=>{
    
}