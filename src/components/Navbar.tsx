// components/Navbar.tsx
// import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import '../css/Navbar.css'

const Navbar= () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken')    
    navigate({to:'/'});
  };

  return (
    <nav>
      <ul className="navbar">
        <li className="nav-item" onClick={() => navigate({to:'/'})}>Login</li>
        <li className="nav-item" onClick={() => navigate({to:'/signup'})}>Signup</li>
        <li className="nav-item" onClick={() => navigate({to:'/students'})}>Students</li>
        <li className="nav-item" onClick={() => navigate({to:'/stats'})}>Stats</li>
        <li className="nav-item" onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
