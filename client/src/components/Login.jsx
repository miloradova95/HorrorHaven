import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from './axiosConfig';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { login } = useContext(AuthContext);
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

            const response = await axios.post('http://localhost:3000/login', formData, { withCredentials: true });
            console.log('Login Response:', response.data);

            const userId = response.data.id;

            if (userId) {
                login(formData);
                navigate(`/profile/${userId}`);
            } else {
                console.error('User ID not found in response:', response.data);
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
