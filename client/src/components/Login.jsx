import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './axiosConfig';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            console.log('Login Response:', response.data); // Log the entire response for clarity

            const userId = response.data.id; // Accessing the user ID from the response

            if (userId) {
                navigate(`/profile/${userId}`);
            } else {
                console.error('User id not found in response:', response.data);
                // Handle the case where userId is not available in the response
            }
        } catch (error) {
            console.error('Error while logging in:', error);
        }
    };

    return (
        <div className="card">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
