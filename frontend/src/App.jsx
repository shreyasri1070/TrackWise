

import { Toaster } from "@/components/ui/sonner"



import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/register.jsx"
function App() {
  const approuter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);
  


  return (
    <>
     
{/*      //it work correctly but it is older version
    <BrowserRouter>
    
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
   </Routes>
   </BrowserRouter> */}
    <RouterProvider router={approuter} />
    <Toaster />
    </>
  )
}

export default App
