import Posts from "../models/posts.model";
import User from "../models/user.model";



export const createPost = async(req,res)=>{
    try{
        const Id = req.user.id;
        const user = await User.findById(Id);
        if(!user){
            return res.status(404).json({message : "User not found!"});
        }

        const post = new Posts({
            userId : Id,
            body : req.body.body,
            media: req.file != undefined ? req.file.filename : "",
            fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
        })
        await post.save();
        return res.status(200).json({message : "Post Created"})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

export const getAllPosts = async(req,res)=>{
    try{
        const Id = req.user.id;
        const user = await User.findById(Id);
        if(!user){
            return res.status(404).json({message : "User not found!"});
        }
        const posts = await Posts.find().populate("userId","name username email profilePicture");
        await res.status(200).json({posts})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


export const deletePost = async(req,res)=>{
    try{

    }catch(err){
        return res.status(500).json({message : err.message});
    }
}