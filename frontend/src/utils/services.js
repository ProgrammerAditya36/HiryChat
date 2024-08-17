// services.js
import axios from "axios";

export const baseUrl = "http://localhost:5000/api";

export const registerUser = async (registerInfo) => {
    try {
        console.log("Register info:", registerInfo);
        const response = await axios.post(
            `${baseUrl}/user/register`,
            registerInfo,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return response.data;
    } catch (err) {
        console.error("Registration failed:", err.response.data);
        return {
            error: err.response.data,
        };
    }
};

export const loginUser = async (loginInfo) => {
    try {
        const response = await axios.post(`${baseUrl}/user/login`, loginInfo, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (err) {
        console.error("Login failed:", err.response.data);
        return {
            error: err.response.data,
        };
    }
};

export const getActiveChats = async (user_id) => {
    try {
        console.log("User ID:", user_id);
        const response = await axios.get(
            `http://localhost:5000/api/user/connections?userId=${user_id}&status=active`,
        );
        console.log("Active chats:", response);
        return response.data;
    } catch (err) {
        console.error("Error fetching active chats:", err);
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}/user/all`);
        return response.data;
    } catch (err) {
        console.error("Error fetching all users:", err);
    }
};

export const updateUser = async (phone, data) => {
    try {
        const response = await axios.put(`${baseUrl}/user/${phone}`, data);
        return response.data;
    } catch (err) {
        console.error("Error updating user:", err);
    }
};
