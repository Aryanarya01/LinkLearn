import mongoose from "mongoose";


const comentSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Posts"
    },
    body : {
        type : String,
        required : true,
    }
})