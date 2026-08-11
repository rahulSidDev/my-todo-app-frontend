import React, { useContext, useEffect } from "react";
import LoginForm from "../components/Login/LoginForm.jsx";
import { AuthContext } from "../contexts/auth.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/my-notes");
        }
    }, []);

    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-slate-100">
            <LoginForm />
        </div>
    );
}

export default Login;
