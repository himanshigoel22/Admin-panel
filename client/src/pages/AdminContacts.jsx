import  { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import './AdminUsers.css'; 
import {toast} from 'react-toastify';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken , URL } = useAuth();

  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${URL}/api/admin/contacts`, {
        method: 'GET',
        headers: {
          'Authorization': authorizationToken,
        },
      });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //DELETE CONTACT

  const deleteContact = async(id) =>{
    try {
      const response = await fetch(
        `${URL}/api/admin/contacts/delete/${id}`, 
        {
          method: 'DELETE',
          headers: {
            'Authorization': authorizationToken,
          },
        });

        if(response.ok){
          getAllContactsData();
          toast.success('Contact deleted successfully');
        }
      
    } 
    catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <div className="admin-users-container">
      <h2>Admin Contacts Data</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.username}</td>
              <td>{contact.email}</td>
              <td>{contact.message}</td>
              <td>
                <button className="delete-button"
                onClick={() => deleteContact(contact._id)}>
                Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContacts;
