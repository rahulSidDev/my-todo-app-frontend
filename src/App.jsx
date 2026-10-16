import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyNotes from "./pages/MyNotes";
import NotFound from "./pages/NotFound";
import Note from "./pages/Note";
import Profile from "./pages/Profile";

import Navbar from "./components/misc/Navbar";
import Footer from "./components/misc/Footer";

import { useContext } from "react";

import { AuthContext } from "./contexts/auth";
import TrashBin from "./pages/TrashBin";
import ForgotPassword from "./pages/ForgotPassword";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ProtectedRoute from "./services/ProtectedRoute";
import MessageBox from "./components/misc/MessageBox";

export default function App() {
    const { 
        user, 
        loading, 
        messageProps,
        setMessageProps
     } = useContext(AuthContext);

    if (loading) {
        return <div></div>;
    }

    return (
        <div>
            <Navbar />
            <MessageBox 
                isOpen={messageProps.isOpen}
                title={messageProps.title}
                message={messageProps.message}
                type={messageProps.type}
                onClose={() => 
                    setMessageProps({...messageProps, isOpen: false})
                }
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="*" element={<NotFound />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/note/:id" element={<Note />} />
                    <Route path="/my-notes" element={<MyNotes />} />
                    <Route path="/trash-bin" element={<TrashBin />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
            <Footer />
        </div>
    );
}
