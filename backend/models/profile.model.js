import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
    company : {
        type : String,
        default : ""
    },
    position : {
        type : String,
        default : ""
    },
    years : {
        type : String,
        default : ""
    }
});



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
        type : [workSchema],
        default : []
    },
    education : {
        default:[]
    }
})