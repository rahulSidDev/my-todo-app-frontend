import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth.jsx";
import { Link, useNavigate } from "react-router-dom";
import { userOtp, userSignup } from "../api/user";
import SignupForm from "../components/Signup/SignupForm.jsx";
import OtpModal from "../components/misc/OtpModal.jsx";
import { 
    validatePassword,
    validateConfirmPass,
    validateEmail
} from "../services/formValidators.jsx";

export default function Signup() {
    const [otpOpen, setOtpOpen] = useState(false)
    const [otpLoading, setOtpLoading] = useState(false)
    const [otpExpires, setOtpExpires] = useState('')

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
    });
    const [formError, setFormError] = useState('')
    const [passMatch, setPassMatch] = useState({
        text: '',
        isMatch: false
    })

    const { user, setMessageProps } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/my-notes", {replace: true});
        }
    }, []);

    function handleChange(event) {
        setFormData((preData) => ({
            ...preData,
            [event.target.name]: event.target.value,
        }));
        
        if (event.target.name === 'confirmPass') {
            const isMatch = validateConfirmPass(
                formData.password,
                event.target.value
            )
            setPassMatch({
                text: isMatch
                ? 'Password and Confirm Password match.'
                : 'Password and Confirm Password do not match.',
                isMatch: isMatch
            })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.name === '') {
            setFormError('Name field cannot be empty')
            return
        }
        if (formData.email === '') {
            setFormError('Email field cannot be empty')
            return
        }
        if (!validateEmail(formData.email)) {
            setFormError('Email is not valid')
            return
        }
        if (formData.password === '') {
            setFormError('Password cannot be empty')
            return
        }
        const passErrors = await validatePassword(formData.password)
        if (passErrors.length !== 0) {
            setFormError(passErrors[0])
            return
        }
        if (formData.confirmPass === '') {
            setFormError('Confirm Password cannot be empty')
            return
        }
        if (!validateConfirmPass(
            formData.password,
            formData.confirmPass
        )) {
            setFormError('Password and Confirm Password do not match')
            return
        }
        try {
            setLoading(true)
            const res = await userOtp(formData);
            setOtpOpen(true)
            setOtpExpires(res.data.expiresAt)
        } catch (error) {
            //console.log(error);
            setMessageProps({
                title: 'Signup Error',
                message: error.response.data.message,
                isOpen: true,
                type: 'failure'
            })
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (otp) => {
        try {
            setOtpLoading(true)
            const res = await userSignup({...formData, otp: otp})
            setOtpOpen(false)
            setMessageProps({
                title: 'Signup Successful',
                message: res.data.message,
                isOpen: true,
                type: 'success'
            })
            navigate('/login')
        } catch (error) {
            //console.log(error)
            setMessageProps({
                title: 'Otp Error',
                message: error.response.data.message,
                isOpen: true,
                type: 'failure'
            })
        } finally {
            setOtpLoading(false)
        }
    };
    
    const handleResendOtp = async () => {
        try {
            setOtpLoading(true)
            const res = await userOtp(formData)
            setOtpExpires(res.data.expiresAt)
            setMessageProps({
                title: 'Otp Resend Successful',
                message: res.data.message,
                isOpen: true,
                type: 'success'
            })
        }
        catch (error) {
            //console.log(error)
            setMessageProps({
                title: 'Otp Resend Error',
                message: error.response.data.message,
                isOpen: true,
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
            pt-[75px]
            p-5
            flex
            items-center
            justify-center"
        >
            <div className="
                w-full 
                max-w-md"
            >
                {otpOpen ?
                <OtpModal
                    isOpen={otpOpen}
                    onClose={() => setOtpOpen(false)}
                    email={formData.email}
                    onVerify={handleVerifyOtp}
                    loading={otpLoading}
                    expiresAt={otpExpires}
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
                            Signup
                        </p>
                        <p className="
                            mt-5
                            text-gray-600
                            text-base
                            text-md"
                        >
                            Create your account and start organizing 
                            your tasks.
                        </p>
                    </div>
                    <SignupForm 
                        formError={formError}
                        formData={formData}
                        passMatch={passMatch}
                        handleChange={handleChange}
                        loading={loading}
                        handleSubmit={handleSubmit}
                    />
                    {/* Link to Login */}
                    <div className="
                        mt-5
                        text-center
                        text-sm
                        text-gray-600"
                    >
                        Already have an account?{" "}
                        <Link className="
                            font-semibold
                            text-blue-950
                            hover:underline
                            hover:decoration-2
                            underline-offset-4"
                            to="/login"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

