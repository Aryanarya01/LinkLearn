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
        
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}