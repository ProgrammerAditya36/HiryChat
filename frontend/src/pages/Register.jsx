import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig.js"; // Import your Firebase storage config

const Register = () => {
    const {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        loading,
        setLoading,
        registerError,
        setRegisterError,
    } = useContext(AuthContext);
    const [file, setFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(""); // State for image URL
    const navigate = useNavigate();

    // Function to upload file to Firebase Storage and get download URL
    const uploadFileToFirebase = async (file) => {
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

    // Function to update the database with the registration information
    const updateDatabase = async (imgUrl) => {
        await updateRegisterInfo({
            ...registerInfo,
            imgUrl,
        });
    };

    // Handle file change and upload the image immediately
    const handleFileChange = async (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
            setLoading(true);
            try {
                const downloadURL = await uploadFileToFirebase(
                    e.target.files[0],
                );
                setImgUrl(downloadURL); // Set the imgUrl state
                await updateDatabase(downloadURL);
            } catch (error) {
                console.error(
                    "An error occurred during file upload or database update:",
                    error,
                );
                setRegisterError("An error occurred during file upload");
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle form submission
    const handleUpload = async (e) => {
        e.preventDefault();
        if (imgUrl) {
            setLoading(true);
            try {
                await registerUser();
            } catch (error) {
                console.error("An error occurred during registration:", error);
                setRegisterError("An error occurred during registration");
            } finally {
                setLoading(false);
            }
        } else {
            console.error("No image URL found");
            setRegisterError("Please upload an image");
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-red-300 to-yellow-300">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h1 className="text-center text-3xl font-semibold text-gray-800">
                    Create an Account
                </h1>
                <p className="mt-2 text-center text-gray-600">
                    Please fill in the details below
                </p>
                <div className="mt-6 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                        value={registerInfo.name}
                        onChange={(e) =>
                            updateRegisterInfo({
                                ...registerInfo,
                                name: e.target.value,
                            })
                        }
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                        value={registerInfo.phone}
                        onChange={(e) =>
                            updateRegisterInfo({
                                ...registerInfo,
                                phone: e.target.value,
                            })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 focus:border-blue-500 focus:outline-none"
                        value={registerInfo.password}
                        onChange={(e) =>
                            updateRegisterInfo({
                                ...registerInfo,
                                password: e.target.value,
                            })
                        }
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 text-gray-700 focus:outline-none"
                        onChange={handleFileChange}
                    />
                    <button
                        className={`w-full rounded-lg py-2 text-white ${
                            loading
                                ? "bg-gray-400"
                                : "bg-blue-500 hover:bg-blue-600"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                    {registerError && (
                        <div className="mt-2 text-center text-red-700">
                            {registerError}
                        </div>
                    )}
                    <div className="mt-4 text-center text-gray-600">
                        Already have an account?{" "}
                        <span
                            className="cursor-pointer text-blue-500 hover:underline"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </span>
                    </div>
                    {imgUrl && (
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">Uploaded Image:</p>
                            <img
                                src={imgUrl}
                                alt="Uploaded"
                                className="mx-auto mt-2 h-24 w-24 rounded-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
