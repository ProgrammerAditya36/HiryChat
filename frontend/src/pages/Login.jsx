import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { loginInfo, updateLoginInfo, loginUser, loading } =
        useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className="flex h-screen items-center justify-center bg-red-300">
            <div className="rounded-lg bg-white p-10 shadow-lg">
                <h1 className="text-2xl font-semibold">Login</h1>
                <div className="mt-4 flex flex-col gap-4">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none"
                        value={loginInfo.phone}
                        onChange={(e) =>
                            updateLoginInfo({
                                ...loginInfo,
                                phone: e.target.value,
                            })
                        }
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="rounded-lg border-2 border-gray-300 px-3 py-2 focus:outline-none"
                        value={loginInfo.password}
                        onChange={(e) =>
                            updateLoginInfo({
                                ...loginInfo,
                                password: e.target.value,
                            })
                        }
                    />
                    <button
                        className="rounded-lg bg-red-500 py-2 text-white"
                        onClick={loginUser}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                    <div>
                        Don't have an account?{" "}
                        <span
                            className="cursor-pointer text-blue-500"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
