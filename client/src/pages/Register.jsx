import React, { useState } from 'react';
import './contact.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import imageLog from '../assets/login.svg';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { storetokenInLS , URL } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const res_data = await response.json();
  
      if (response.ok) {
        toast.success(res_data.msg || 'Registration successful');
        storetokenInLS(res_data.token);
        setFormData({ username: '', email: '', password: '' });
        navigate('/');
      } else {
        toast.error(res_data.message || 'An error occurred');
      }
    } catch (error) {
      toast.error('Network error or server not responding');
      console.log(error);
    }
  };
  
  return (
    <div className="form">
      <div className="form-container">
      <div className="contact-image">
        <img src={imageLog} alt="Contact Us" />
      </div>
      <div className="contact-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
          <button type="submit" className="submit-button">Register Now</button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Register;
