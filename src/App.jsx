import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainLayout from "./layout/MainLayout";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import FormBuilder from "./pages/FormBuilder";
import RegisterEmployee from "./pages/RegisterEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-employee" element={<RegisterEmployee />} />
      </Routes>

      <Routes>  
          <Route path='' element={<MainLayout />} >
            <Route index={true} path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/form-builder" element={<FormBuilder />} />
          </Route> 
      </Routes>

      {/* <Routes>
        <Route path='' element={<MainLayout />} >
          <Route index={true} path="/" element={<Profile />} />
        </Route>
      </Routes> */}

    </BrowserRouter>
  );
}


export default App ;
