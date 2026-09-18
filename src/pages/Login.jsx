import React, { useContext, useEffect } from "react";
import LoginForm from "../components/Login/LoginForm.jsx";
import { AuthContext } from "../contexts/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/my-notes", {replace: true});
        }
    }, []);

    return (
        <div className="
        min-h-screen
        bg-slate-200
        pt-[55px]
        px-5
        flex
        items-center
        justify-center"
        >
            <div className="
            w-full 
            max-w-md"
            >
                <div className="
                bg-white
                rounded-md
                shadow-md
                p-10"
                >
                    {/* Heading */}
                    <div className="
                    text-center 
                    mb-5"
                    >
                        <p className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        text-blue-950
                        ">
                            Login
                        </p>
                        <p className="
                        mt-5
                        text-gray-600
                        text-base
                        sm:text-lg
                        ">
                            Log in to access your notes.
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
