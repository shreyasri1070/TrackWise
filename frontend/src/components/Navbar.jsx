import React from "react";
import Logo from "./sec/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Link, useNavigate,  } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setExpense, setSingleExpense } from "@/redux/expenseSlice";

const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const {user}=useSelector(store=>store.auth)
  const handleLogout=async(e)=>{
    e.preventDefault();
    try {
      const response=await axios.get('http://localhost:8000/api/v1/auth/logout');
       
      if(response.data.success){
        toast.success(response.data.message);
          dispatch(setExpense([]));
          dispatch(setSingleExpense(null));
       navigate('/login')
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message) 
    }
  }
  
  return (
    <div className="border-b border-gray-200">
      <div className="flex justify-between p-3">
      <div className="w-14">
        <Logo />
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='w-14 h-11'>
                <AvatarImage src="./src/assets/profile-user.png"  />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Account:{user.UserName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
             

              <DropdownMenuItem>
                <Button onClick={handleLogout}>LogOut</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div>
            <Link to='/login'><Button className='m-2'>Login</Button></Link>
            <Link to='/register'><Button className='m-2'>SignUp</Button></Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default Navbar;
