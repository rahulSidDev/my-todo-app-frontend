import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.jsx";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/Signup/SignupForm.jsx";
import OtpVerificationModal from "../components/misc/OtpVerificationModal.jsx";
import { userOtp, userSignup } from "../api/user";

export default function Signup() {
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState('')
    const [otpExpiresAt, setOtpExpiresAt] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [errorTimer, setErrorTimer] = useState(0)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
    });

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/my-notes", {replace: true});
        }
    }, []);

    const showError = (message) => {
        setError(message);
        setErrorTimer(5);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        try {
            //api call
            const res = await userOtp(formData);
            setOtpModalOpen(true)
            setOtpExpiresAt(res.data.expiresAt)
        } catch (error) {
            console.log(error.message);
            showError(
                error.response?.data?.message || 
                "Unable to log in. Please try again."
            )
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (otp) => {
        try {
            setOtpLoading(true);
            setOtpError("");
            const res = await userSignup({...formData, otp: otp})
            setOtpModalOpen(false);
            navigate("/my-notes", {replace: true});
        } catch (error) {
            setOtpError(
                error.response?.data?.message ||
                "Invalid verification code."
            );
        } finally {
            setOtpLoading(false);
        }
    };
    
    const handleResendOtp = async () => {
        try {
            setOtpLoading(true)
            setOtpError('')
            const res = await userOtp(formData)
            setOtpExpiresAt(res.data.expiresAt)
        }
        catch (error) {
            setOtpError(
                error.response?.data?.message ||
                "Invalid verification code."
            );
        }
        finally {
            setOtpLoading(false)
        }
    }

    return (
        <div className="
        min-h-screen
        bg-slate-200
        pt-[75px]
        px-5
        py-5
        flex
        items-center
        justify-center"
        >
            <div className="
            w-full 
            max-w-md"
            >
                {otpModalOpen ?
                <OtpVerificationModal
                    isOpen={otpModalOpen}
                    onClose={() => setOtpModalOpen(false)}
                    email={formData.email}
                    onVerify={handleVerifyOtp}
                    loading={otpLoading}
                    error={otpError}
                    expiresAt={otpExpiresAt}
                    resendOtp={handleResendOtp}
                /> : ''}
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
                            Signup
                        </p>
                        <p className="
                        mt-5
                        text-gray-600
                        text-base
                        text-md
                        ">
                            Create your account and start organizing your tasks.
                        </p>
                    </div>
                    <SignupForm 
                    error={error}
                    setError={setError}
                    errorTimer={errorTimer}
                    setErrorTimer={setErrorTimer}
                    formData={formData}
                    setFormData={setFormData}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

