import { createContext, useState, useEffect, useContext } from "react";
import { userProfile } from "../api/user";

//Create context
export const AuthContext = createContext();

//Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await userProfile();

            if (response.data.success) {
                const data = response.data;
                setUser(data.data[0]);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (e) {
            console.log(e.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        isLoggedIn,
        loading,
        setIsLoggedIn,
        setUser,
    };

    return (
        <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
    );
}
