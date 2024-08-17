import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";

import { AuthContext } from "../context/authContext";
import ChatHeader from "../components/ChatHeader";
import Messages from "../components/Messages";
import Footer from "../components/Footer";
const Chat = () => {
    const { selectedUser } = useContext(AuthContext);
    return (
        <div className="flex h-screen w-full">
            <div className="w-1/3">
                <Sidebar />
            </div>
            {selectedUser ? (
                <div className="flex h-screen w-2/3 flex-col">
                    <ChatHeader />
                    <Messages />
                    <Footer />
                </div>
            ) : (
                <div className="flex h-screen w-2/3 items-center justify-center">
                    <h1 className="text-2xl text-gray-400">
                        Select a user to start chat
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Chat;
