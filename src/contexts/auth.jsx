import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

//Create context
export const AuthContext = createContext();

//Provider
export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=> {
        checkAuth()
    }, []);

    const checkAuth = async () => {
        try{
            const response = await axios.get("https://my-todo-app-backend-bngt.onrender.com/api/v1/user/profile", {withCredentials: true});
            
            if(response.data.success) {
                const data = response.data;
                setUser(data);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
        catch(e) {
            console.log(e.message);
        }
    }

    const value = {
        user,
        isLoggedIn,
        setIsLoggedIn,
        setUser,
    }

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}