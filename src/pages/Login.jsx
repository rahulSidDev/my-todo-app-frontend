import { useState, useContext, useEffect } from "react";
import LoginForm from "../components/Login/LoginForm.jsx";
import { useNavigate, Link } from "react-router-dom";
import MessageBox from "../components/misc/MessageBox";
import { AuthContext } from "../contexts/auth.jsx";
import { userLogin } from "../api/user.jsx";

export default function Login() {
    const { user, setUser, setMessageProps } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    
    useEffect(() => {
        if (user) {
            navigate("/my-notes", {replace: true});
        }
    }, []);

    const handleChange = (event) => {
        setFormData((preData) => ({
            ...preData,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            //api call later
            const res = await userLogin(formData);
            if (res.data.success) {
                setUser(res.data.user);
                navigate("/my-notes", {replace: true});
            }
        } catch (error) {
            //console.log(error);
            setMessageProps({
                title: 'Login Error',
                message: error.response.data.message,
                type: 'failure',
                isOpen: true
            })
        } finally {
            setLoading(false)
        }
    }


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
                            text-blue-950"
                        >
                            Login
                        </p>
                        <p className="
                            mt-5
                            text-gray-600
                            text-base
                            sm:text-lg"
                        >
                            Log in to access your notes.
                        </p>
                    </div>
                    <LoginForm 
                        setMessageProps={setMessageProps}
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        formData={formData}
                        loading={loading}
                    />
                    {/* Forgot password */}
                    <Link className="
                        mt-5
                        flex
                        justify-center
                        text-sm
                        font-semibold
                        text-blue-950
                        hover:underline
                        hover:decoration-2
                        underline-offset-4"
                        to="/forgot-password"
                    >
                        Forgot password?
                    </Link>
                    {/* Link to Sign up */}
                    <div className="
                        mt-5
                        text-center
                        text-sm
                        text-gray-600"
                    >
                        Don't have an account?{" "}
                        <Link className="
                            font-semibold
                            text-blue-950
                            hover:underline
                            hover:decoration-2
                            underline-offset-4"
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
