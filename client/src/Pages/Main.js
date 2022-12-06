import React from 'react'
import Home  from './Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Index';
import Register from './Register/Index'
import Admin from './Admin/Admin';
import Dashboard from "../componant/AdminPanal/Pages/Dashboard"
import RequestForAdmin from "../componant/AdminPanal/Pages/RequestForAdmin"
import UploadMaterial from '../componant/AdminPanal/Pages/UploadMaterial';

function Main() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/adminLogin" element={<Login/>}/>
        <Route path="/adminRegister" element={<Register/>}/>
        <Route path="/adminPanal" element={<Admin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/adminRequest" element={<RequestForAdmin/>}/>
        <Route path="/uploadMaterial" element={<UploadMaterial/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default Main