import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import Logo from './sec/logo';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner"
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/authSlice';


const Login = () => {
 const navigate=useNavigate();
 const dispatch=useDispatch();
    const [input,setInput]=useState({
       
        email:"",
        password:""
    })
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
          const response=await axios.post('http://localhost:8000/api/v1/auth/login', input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
       
        if (response.data.success) {
            dispatch(setUser(response.data.user))
           
            toast.success(response.data.message);
            navigate('/');
        }
          
        } catch (error) {
          console.log(error)
          
          toast.error(error.response?.data?.message);
        }
       
    }
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form onSubmit={submitHandler} className='w-96 p-8 shadow-xl bg-gray-100'>
      <div className=' w-full flex justify-center items-center mb-5'>
        <div className='w-20'>  <Logo  />    </div>
           
      </div>
        
        <div className='p-3'>
        <Label htmlFor="email" className='mb-3'>Email</Label>
        <Input type="email" name="email"value={input.email}onChange={changeEventHandler} />
        </div>
        <div className='p-3'>
        <Label htmlFor="password" className='mb-3'>Password</Label>
        <Input type="password" name="password" value={input.password}onChange={changeEventHandler}/>
        </div>

        <Button className='w-full my-5'> Login</Button>
        <p className='text-center text-sm'>Don't have an account?<Link to='/register' className='text-blue-400 mx-1'>Signup</Link></p>

      </form>
    </div>
  )
}


export default Login
