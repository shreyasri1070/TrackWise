import mongoose from "mongoose";

 const userSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

 })

 export  const usermodel=mongoose.model("User",userSchema)