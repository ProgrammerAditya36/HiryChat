import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { ArrowBack } from "@mui/icons-material";
const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate("/chat");
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                <button
                    onClick={handleBackClick}
                    className="mb-4 rounded px-4 py-2 text-black transition-colors hover:text-gray-600"
                >
                    <ArrowBack />
                </button>
                <div className="flex flex-col items-center">
                    <img
                        className="mb-4 h-32 w-32 rounded-full object-cover"
                        src={user?.imgUrl}
                        alt={`${user?.name}'s profile`}
                    />
                    <h1 className="mb-2 text-2xl font-semibold text-gray-800">
                        {user?.name}
                    </h1>
                    <p className="text-gray-600">{user?.phone}</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
