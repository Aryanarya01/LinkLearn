import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
    
})
const profileSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    bio : {
        type : String,
        default : "",
    },
    pastWork : {
        default : []
    },
    education : {
        default:[]
    }
})