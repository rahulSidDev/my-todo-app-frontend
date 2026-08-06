import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OtpVerification from "./pages/OtpVerification";
import MyNotes from "./pages/MyNotes";
import NotFound from "./pages/NotFound";
import Note from "./pages/Note";
import Profile from "./pages/Profile";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { useContext } from "react";

import { AuthContext } from "./contexts/auth";

export default function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div></div>;
    }

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/note/:id" element={<Note />} />
                <Route path="/my-notes" element={<MyNotes />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
        </div>
    );
}
