

export const Protect = async(req,res,next)=>{
    try{
            const token = req.cookies.token;
            if(!token){
                return res.status(404).json({message : "Not Authorized"});
            }
    }catch(err){
        return res.status(500).json({message : "Server Error"})
    }
}