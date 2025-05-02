import mongoose from "mongoose";
import express,{urlencoded} from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieparser from "cookie-parser"
import condb from "./db/db.js";
import authroute from "./router/auth.js";
import expenseroute from "./router/expense.js"
const app=express();
const PORT=8000;

dotenv.config({});
//urlencoded({ extended: true }): Parses incoming requests with URL-encoded payloads and supports complex objects, making the data available in req.body.

//cookieparser(): Parses cookies attached to the request and makes them available as req.cookies.

//cors(corsoption): Configures Cross-Origin Resource Sharing (CORS) to allow requests from a specific origin (http://localhost:5173) with credentials
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieparser());
const corsoption={
    origin:"http://localhost:5173",

   credentials:true
}
app.use(cors(corsoption));

app.use("/api/v1/auth",authroute);
app.use("/api/v1/expense",expenseroute);
app.listen(PORT,()=>{
    condb();
    console.log(`app is listening at port ${PORT}` )
})