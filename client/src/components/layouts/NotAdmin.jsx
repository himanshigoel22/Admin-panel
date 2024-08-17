import { NavLink } from "react-router-dom";
import notAdminImage from '../../assets/notAdmin.jpg';
import './NotAdmin.css'; 

const NotAdmin = () => {
  return (
    <div className="not-admin-container">
      <img src={notAdminImage} alt="Not Admin" className="not-admin-image" />
      <h1>Oops, you are not an Admin !</h1>
      <NavLink to="/" className="back-home-link">Go to Home</NavLink>
    </div>
  );
};

export default NotAdmin;
