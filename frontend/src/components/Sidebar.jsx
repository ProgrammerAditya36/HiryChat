import React, { useContext, useEffect, useState } from "react";
import SidebarCard from "./SidebarCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from "../context/authContext";
import axios from "axios";
const buttons = [
    {
        id: 1,
        name: "All",
    },
    {
        id: 2,
        name: "Unread",
    },
    {
        id: 3,
        name: "Archived",
    },
    {
        id: 4,
        name: "Blocked",
    },
];
const Sidebar = () => {
    const [selected, setSelected] = useState(1);
    const [buttonSelected, setButtonSelected] = useState(1);
    const { user, logout, activeChats, allOtherUsers, setSelectedUser } =
        useContext(AuthContext);
    console.log("Other Users", allOtherUsers);
    return (
        <div className="flex h-screen flex-col border-r border-secondary-bg">
            <div className="sticky flex h-16 border-b border-secondary-bg px-3 py-2">
                <img
                    src={user?.imgUrl}
                    alt="profile"
                    className="h-12 w-12 rounded-full"
                />
                <input
                    type="text"
                    placeholder="Search"
                    className="h-12 w-full rounded-lg border-2 border-text-sender bg-secondary-bg px-3 py-2 focus:outline-none"
                />
                <button onClick={logout}>
                    <MoreVertIcon />
                </button>
            </div>
            <div className="flex gap-2 bg-secondary-bg px-10 py-3">
                {buttons.map((button) => {
                    return (
                        <button
                            key={button.id}
                            className={`rounded-full border border-gray-300 px-3 py-1 ${
                                buttonSelected === button.id
                                    ? "bg-primary-bg text-text-user"
                                    : "bg-white"
                            }`}
                            onClick={() => setButtonSelected(button.id)}
                        >
                            {button.name}
                        </button>
                    );
                })}
            </div>
            <div className="flex flex-grow flex-col overflow-y-auto">
                {allOtherUsers?.map((chat) => {
                    return (
                        <SidebarCard
                            key={chat.id}
                            selected={selected === chat.id}
                            name={chat.name}
                            message={chat.message}
                            img={chat.imgUrl}
                            id={chat.id}
                            onClick={() => setSelectedUser(chat)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;
