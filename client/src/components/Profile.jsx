import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from './axiosConfig';

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/users/${id}`);
                setUser(response.data);
                setFormData(response.data);
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
            setUser(response.data.user);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Error updating user');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.post(`http://localhost:3000/users/delete/${id}`);
            navigate('/'); // Redirect to home or another page after deletion
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user');
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Surname:</label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Info:</label>
                        <textarea name="info" value={formData.info} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Surname:</strong> {user.surname}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Info:</strong> {user.info}</p>
                    <p><strong>Image:</strong> {user.image}</p>
                    <button onClick={() => setEditMode(true)}>Edit Profile</button>
                    <button onClick={handleDelete}>Delete Profile</button>
                </div>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default Profile;
