import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Button } from './ui/button';
import Logo from './sec/logo';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "sonner"


const Register = () => {
 const navigate=useNavigate();
    const [input,setInput]=useState({
        UserName:"",
        email:"",
        password:""
    })
    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
          const response= await axios.post('http://localhost:8000/api/v1/auth/register', input,{
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })
        console.log(response);
        if (response.data.success) {
           
        toast.success(response.data.message);
          navigate('/login');
         }
         
          
        } catch (error) {
          
          toast.error(error.response.data.message)
          
        }
       
    }
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <form onSubmit={submitHandler} className='w-96 p-8 shadow-xl bg-gray-100'>
      <div className=' w-full flex justify-center items-center mb-5'>
           <div className="w-20"><Logo />  </div>
               
      </div>
        <div className='p-3'>
        <Label htmlFor="UserName" className='mb-3'>UserName</Label>
        <Input type="text" name="UserName" value={input.UserName}onChange={changeEventHandler} />
        </div>
        <div className='p-3'>
        <Label htmlFor="email" className='mb-3'>Email</Label>
        <Input type="email" name="email"value={input.email}onChange={changeEventHandler} />
        </div>
        <div className='p-3'>
        <Label htmlFor="password" className='mb-3'>Password</Label>
        <Input type="password" name="password" value={input.password}onChange={changeEventHandler}/>
        </div>

        <Button className='w-full my-5'> Register</Button>
        <p className='text-center text-sm'>Already have an account?<Link to='/login' className='text-blue-400 mx-1'>Login</Link></p>

      </form>
    </div>
  )
}

export default Register;
