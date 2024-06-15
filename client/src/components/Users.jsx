import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users from Backend</h1>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.email} {user.info}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default Users;