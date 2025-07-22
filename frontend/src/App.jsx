

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Seller from './pages/Seller';
import AdminDashboard from './pages/AdminDashboard';
import RoleRedirect from './components/RoleRedirect';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RoleRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App
