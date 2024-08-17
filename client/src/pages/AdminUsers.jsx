import  { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import './AdminUsers.css'; 
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken , URL } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${URL}/api/admin/users`, {
        method: 'GET',
        headers: {
          'Authorization': authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE USER

  const deleteUser = async(id) =>{
    try {
      const response = await fetch(
        `${URL}/api/admin/users/delete/${id}`, 
        {
          method: 'DELETE',
          headers: {
            'Authorization': authorizationToken,
          },
        });

        if(response.ok){
          toast.success('User deleted successfully');
          getAllUsersData();
        }
      
    } 
    catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <div className="admin-users-container">
      <h2>Admin Users Data</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
               <Link to={`/admin/users/${user._id}/edit`}>
               <button className="edit-button">Edit</button>
               </Link>
              </td>
              <td>
                <button className="delete-button"
                onClick={() => deleteUser(user._id)}>
                Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
