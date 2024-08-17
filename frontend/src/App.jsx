import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function PrivateRoute({ element }) {
    const { user } = useContext(AuthContext);
    return user ? element : <Navigate to="/login" />;
}

function PublicRoute({ element }) {
    const { user } = useContext(AuthContext);
    return !user ? element : <Navigate to="/" />;
}

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<Chat />} />} />
                <Route
                    path="/login"
                    element={<PublicRoute element={<Login />} />}
                />
                <Route
                    path="/register"
                    element={<PublicRoute element={<Register />} />}
                />
                <Route
                    path="/profile"
                    element={<PrivateRoute element={<Profile />} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
}

export default App;
