import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    body : {
        type : String,
        required : true,
    },
    
})