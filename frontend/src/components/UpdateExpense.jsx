import { Edit2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogDescription } from '@radix-ui/react-dialog'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setExpense, setSingleExpense } from '@/redux/expenseSlice'

const UpdateExpense = ({exp}) => {
 
    const dispatch=useDispatch();
    const {expense,singleExpense}=useSelector(store=>store.expense)
      const [loading,setLoading]=useState(false);
      const [isOpen,setIsOpen]=useState(false);
      const [formData,setformData]=useState({
          description:singleExpense?.description,
          amount:singleExpense?.amount,
          category:singleExpense?.category
  
      });

     
      const handleChange=(e)=>{
          setformData({...formData,[e.target.name]:e.target.value})
          
      
        }
        const handleCategoryChange = (value) => {
          setformData((prevData) => ({
              ...prevData,
              category: value,
          }));
      };
      const handleSubmit=async(e)=>{
          e.preventDefault();
          try {
              setLoading(true);
            const response=await axios.put(`http://localhost:8000/api/v1/expense/update/${exp._id}`, formData,{
              headers:{
                  'Content-Type':'application/json'
              },
              withCredentials:true
          })
  
          
         
          if (response.data.success) {
            const updatedExpenses = expense.map(expe => expe._id === exp._id ? response.data.expense: expe);
             dispatch(setExpense(updatedExpenses))
              toast.success(response.data.message);
              setIsOpen(false);
          }
            
          } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || 'Something went wrong');
          }
          finally{
              setLoading(false)
          }
         
      }
      useEffect(()=>{
        setformData({
            description:singleExpense?.description,
            amount:singleExpense?.amount,
            category:singleExpense?.category
    
        })

      },[singleExpense])
  
  
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline"  className='rounded-full border text-green-700 border-green-500 hover:border-transparent ' onClick={() =>{
            dispatch(setSingleExpense(exp)), setIsOpen(false);}}><Edit2></Edit2></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        
          <DialogTitle>Update Expense</DialogTitle>
          <DialogDescription>
                        Update expense  list here.
                    </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input id="description" type='text'  name="description"
             value={formData.description} className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
             Amount
            </Label>
            <Input id="amount"type='number'  name="amount"  value={formData.amount} className="col-span-3" onChange={handleChange} />
          </div>
          <Select value={formData.category}onValueChange={handleCategoryChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="rent">Rent</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="salary">Salary</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
        </div>
       
        <DialogFooter>
            {
                loading?(                                <Button className='my-4'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                </Button>):( <Button type="submit">Update</Button>)
            }
         
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog> 
    </div>

  )
}

export default UpdateExpense
