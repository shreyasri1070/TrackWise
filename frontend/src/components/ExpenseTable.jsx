import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { useSelector } from 'react-redux'

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from './ui/button'
import {  Trash2, } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import UpdateExpense from './UpdateExpense.jsx'
  
const ExpenseTable = () => {
 const {expense}=useSelector(store=>store.expense)
 const [localExpense,setLocalExpense]=useState([]);
const [checkedval,setCheckedval]=useState({})// it may contain id having  value ex:{68000dcc834bbdbb8bc90f88: false, 68051f6b3592d0d013eec68f: true}
const removeExpenseHandler=async(expenseid)=>{
  const res=await axios.delete(`http://localhost:8000/api/v1/expense/remove/${expenseid}`)
try {
  if (res.data.success) {
    toast.success(res.data.message);
    // // update the local state
    const filteredExpenses = localExpense.filter(expenses => expenses._id != expenseid);
    setLocalExpense(filteredExpenses);
}
} catch (error) {
  console.log(error);
  toast.error(error.response?.data?.message || 'Something went wrong');
} 
}

const totalAmount=localExpense.reduce((accumlator,ele)=>{
  if(!checkedval[ele._id]){
    
    return accumlator+ele.amount
  }
  return accumlator;
  },0);
 const handlecheck=async(id)=>{
  const newStatus=!checkedval[id];
  const res=await axios.put(`http://localhost:8000/api/v1/expense/done/${id}`,{done:newStatus},{
   headers:{
    'Content-Type':'application/json'
   },
   withCredentials:true

  })

  try {
    if(res.data.success){
      toast(res.data.message)
      setCheckedval((prevData)=>({
        ...prevData,
      [id]:newStatus

      }))

      setLocalExpense(localExpense.map(exp=>exp._id===id?{...exp,done:newStatus}:exp))


    }
  } catch (error) {
    console.log(error)
     toast.error(error.response?.data?.message || 'Something went wrong');
  }
  
  
 }

 useEffect(()=>{
setLocalExpense(expense);
 },[expense])
   
  return (
  
    <Table>
    <TableCaption>A list of your recent expenses.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">MarkAsDone</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Amount </TableHead>
        <TableHead>Category </TableHead>
        <TableHead>Date </TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {localExpense.length===0?(<TableRow>
      <TableCell colSpan={6} className="text-center">
        Add Expense in the list
      </TableCell>
    </TableRow>):(localExpense?.map((expense) => (
        <TableRow key={expense._id}>
          <TableCell className="font-medium">
          <Checkbox checked={expense.done} onCheckedChange={()=>{handlecheck(expense._id)}} />
          </TableCell>
          <TableCell className={`${expense.done?'line-through':''}`}>{expense.description}</TableCell>
          <TableCell className={`${expense.done?'line-through':''}`}>{expense.amount}</TableCell>
          <TableCell className={`${expense.done?'line-through':''}`}>{expense.category}</TableCell>
          <TableCell className={`${expense.done?'line-through':''}`}>{expense.createdAt?.split("T")[0]}</TableCell>
          <TableCell className="text-right">
          <div className=' flex items-center justify-end gap-2'> <Button   onClick={()=>removeExpenseHandler(expense._id)} className='rounded-full border text-red-600 border-red-500 hover:border-transparent ' variant='outline'><Trash2/></Button>
          <UpdateExpense exp={expense}/></div>
          </TableCell>
        </TableRow>
      )))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={5} className="font-bold text-xl">Total</TableCell>
        <TableCell className="text-right font-bold text-xl ">{totalAmount}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
      
    
  )
}

export default ExpenseTable
