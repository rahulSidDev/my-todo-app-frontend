import { createContext, useState, useEffect, useContext } from "react";
import { userProfile } from "../api/user";

//Create context
export const AuthContext = createContext();

//Provider
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await userProfile();

            if (response.data.success) {
                setUser(response.data.data);
            } else {
                setUser(null);
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
        loading,
        setUser,
        setLoading
    };

    return (
        <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
    );
}
