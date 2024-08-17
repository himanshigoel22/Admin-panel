import React, { useState } from 'react';
import './contact.css';
import contactImage from '../assets/contactUse.svg';
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify'

const defaultContact = {
  username: '',
  email: '',
  message: ''
}
const Contact = () => {
  const [formData, setFormData] = useState(defaultContact);
 
  const [userData , setUserData] = useState(true);
  const {user , URL} = useAuth();

  if(userData && user){
    setFormData({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/form/contact` , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        setFormData({ ...formData, message:"" });

        toast.success('msg sent successfully');
      }
      else{
        toast.error("unable to send msg");
      }
    } 
    catch (error) {
      console.log("contact error" , error);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-image">
        <img src={contactImage} alt="Contact Us" />
      </div>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
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
            <label htmlFor="email">Email</label>
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

