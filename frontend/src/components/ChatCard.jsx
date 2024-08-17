import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/authContext";
const ChatCard = () => {
    const [image, setImage] = useState("");
    const [isOnline, setIsOnline] = useState(true);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchImage = async () => {
            const response = await axios.get("https://randomuser.me/api/");
            setImage(response.data.results[0].picture.thumbnail);
        };
        fetchImage();
    }, []);
    const [menu, setMenu] = useState(false);
    return (
        <div className="flex items-center justify-between bg-secondary-bg">
            <div className="flex h-16 gap-3 p-2">
                <img
                    src={user?.imgUrl}
                    alt="profile"
                    className="h-12 w-12 rounded-full"
                />
                <div>
                    <h1 className="flex items-center gap-2 text-xl font-semibold">
                        {user?.name}
                        {isOnline ? (
                            <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        ) : null}
                    </h1>
                    <p className="text-gray-400">Hello</p>
                </div>
            </div>
        </div>
    );
};

export default ChatCard;
