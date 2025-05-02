import jwt from "jsonwebtoken"
const isauthenticated=async(req,res,next)=>{
    try {
       
        const token=req.cookies.token;
        if(!token){
            return res.status(500).json({
                message:"user not authenticated",
                success:false
    
            })
        };

        const decode= jwt.verify(token,process.env.SECRET_KEY);
        
        if(!decode){
            return res.status(401).json({
                message:"invalid token",
                success:false
            })
        }
        req.id=decode.userid;
next();
        
    } catch (error) {
        console.log(error);
    }
   



}

export default isauthenticated;