import express from "express";
import {addexpense,getAllExpense, markAsDoneOrUndone, removeExpense, updateExpense} from "../controller/expenseController.js"
import isauthenticated from "../middleware/isauthenticated.js";
const route=express.Router();

route.post("/add-expense",isauthenticated,addexpense);
route.get("/getallexpenses",isauthenticated,getAllExpense);
route.put("/done/:id",isauthenticated,markAsDoneOrUndone);
route.delete("/remove/:id",isauthenticated,removeExpense);
route.put("/update/:id",isauthenticated,updateExpense)


export default route;
