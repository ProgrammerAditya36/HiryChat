import React from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
const Footer = () => {
    return (
        <div>
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
    );
};

export default Footer;
