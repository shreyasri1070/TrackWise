import mongoose from "mongoose";

const condb=async ()=>{
    try {

        await mongoose.connect(process.env.MONGO_URL);
        console.log("database connected successfully")

        
    } catch (error) {
        console.log(error)
    }
}
export default condb;