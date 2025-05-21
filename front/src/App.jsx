import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './compoennets/LoginPage';
import RegisterPage from './compoennets/RegisterPage';
import './App.css'
import ForgotPasswordPage from './compoennets/ForgotPasswordPage';
import ResetPasswordPage from './compoennets/ResetPasswordPage';
import Dashboard from './compoennets/DashbordAdmin';

function App() {
 

  return (
    <>
    
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
