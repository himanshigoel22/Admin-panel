import React, { useState } from 'react';
import './contact.css'
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import imageLog from '../assets/login.svg';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
const { storetokenInLS , URL } = useAuth();
const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData,  [name]: value,  });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/auth/login` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Login successful");
        storetokenInLS(res_data.token);
        setFormData({ username: '', password: '' });
        navigate('/');
      } else {
        toast.error(res_data.message || "An error occurred");
      }
    } catch (error) {
      toast.error("Network error or server not responding");
      console.error("Login error:", error);
    }
  };

  return (
    
    <div className="contact-container">
    <div className="contact-image">
        <img src={imageLog} alt="Contact Us" />
      </div>
      <div className="contact-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      </div>
    </div>
    
  );
};


export default Login