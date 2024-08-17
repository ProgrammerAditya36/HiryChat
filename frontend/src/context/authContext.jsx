import { createContext, useCallback, useEffect, useState } from "react";
import {
    registerUser as registerUserService,
    loginUser as loginUserService,
    getActiveChats as getActiveChatsService,
    getAllUsers as getAllUsersService,
    updateUser as updateUserService,
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
    const [updateInfo, setUpdateInfo] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        imgUrl: user?.imgUrl || "",
    });
    useEffect(() => {
        getAllUsersService().then((data) => {
            setAllUsers(data);
        });
        getAllUsersService().then((data) => {
            setAllOtherUsers(data.filter((u) => u.phone !== user?.phone));
        });
    }, [user]);
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
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
