import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth"
import { useNavigate } from "react-router-dom"
import ForgotPassForm from "../components/ForgotPassword/ForgotPassForm"
import OtpModal from "../components/misc/OtpModal"
import { userForgotPassVerify, userForgotPassword } from "../api/user"

export default function ForgotPassword () {
    const [otpModalOpen, setOtpModalOpen] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpExpiresAt, setOtpExpiresAt] = useState('')

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        newPass: '',
        confirmNewPass: ''
    })

    const {user, setMessageProps} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            navigate('/my-notes', {replace: true})
        }
    }, [])

    const handleChange = (event) => {
        setFormData((preData) => ({
            ...preData,
            [event.target.name]: event.target.value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true)
            const res = await userForgotPassVerify(formData)
            setOtpModalOpen(true)
            setOtpExpiresAt(res.data.expiresAt)
        } catch (error) {
            //console.log(error.message)
            setMessageProps({
                isOpen: true,
                title: 'Forgot Password Error',
                message: error.response.data.message,
                type: 'failure'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (otp) => {
        try {
            setOtpLoading(true)
            const res = await userForgotPassword({...formData, otp: otp})
            setOtpModalOpen(false)
            setMessageProps({
                isOpen: true,
                title: 'Password Change Successful',
                message: res.data.message,
                type: 'success'
            })
            navigate('/login', {replace: true})
        } catch (error) {
            //console.log(error.message)
            setMessageProps({
                isOpen: true,
                title: 'Otp Error',
                message: error.response.data.message,
                type: 'failure'
            })
        } finally {
            setOtpLoading(false);
        }
    }

    const handleResendOtp = async () => {
        try {
            setOtpLoading(true)
            const res = await userForgotPassVerify(formData)
            setOtpExpiresAt(res.data.expiresAt)
            setMessageProps({
                isOpen: true,
                title: 'Otp Resend Successful',
                message: res.data.message,
                type: 'success'
            })
        }
        catch (error) {
            //console.log(error.message)
            setMessageProps({
                isOpen: true,
                title: 'Otp Resend Error',
                message: error.response.data.message,
                type: 'failure'
            })
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
                <OtpModal
                    isOpen={otpModalOpen}
                    onClose={() => setOtpModalOpen(false)}
                    email={formData.email}
                    onVerify={handleVerifyOtp}
                    loading={otpLoading}
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
                            text-blue-950"
                        >
                            Forgot Password
                        </p>
                        <p className="
                            mt-5
                            text-gray-600
                            text-base
                            sm:text-lg"
                        >
                            Enter your email and your new password.
                        </p>
                    </div>
                    <ForgotPassForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}