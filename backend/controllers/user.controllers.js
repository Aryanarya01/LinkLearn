import User from "../models/user.model";


export const register = async (req,res)=>{
    try{
        const {name, email, username, password} = req.body;
        if(!name||!username||!email||!password){
            return res.status(400).json("All fields are required");
        }
        const 
    }catch(err){
        return res.status(500).json({message : "Server Error!"})
    }
}

export const login = async(req,res)=>{
    try{
        const 
    }catch(err){
        return res.status(500).json({message : "Server error!"});
    }
}