import React, { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm.jsx";
import { AuthContext } from "../contexts/auth.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-slate-100">
            <LoginForm />
        </div>
    );
}

export default Login;
