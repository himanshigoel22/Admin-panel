import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaHome, FaUsers, FaServicestack, FaPhone } from "react-icons/fa";
import './AdminLayout.css'; 
import { useAuth } from "../../store/auth";
import adminImage from '../../assets/admin.svg'; 
import NotAdmin from "./NotAdmin";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user.isAdmin) {
    return <NotAdmin />; 
  }
  return (
    <div className="admin-layout-container">
      <nav className="admin-nav">
        <div className="admin-nav-links">
          <NavLink to="/admin/users" className="admin-nav-link">
            <FaUsers /> Users
          </NavLink>
          <NavLink to="/admin/contacts" className="admin-nav-link">
            <FaPhone /> Contacts
          </NavLink>
          <NavLink to="/service" className="admin-nav-link">
            <FaServicestack /> Services
          </NavLink>
          <NavLink to="/" className="admin-nav-link">
            <FaHome /> Home
          </NavLink>
        </div>
      </nav>
      <div className="admin-content">
        <Outlet />
        <img src={adminImage} alt="Admin Background" className="admin-background-image" />
      </div>
    </div>
  );
};

export default AdminLayout;
