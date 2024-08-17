import React, { useState, useEffect } from 'react';
import './contact.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const AdminUpdate = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { authorizationToken , URL} = useAuth();

  const params = useParams(); 

  const getSingleUserData = async() => {
    try {
        const response = await fetch(
          `${URL}/api/admin/users/${params.id}`, 
          {
            method: 'GET',
            headers: {
              'Authorization': authorizationToken,
            },
          });
        const data = await response.json();
        setFormData(data);
  
      } 
      catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    getSingleUserData();
  } , []);
   
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch
      (`${URL}/api/admin/users/update/${params.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizationToken,
        },
        body: JSON.stringify(formData),
      }
    );

      if (response.ok) {
        toast.success('User updated successfully');
        navigate('/admin/users'); 
      } else {
        toast.error( 'An error occurred');
      }
    } 
    catch (error) {
      toast.error('Error in updating');
      console.log(error);
    }
  };

  return (
    <div className="contact-container user-container">
      <div className="contact-form">
        <h2>Update User</h2>
        <br /><br />
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
          
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdate;
