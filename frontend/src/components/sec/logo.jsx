import React from 'react'
import { Link } from 'react-router-dom'


const logo = () => {
  return (
   
        <Link to='/'>
        <img src="./src/assets/logo.png" alt="expensetracker"  /> 
        </Link>
      
   
  )
}

export default logo
