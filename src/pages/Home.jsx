import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

function Home() {
    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100">
            <h1 className="text-5xl font-bold text-blue-950 mb-4">
                MyTodo App
            </h1>

            <p className="text-lg text-gray-600 mb-8 text-center">
                Organize your tasks, boost productivity, and keep track of
                everything in one place.
            </p>

            <div className="flex gap-4">
                {isLoggedIn ? (
                    <>
                        <p className="font-bold text-4xl px-6 text-blue-950">
                            Welcome <i>{user.name}</i>,
                        </p>
                        <Link
                            to="/dashboard"
                            className="px-6 py-3 bg-blue-950 text-white rounded-md"
                        >
                            Go to Dashboard
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/signup"
                            className="px-6 py-3 bg-blue-950 text-white rounded-md"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-white border border-blue-950 text-blue-950 rounded-md"
                        >
                            Login
                        </Link>
                    </>
                )}
            </div>

            <div className="grid grid-cols-3 gap-6 mt-20">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-xl">Create Todos</h3>
                    <p>Quickly add tasks and organize your day.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-xl">Track Progress</h3>
                    <p>Keep track of completed and pending tasks.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="font-bold text-xl">Secure Access</h3>
                    <p>Your todos are protected with authentication.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
