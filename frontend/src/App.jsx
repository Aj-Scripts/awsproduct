import React from 'react'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Home from './components/Home'
import Add from './components/Add'
import ProductDetails from './components/ProductDetails'
import {Route,Routes} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'

const App = () => {
  return (
    <>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route element={<PrivateRoutes/>}>
          <Route path="/add" element={<Add/>}></Route>
        </Route>  
        {/* ✅ Learn More route */}
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
      </Routes>
    </>
  )
}

export default App
