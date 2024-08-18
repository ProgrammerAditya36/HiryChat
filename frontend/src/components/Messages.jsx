import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/authContext";

const Messages = () => {
    const { messages, user } = useContext(AuthContext);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const renderMessageContent = (message) => {
        console.log(message, message.type);
        if (message.type == "text") {
            return <span>{message.message}</span>;
        } else if (message.type == "image") {
            return (
                <img
                    src={message.message}
                    alt="file"
                    className="h-20 w-20 bg-white object-cover"
                />
            );
        } else if (message.type == "video") {
            return (
                <video
                    src={message.message}
                    controls
                    className="h-20 w-20 bg-white object-cover"
                />
            );
        } else if (message.type == "file") {
            return (
                <a
                    href={message.message}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    Download File
                </a>
            );
        } else {
            return <span>Unsupported message type</span>;
        }
    };

    return (
        <div className="flex-grow overflow-y-auto px-5 py-2">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex gap-3 ${
                        message.sender === user.phone
                            ? "justify-end"
                            : "justify-start"
                    }`}
                >
                    <div
                        className={`mb-2 flex gap-3 rounded-lg p-3 ${
                            message.sender === user.phone
                                ? "bg-primary-bg text-secondary-bg"
                                : "text-secondary-text bg-secondary-bg"
                        }`}
                    >
                        {renderMessageContent(message)}
                        <span className="self-end text-xs">
                            {formatTime(message.createdAt)}
                        </span>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Messages;
