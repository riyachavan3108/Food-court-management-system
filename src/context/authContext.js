import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        axios.get("http://localhost:5001/api/auth/check", { withCredentials: true })
            .then((res) => {
                if (res.data.isAuthenticated) {
                    setUser(res.data.user);
                }
            })
            .catch(() => setUser(null));
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5001/api/auth/login", { email, password }, { withCredentials: true });
            setUser(res.data.user);
            return res.data;
        } catch (err) {
            return { error: err.response.data.message };
        }
    };

    const logout = async () => {
        await axios.post("http://localhost:5001/api/auth/logout", {}, { withCredentials: true });
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
