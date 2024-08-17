import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../store/auth';

const Navbar = () => {
  const {isLoggedIn} = useAuth();

  return (
    <nav className="navbar">
      <NavLink to="/" className="brand-name">TechHub</NavLink>
      <div className="nav-links">

        <NavLink to="/about" className="nav-link" activeclassname="active-link">About</NavLink>
        <NavLink to="/service" className="nav-link" activeclassname="active-link">Services</NavLink>
        <NavLink to="/contact" className="nav-link" activeclassname="active-link">Contact</NavLink>
        <NavLink to="/admin" className="nav-link" activeclassname="active-link">Admin</NavLink>
        
        {isLoggedIn ?(<NavLink to="/logout" className="nav-link" activeclassname="active-link">
        LogOut</NavLink>)
        :(<>
        <NavLink to="/register" className="nav-link" activeclassname="active-link">
          Register</NavLink> 
        <NavLink to="/login" className="nav-link" activeclassname="active-link">
          Login</NavLink>
          </>)
        }
        
        
      </div>
    </nav>
  );
};

export default Navbar;
