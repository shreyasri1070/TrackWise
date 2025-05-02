import express from "express";
import { expensemodel } from "../models/expensemodel.js";
export const addexpense= async(req,res)=>{
    try {

        const {description,amount,category}=req.body;
        if(!description||!amount||!category){
            return res.status(400).json({
              message:"All fields are required",
              success:false  
            })
        };
        const expense=await expensemodel.create({
            description,
            amount,
            category,
            userId:req.id
        })

        return res.status(200).json({
            message:"Expenses added succesfully",
            expense,
            success:true
        })
        
    } catch (error) {
        console.log(error);
    }

}

export  const  getAllExpense=async(req,res)=>{
    try {

        const userId=req.id;
       
        let category=req.query.category||"";
        const done=req.query.done||"";

        // Build the query object
        const query = {
            userId, // Filter by userId
        };
        if (category && category.toLowerCase() !== 'all') {
            query.category = { $regex: category, $options: 'i' }; // Case-insensitive regex search
        }     
        
        if(done.toLowerCase()==='done'){
            query.done=true
        }
        else if (done.toLowerCase() === "undone") {
            query.done = false; // Filter for expenses marked as pending (false)
        }
        console.log(query);
        const expenses=await expensemodel.find(query);
        console.log(expenses);
        if (!expenses || expenses.length === 0) {
            return res.status(500).json({
                message: "No expenses found.",
                success: false
            });
        }

        // Return the found expenses
        return res.status(200).json({
            expenses,
            success: true
        });

        
    } catch (error) {
        console.log(error)
    }
}

export const markAsDoneOrUndone = async (req, res) =>{
    try {
     const   expenseid=req.params.id;

        const done = req.body;
        const expense = await expensemodel.findByIdAndUpdate(expenseid, done, { new: true });
        if (!expense) {
            return res.status(404).json({
                message: "Expense not found.",
                success: false
            })
        };
        return res.status(200).json({
            message: `Expense marked as ${expense.done ? 'done' : 'undone'}.`,
            success: true
        });
    } catch (error) {
        console.log(error)
    }

}
export const removeExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await expensemodel.findByIdAndDelete(expenseId);
        return res.status(200).json({
            message: "Expense removed.",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateExpense = async (req, res) => {
    try {
        const { description, amount, category } = req.body;

        const expenseId = req.params.id;
        const updateData = { description, amount, category };

        const expense = await expensemodel.findByIdAndUpdate(expenseId, updateData, { new: true });
        return res.status(200).json({
            message: "Expense Updated.",
            expense,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}