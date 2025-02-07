import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';

function Profile() {

    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {

                const response = await axios.get(`http://localhost:3000/users/${id}`);
                console.log('Fetched user data:', response.data);

                if (response.data) {
                    setUserData(response.data);
                    setFormData(response.data);
                } else {
                    console.error('User data is empty in response:', response);
                    setError('User data could not be loaded.');
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('Error fetching user data');
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(`http://localhost:3000/users/edit/${id}`, formData);
            console.log('User data after edit:', response.data);
            setUserData(response.data.user);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Error updating user');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.post(`http://localhost:3000/users/delete/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
        }
    };

    if (!userData) {
        return <div>{error || 'Loading user data...'}</div>;
    }

    return (
        <div className="card">
            <h2>User Profile</h2>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Surname:</label>
                        <input type="text" name="surname" value={formData.surname || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Info:</label>
                        <textarea name="info" value={formData.info || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" name="image" value={formData.image || ''} onChange={handleChange} />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>Surname:</strong> {userData.surname}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Info:</strong> {userData.info}</p>
                    <p><strong>Image:</strong> <img src={userData.image} alt="User Profile" /></p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    <button onClick={handleDelete}>Delete Profile</button>
                </div>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default Profile;
