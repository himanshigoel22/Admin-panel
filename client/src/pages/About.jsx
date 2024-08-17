import React from 'react';
import './About.css'; 
import AboutImage from '../assets/display.svg'; 
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/auth';

const About = () => {
  const {user} = useAuth();

  return (
    <div className="about-container">
      <div className="about-content">
        <p> Welcome { user ?
         `${user.username} to our website ` : 
        'to our website'
          }</p>
        <h1>Why Choose Us?</h1>
        <ul>
          <li>
            <strong>Expertise:</strong> Our team consists of experienced IT professionals who are passionate about staying up-to-date with the latest industry trends.
          </li>
          <li>
            <strong>Customization:</strong> We understand that every business is unique. That's why we create solutions that are tailored to your specific needs and goals.
          </li>
          <li>
            <strong>Customer-Centric Approach:</strong> We prioritize your satisfaction and provide top-notch support to address your IT concerns.
          </li>
          <li>
            <strong>Affordability:</strong> We offer competitive pricing without compromising on the quality of our services.
          </li>
          <li>
            <strong>Reliability:</strong> Count on us to be there when you need us. We're committed to ensuring your IT environment is reliable and available 24/7.
          </li>
        </ul>
        <div className="buttons">
        <NavLink to="/contact">
              <button className="connect-btn">Connect Now</button>
            </NavLink>
            <NavLink to="/service">
              <button className="learn-more-btn">Learn More</button>
            </NavLink>
        </div>
      </div>
      <div className="about-image">
        <img src={AboutImage} alt="About Us" />
      </div>
    </div>
  );
}

export default About;
