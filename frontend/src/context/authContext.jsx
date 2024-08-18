import { createContext, useCallback, useEffect, useState } from "react";
import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    getActiveChats as getActiveChatsService,
    getAllUsers as getAllUsersService,
    updateUser as updateUserService,
    setConversation as setConversationService,
    getMessages as getMessagesService, // Import the service
} from "../utils/services";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null,
    );
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [activeChats, setActiveChats] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [allOtherUsers, setAllOtherUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [allMessages, setAllMessages] = useState([]);
    const [messagesChunkSize, setMessagesChunkSize] = useState(20); // Number of messages to load per chunk
    const [receiver, setReceiver] = useState(null);
    const [updateInfo, setUpdateInfo] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        imgUrl: user?.imgUrl || "",
    });
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        phone: "",
        password: "",
        imgUrl: "",
    });
    const [loginInfo, setLoginInfo] = useState({
        phone: "",
        password: "",
    });

    useEffect(() => {
        if (user) {
            getAllUsersService().then((data) => {
                setAllUsers(data);
                setAllOtherUsers(data.filter((u) => u.phone !== user.phone));
            });
        }
    }, [user]);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }, [navigate]);

    const loginUser = useCallback(async () => {
        setLoading(true);
        try {
            const data = await loginUserService(loginInfo);
            if (data) {
                if (data.error) {
                    console.error("Login failed:", data.error.message);
                    return;
                }
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setLoginInfo({ phone: "", password: "" });
                navigate("/");
            }
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setLoading(false);
        }
    }, [loginInfo, navigate]);

    const updateUser = useCallback(async () => {
        setLoading(true);
        try {
            const inpdata = {
                name: updateInfo.name,
                imgUrl: updateInfo.imgUrl,
            };
            const data = await updateUserService(user.phone, inpdata);
            if (data) {
                if (data.error) {
                    console.error("Update failed:", data.error.message);
                    return;
                }
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUpdateInfo({
                    name: "",
                    phone: "",
                    imgUrl: "",
                });
                navigate("/");
            }
        } catch (err) {
            console.error("Update failed:", err);
        } finally {
            setLoading(false);
        }
    }, [updateInfo, navigate]);

    const registerUser = useCallback(async () => {
        setLoading(true);
        setRegisterError(null);
        try {
            const data = await registerUserService(registerInfo);
            if (data) {
                if (data.error) {
                    setRegisterError(data.error.message);
                    return;
                }
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
                setRegisterInfo({
                    name: "",
                    phone: "",
                    password: "",
                    imgUrl: "",
                });
                navigate("/");
            }
        } catch (err) {
            console.error("Registration failed:", err);
            setRegisterError("Registration failed " + err);
        } finally {
            setLoading(false);
        }
    }, [registerInfo, navigate]);

    const getActiveChats = async () => {
        const user_id = user?.id;
        if (!user_id) return;
        const data = await getActiveChatsService(user_id);
        setActiveChats(data);
    };

    const createConversation = async (receiver) => {
        setReceiver(receiver);
        const data = await setConversationService(user, receiver);
        setConversation(data);
        return data;
    };

    const loadMessages = async (conversationId) => {
        const messages = await getMessagesService();
        const data = messages?.filter(
            (m) => m.conversationId === conversationId,
        );
        if (data.error) {
            console.error("Failed to load messages:", data.error);
            return;
        }
        setAllMessages(data); // Store all messages
        setMessages(data.slice(0, messagesChunkSize)); // Load the first chunk initially
    };

    const fetchMoreMessages = () => {
        setMessages((prevMessages) => {
            const remainingMessages = allMessages.length - prevMessages.length;
            const additionalMessages = Math.min(
                remainingMessages,
                messagesChunkSize,
            );
            const newMessages = allMessages.slice(
                prevMessages.length,
                prevMessages.length + additionalMessages,
            );
            return [...prevMessages, ...newMessages];
        });
    };

    useEffect(() => {
        getActiveChats();
    }, [user]);

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                loading,
                setLoading,
                registerError,
                loginInfo,
                updateLoginInfo,
                loginUser,
                logout,
                activeChats,
                getActiveChats,
                allUsers,
                allOtherUsers,
                setRegisterError,
                selectedUser,
                setSelectedUser,
                updateInfo,
                setUpdateInfo,
                updateUser,
                conversation,
                createConversation,
                messages,
                fetchMoreMessages,
                loadMessages,
                receiver,
                setMessages,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
