import React, { useContext, useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../context/authContext";
import { newMessage as sendNewMessage } from "../utils/services";
const Footer = () => {
    const { messages, setMessages, user, conversation, receiver } =
        useContext(AuthContext);
    const [inputValue, setInputValue] = useState("");
    console.log(messages);
    const sendMessage = async () => {
        try {
            if (inputValue === "") return;
            const newMessage = {
                sender: user.phone,
                receiver: receiver.phone,
                message: inputValue,
                time: new Date().toLocaleTimeString(),
                conversationId: conversation.id,
                type: "text",
            };
            await sendNewMessage(newMessage);
            setMessages([...messages, newMessage]);
        } catch (err) {
            console.error("Error sending message:", err);
        } finally {
            setInputValue("");
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
                    <div className="flex gap-2 text-primary-bg">
                        <button>
                            <AttachFileIcon />
                        </button>
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
