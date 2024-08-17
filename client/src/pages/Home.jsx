
import { NavLink } from 'react-router-dom';
import './Home.css'; 
import image from '../assets/home.svg'; 

const Home = () => {
  return (
    <div className="home-container">
    
        <div className="text-content">
          <h1>Welcome to TechHub</h1>
          <p>
            Are you ready to take your business to the next level with cutting-edge IT solutions?
            Look no further! At TechHubh, we specialize in providing innovative
            IT services and solutions tailored to meet your unique needs.
          </p>
          <div className="buttons">
            <NavLink to="/contact">
              <button className="primary-button">Connect Now</button>
            </NavLink>
            <NavLink to="/about">
              <button className="secondary-button">Learn More</button>
            </NavLink>
          </div>
        </div>
        <div className="image-content">
          <img src={image} alt="Illustration" />
        </div>
    
     
    </div>
  );
};

export default Home;
