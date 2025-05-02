import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'
import { useDispatch } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { setCategory, setMarkAsDone } from '@/redux/expenseSlice'
import ExpenseTable from './ExpenseTable'
import useGetExpenses from './hooks/useGetExpense'

const Home = () => {
 useGetExpenses();
  const dispatch=useDispatch();

  const handleCategoryChange=(value)=>{
      dispatch(setCategory(value))
  }
  const handleDoneChange=(value)=>{
          dispatch(setMarkAsDone(value))
  }
  return (
    <div>
      <Navbar/>

      <div className='max-w-5xl mx-auto'>
      <div className='flex items-center justify-between  m-3'> 
      
      <h1 className='font-medium text-lg'>Expense:</h1>
      <CreateExpense/>
      </div>
      <div className='flex items-center gap-3 m-3 '>
    <h1 className='font-medium text-lg'> Filter by:</h1>
 <Select onValueChange={handleCategoryChange}>
                            <SelectTrigger className='w-[180px]'>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="rent">Rent</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="salary">Salary</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="all">All</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        
 <Select onValueChange={handleDoneChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Mark As" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="done">Done</SelectItem>
                                    <SelectItem value="undone">Undone</SelectItem>
                                    <SelectItem value="both">Both</SelectItem>
                          
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        </div> 

                     <div>
                      <ExpenseTable/>
                      </div>   

      </div>
    </div>
  )
}

export default Home
