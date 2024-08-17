import React, { useContext, useEffect, useState } from "react";
import SidebarCard from "./SidebarCard";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
    const {
        user,
        logout,
        activeChats,
        allOtherUsers,
        setSelectedUser,
        allUsers,
    } = useContext(AuthContext);
    console.log("All Users", allUsers);
    console.log("Other Users", allOtherUsers);
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className="relative flex h-screen flex-col border-r border-secondary-bg">
            <div className="sticky flex h-16 gap-3 border-b border-secondary-bg px-3 py-2">
                <img
                    src={user?.imgUrl}
                    alt="profile"
                    className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-grow">
                    <input
                        type="text"
                        placeholder="Search"
                        className="h-12 w-full rounded-lg border-2 border-text-sender bg-secondary-bg px-3 py-2 focus:outline-none"
                    />
                    <button
                        className="flex-grow-0"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <MoreVertIcon />
                    </button>
                </div>

                {showMenu && (
                    <div className="absolute right-2 top-14 flex flex-col gap-2 rounded-lg bg-white p-2 shadow-lg">
                        <button className="w-full" onClick={logout}>
                            Logout
                        </button>
                        <button
                            className="w-full"
                            onClick={() => navigate(`/profile`)}
                        >
                            Show Profile
                        </button>
                    </div>
                )}
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
                            key={chat.phone}
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
