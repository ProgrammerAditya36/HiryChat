import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/authContext";
const ChatHeader = () => {
    const [image, setImage] = useState("");
    const { selectedUser } = useContext(AuthContext);
    const user = selectedUser;
    useEffect(() => {
        const fetchImage = async () => {
            const response = await axios.get("https://randomuser.me/api/");
            setImage(response.data.results[0].picture.thumbnail);
        };
        fetchImage();
    }, []);
    const [menu, setMenu] = useState(false);
    return (
        <>
            <div className="flex items-center justify-between bg-secondary-bg">
                <div className="flex h-16 gap-3 p-2">
                    <img
                        src={user?.imgUrl}
                        alt="profile"
                        className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                        <h1 className="flex items-center gap-2 text-xl font-semibold">
                            {user?.name}
                            {user?.status == "online" ? (
                                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                            ) : (
                                <span className="h-2 w-2 rounded-full bg-red-500"></span>
                            )}
                        </h1>
                        <p className="text-gray-400">Typing ....</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatHeader;
