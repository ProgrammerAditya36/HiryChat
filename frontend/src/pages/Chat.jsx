import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import ChatCard from "../components/ChatCard";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/authContext";
const Chat = () => {
    const { selectedUser } = useContext(AuthContext);
    return (
        <div className="flex h-screen w-full">
            <div className="w-1/3">
                <Sidebar />
            </div>
            {selectedUser ? (
                <div className="flex h-screen w-2/3 flex-col">
                    <div className="flex-none">
                        <ChatCard />
                    </div>
                    <div className="flex-grow">Hello</div>
                    <div className="flex-none border-t border-secondary-bg px-10 py-3">
                        <div className="flex w-full rounded-lg border-red-300 bg-secondary-bg px-2 py-2 focus:border-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full rounded-lg bg-inherit px-4 py-2 focus:outline-none"
                            />
                            <div className="flex gap-2 text-primary-bg">
                                <button>
                                    <AttachFileIcon />
                                </button>
                                <button className="rounded-lg bg-red-200 p-3">
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
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
