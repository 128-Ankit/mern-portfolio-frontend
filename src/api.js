import axios from 'axios';

// Base URL for your backend
const BASE_URL = 'http://localhost:5000';

// Create axios instance
const api = axios.create({
    baseURL: BASE_URL
});

// Get auth token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// API endpoints
const endpoints = {
    register: '/admin/register',
    login: '/admin/login',
    home: '/home', 
    about: '/about',
    experience: '/experience'
};

// Headers with auth token
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getAuthToken()}`
});

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await api.post(endpoints.login, credentials);
        if (response.data.token || response.ok) {
            localStorage.setItem('authToken', response.data.token);
            alert("Login successful");
        }
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await api.post(endpoints.register, userData);
        if (response.ok) {
            alert("Registration successful");
        }
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Get Home Containt
export const getHomeData = async () => {
    try {
        const response = await api.get(endpoints.home);
        return response.data;
    } catch (error) {
        console.error('Error getting home data:', error);
        throw error;
    }
};

// updateHomeData
export const updateHomeData = async (data) => {
    const { id } = data;
    try {
        const response = await api.put(`${endpoints.home}/${id}`, data, {
            headers: getHeaders()
        });
        if(response.ok){
            alert('Home data updated successfully');
        }
        return response.data;
    } catch (error) {
        console.error('Error updating home data:', error);
        throw error;
    }
};

//getAbout 
export const getAbout = async () => {
    try {
        const response = await api.get(endpoints.about);
        return response.data;
    } catch (error) {
        console.error('Error getting home data:', error);
        throw error;
    }
};

// updateAbout
export const updateAbout = async (data) => {
    const { id } = data;
    try {
        const response = await api.put(`${endpoints.about}/${id}`, data, {
            headers: getHeaders()
        });
        if(response.ok){
            alert('About data updated successfully');
        }
        return response.data;
    } catch (error) {
        console.error('Error updating about data:', error);
        throw error;
    }
};

//getExperience
export const getExperience = async () => {
    try {
        const response = await api.get(endpoints.experience);
        return response.data;
    } catch (error) {
        console.error('Error getting experience data:', error);
        throw error;
    }
};

// updateExperience
export const updateExperience = async (data) => {
    const { id } = data;
    try {
        const response = await api.put(`${endpoints.about}/${id}`, data, {
            headers: getHeaders()
        });
        if(response.ok){
            alert('About data updated successfully');
        }
        return response.data;
    } catch (error) {
        console.error('Error updating about data:', error);
        throw error;
    }
};

// deleteExperience
export const deleteExperience = async (data) => {
    const { id } = data;
    try {
        const response = await api.delete(`${endpoints.about}/${id}`, data, {
            headers: getHeaders()
        });
        if(response.ok){
            alert('About data updated successfully');
        }
        return response.data;
    } catch (error) {
        console.error('Error updating about data:', error);
        throw error;
    }
};