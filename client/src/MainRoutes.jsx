import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Products from './Pages/Products/Products';
import Signup from './Pages/Authentication/Signup';
import Login from './Pages/Authentication/Login';
import Cart from "./Pages/Cart/Cart";
import RequireAuth from './hoc/RequireAuth';

const MainRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<RequireAuth><Products/></RequireAuth>} />
            <Route path='/authentication/signup' element={<Signup/>} />
            <Route path='/authentication/login' element={<Login/>} />
            <Route path='/cart' element={<RequireAuth><Cart/></RequireAuth>} />
        </Routes>
    </div>
  )
}

export default MainRoutes