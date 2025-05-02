import { usermodel } from "../models/usermodel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
export const registerController=async(req,res)=>{
    try{
 const {UserName,email,password}=req.body;
if(!UserName||!email||!password){

    return res.status(400).json({
      message:"All fields are required",
      success:false  
    })
};

const user=await usermodel.findOne({email});

if(user){
    return res.status(400).json({
        message:"Email already exist",
        success:false
    })
}

const hashPassword=await bcrypt.hash(password,10);
await usermodel.create({
    UserName,
    email,
    password:hashPassword
})

return res.status(200).json({
    message:"Registeration sucessfull",
    success:true
})





    }
    catch(e){
        console.log(e);
    }
}

export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email||!password){
            return res.status(400).json({
                message:"All fields are required",
                success:false  
              })
        };
    
        const user=await usermodel.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid email",
                success:false
            })
        }

        const comparePassword=await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({
                message:"Invalid password",
                success:false
            })

        }
        const tokendata={
            userid:user._id
        }

        //JWT works by encoding a user's information (claims) into a token, signing it with a secret or private key, and then sending it to the client. The client sends this token with each subsequent request, allowing the server to verify the token and authenticate or authorize the user without needing to store session data.
       const token=jwt.sign(tokendata,process.env.SECRET_KEY,{expiresIn:"1d"})

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${user.UserName}`,
            user:{
                _id:user._id,
                UserName:user.UserName,
                email:user.email
            },
            success:true
        })

        
    } catch (error) {
        console.log(error);
    }
   



}

export const  logoutController=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logout succesfully",
            success:true
        })
        
    } catch (error) {
        console.log(error)
    }

}

