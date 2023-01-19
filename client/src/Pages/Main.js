import React from 'react'
import Home  from './Home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login/Index';
import Register from './Register/Index'
import Admin from './Admin/Admin';
import Dashboard from "../componant/AdminPanal/Pages/Dashboard"
import RequestForAdmin from "../componant/AdminPanal/Pages/RequestForAdmin"
import UploadMaterial from '../componant/AdminPanal/Pages/UploadMaterial';
import StudyMaterial from './Study_Material/StudyMaterial';
import DeleteStudyMaterial from '../componant/AdminPanal/Pages/DeleteMaterial';
import Team from '../componant/AdminPanal/Pages/Team';

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
        <Route path="/UploadMaterial" element={<UploadMaterial/>}/>
        <Route path="/studyMaterial" element={<StudyMaterial/>}/>
        <Route path="/deleteStudyMaterial" element={<DeleteStudyMaterial/>}/>
        <Route path="/team" element={<Team/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default Main