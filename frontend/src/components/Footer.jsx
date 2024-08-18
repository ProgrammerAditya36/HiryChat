import React, { useContext, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/authContext";
import { newMessage as sendNewMessage } from "../utils/services";
import { upload, sendFileToDB } from "../utils/services";
const Footer = () => {
    const { messages, setMessages, user, conversation, receiver } =
        useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    const [file, setFile] = useState(null);
    const sendMessage = async () => {
        if (inputValue === "" && !file) return;
        if (file) {
            const data = {
                sender: user.phone,
                receiver: receiver.phone,
                url: file,
                conversationId: conversation.id,
            };
            try {
                await sendFileToDB(data);
                setFile(null);
            } catch (err) {
                console.error("Error sending file:", err);
            } finally {
                setFile(null);
            }
        } else {
            try {
                if (inputValue === "") return;
                const newMessage = {
                    sender: user.phone,
                    receiver: receiver.phone,
                    message: inputValue,
                    conversationId: conversation.id,
                };
                await sendNewMessage(newMessage);
                setMessages([...messages, newMessage]);
            } catch (err) {
                console.error("Error sending message:", err);
            } finally {
                setInputValue("");
            }
        }
    };
    return (
        <div>
            <div className="flex-none border-t border-secondary-bg px-10 py-3">
                <div className="flex w-full rounded-lg border-red-300 bg-secondary-bg px-2 py-2 focus:border-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        className="w-full rounded-lg bg-inherit px-4 py-2 focus:outline-none"
                    />
                    <div className="flex items-center gap-2 text-primary-bg">
                        <div className="relative">
                            <label
                                htmlFor="upload"
                                className="block cursor-pointer"
                            >
                                <AttachFileIcon />
                            </label>
                            <input
                                type="file"
                                className="absolute hidden"
                                id="upload"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    const fileUrl = await upload(file);
                                    setFile(fileUrl);
                                    setInputValue(fileUrl);
                                }}
                            />
                        </div>

                        <button
                            className="rounded-lg bg-red-200 p-3"
                            onClick={sendMessage}
                        >
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
