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
    likes : {
        type : Number,
        default : 0,
    },
    created_At : {
        type : Date,
        default : Date.now,
    },
    updated_At : {
        type : Date,
        default : Date.now,
    },
    media : {
        type : String,
        default : '',
    },
    fileType : {
        type : String,
        default : '',
    }
})