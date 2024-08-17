
import './NotFound.css'; 
import notAdminImage from '../assets/error.jpg'; 

const Error = () => {
  return (
    <div className="not-found-container">
       <h1>Oops Page does not exist!</h1>
      <img src={notAdminImage} alt="Not Found" className="not-found-image" />
      <a href="/" className="home-link">Go to Home</a>
    </div>
  );
}

export default Error;
