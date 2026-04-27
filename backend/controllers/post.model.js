import User from "../models/user.model";



export const createPost = async(req,res)=>{
    try{
        const Id = req.user.id;
        const user = await User.findById(Id);
        if(!user){
            return
        }
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}