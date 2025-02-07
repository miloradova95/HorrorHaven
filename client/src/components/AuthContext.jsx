import React, { createContext, useState, useEffect } from 'react';
import axios from './axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if the user is authenticated when the component mounts
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users/userid', { withCredentials: true });
                if (response.data) {
                    setUser(response.data); // Store the entire user object
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setUser(null);
            }
        };

        checkAuthStatus();
    }, []);


    const login = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3000/login', formData, { withCredentials: true });
            if (response.data) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error while logging in:', error);
        }
    };


    const logout = async () => {
        try {
            await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
            setUser(null);
        } catch (error) {
            console.error('Error while logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
