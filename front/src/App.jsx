import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import LoginPage from './compoennets/LoginPage';
import RegisterPage from './compoennets/RegisterPage';
import ForgotPasswordPage from './compoennets/ForgotPasswordPage';
import ResetPasswordPage from './compoennets/ResetPasswordPage';
import ParentDashboard from './compoennets/ParentDashboard';
import DailyReports from './compoennets/Daily-report';
import DailyTracking from './compoennets/DailyTracking';
import ChildProfile from './compoennets/ChildProfile';
import Layout from './compoennets/Layout';
import DashboardAdmin from './compoennets/DashbordAdmin'
import { ChildRegistrationForm } from './compoennets/Child-registration-form';
import TeacherDashboard from './compoennets/TeacherDashboard';

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
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        {/* Routes protégées ou nécessitant layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ParentDashboard />} />
          <Route path="/daily-reports" element={<DailyReports />} />
          <Route path="/daily-tracking" element={<DailyTracking />} />
          <Route path="/profile" element={<ChildProfile />} />
          <Route path="/register-child" element={<ChildRegistrationForm />} />
        </Route>
      </Routes>
    </Router>
   </>
  );
}

export default App;
