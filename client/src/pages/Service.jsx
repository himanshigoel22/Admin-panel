import React from 'react';
import serviceImage from '../assets/service.svg';
import './service.css';
import { useAuth } from '../store/auth';

const Service = () => {
  const { services = [] } = useAuth(); 

  if (!Array.isArray(services)) {
    return <p>No services available</p>;
  }

  return (
    <div className="services-container">
      <h1>Services</h1>
      <div className="services-grid">
        {services.map((curr, index) => (
          <div key={index} className="service-card">
            <img src={serviceImage} alt="Service" />
            <h2>{curr.service}</h2>
            <p>{curr.description}</p>
            <br />
            <p><i>Price: {curr.price}</i></p>
            <br />
            <p>By- <b>{curr.provider}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
