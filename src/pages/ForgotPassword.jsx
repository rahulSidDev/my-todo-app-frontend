import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth"
import { useNavigate } from "react-router-dom"
import ForgotPassForm from "../components/ForgotPassword/ForgotPassForm"
import OtpVerificationModal from "../components/misc/OtpVerificationModal"
import { userForgotPassVerify, userForgotPassword } from "../api/user"

export default function ForgotPassword () {
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState('')
    const [otpExpiresAt, setOtpExpiresAt] = useState('')

    const [error, setError] = useState('')
    const [errorTimer, setErrorTimer] = useState(0)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        newPass: '',
        confirmNewPass: ''
    })

    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/my-notes', {replace: true})
        }
    }, [])

    const showError = (message) => {
        setError(message);
        setErrorTimer(5);
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        try {
            const res = await userForgotPassVerify(formData)
            setOtpModalOpen(true)
            setOtpExpiresAt(res.data.expiresAt)
        } catch (error) {
            console.log(error.message)
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
            setOtpLoading(true)
            setOtpError('')
            const res = await userForgotPassword({...formData, otp: otp})
            setOtpModalOpen(false)
            navigate('/login', {replace: true})
        } catch (error) {
            setOtpError(
                error.response?.data?.message ||
                "Invalid verification code."
            );
        } finally {
            setOtpLoading(false);
        }
    }

    const handleResendOtp = async () => {
        try {
            setOtpLoading(true)
            setOtpError('')
            const res = await userForgotPassVerify(formData)
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
                            Forgot Password
                        </p>
                        <p className="
                        mt-5
                        text-gray-600
                        text-base
                        sm:text-lg
                        ">
                            Enter your email and your new password.
                        </p>
                    </div>
                    <ForgotPassForm 
                    error={error}
                    setError={setError}
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                    errorTimer={errorTimer}
                    setErrorTimer={setErrorTimer}
                    loading={loading}
                    setLoading={setLoading}
                    />
                </div>
            </div>
        </div>
    )
}