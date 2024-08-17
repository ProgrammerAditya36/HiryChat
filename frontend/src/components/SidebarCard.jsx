import React from "react";

const SidebarCard = ({ selected, name, message, img, id, onClick }) => {
    const containerClasses = selected
        ? "border-l-4 border-l-red-500 bg-secondary-bg"
        : "";

    return (
        <div>
            <div
                className={`flex h-16 cursor-pointer gap-3 border-t border-secondary-bg p-2 ${containerClasses}`}
                onClick={onClick}
            >
                <img
                    src={img}
                    alt="profile"
                    className="h-12 w-12 rounded-full"
                />
                <div>
                    <h1 className="flex items-center gap-2 font-semibold">
                        {name}
                    </h1>
                    <p className="text-sm text-gray-400">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default SidebarCard;
