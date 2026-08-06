import { useContext, useEffect } from "react";
import SignupForm from "../components/SignupForm.jsx";
import { AuthContext } from "../contexts/auth.jsx";
import { useNavigate } from "react-router-dom";

function Signup() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/my-notes");
        }
    }, []);

    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-slate-100">
            <SignupForm />
        </div>
    );
}

export default Signup;
