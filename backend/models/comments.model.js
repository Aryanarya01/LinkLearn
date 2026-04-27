import mongoose from "mongoose";


const comentSchema = new mongoose.Schema({
    userId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    body : {
        type : String,
        required : true,
    }
})