// services.js
import axios from "axios";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig.js"; // Import your Firebase storage config
export const baseUrl = "http://localhost:5000/api";

export const registerUser = async (registerInfo) => {
    try {
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
        const response = await axios.get(
            `http://localhost:5000/api/user/connections?userId=${user_id}&status=active`,
        );
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

export const setConversation = async (sender, receiver) => {
    try {
        const response = await axios.post(`${baseUrl}/user/conversation/add`, {
            sender: sender.phone,
            receiver: receiver.phone,
        });
        return response.data;
    } catch (err) {
        console.error("Error setting conversation:", err);
    }
};

export const newMessage = async (message) => {
    try {
        console.log("Message", message);
        await axios.post(`${baseUrl}/user/message/new`, message);
    } catch (err) {
        console.error("Error sending message:", err);
    }
};

export const getMessages = async () => {
    try {
        const response = await axios.get(`${baseUrl}/user/messages/all`);
        return response.data;
    } catch (err) {
        console.error("Error fetching messages:", err);
    }
};

export const upload = async (file) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
                console.error("Upload error:", error);

                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(
                    uploadTask.snapshot.ref,
                );
                resolve(downloadURL);
            },
        );
    });
};

export const sendFileToDB = async (message) => {
    try {
        if (isImageUrl(message.url)) {
            // If the URL is an image, send it to the image API
            await axios.post(`${baseUrl}/user/image/new`, message);
        } else if (isVideoUrl(message.url)) {
            await axios.post(`${baseUrl}/user/video/new`, message);
        } else {
            // If the URL is not an image, send it to the file API (adjust as necessary)
            await axios.post(`${baseUrl}/user/file/new`, message);
        }
    } catch (err) {
        console.error("Error sending file:", err);
    }
};

// Helper function to determine if the URL is an image
const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
};

const isVideoUrl = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
};
