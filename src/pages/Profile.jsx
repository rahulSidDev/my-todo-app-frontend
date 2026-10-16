import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../contexts/auth"
import { useNavigate } from "react-router-dom"
import { userUpdateEmail, userUpdateEmailOtp, userUpdatePreferences } from "../api/user"
import { userChangePassword } from "../api/user"
import { userDelete } from "../api/user"

import Details from "../components/Profile/Details"
import ChangePass from "../components/Profile/ChangePass"
import DeleteAccount from "../components/Profile/DeleteAccount"
import OtpModal from '../components/misc/OtpModal'

export default function () {
    const {user, setUser, setMessageProps} = useContext(AuthContext)
    const navigate = useNavigate()

    const [details, setDetails] = useState({
        name: user.name,
        email: user.email,
        colorPreference: user.colorPreference
    })
    const [changePass, setChangePass] = useState({
        password: '',
        newPass: '',
        confirmNewPass: ''
    })
    const [deletePass, setDeletePass] = useState({password: ''})
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)
    const [otpOpen, setOtpOpen] = useState(false)
    const [otpExpiresAt, setOtpExpiresAt] = useState('')
    const [otpLoading, setOtpLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate('/login', {replace: true})
        }
    }, [user])

    const handleDetailsSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await userUpdatePreferences({
                name: details.name,
                colorPreference: details.colorPreference
            })
            setMessageProps({
                isOpen: true,
                title: 'User Details Update Successful',
                message: res.data.message,
                type: 'success'
            })
            setUser(res.data.data)
        }
        catch (error) {
            //console.log(error.message)
            setMessageProps({
                isOpen: true,
                title: 'User Details Update Error',
                message: error.response.data.message,
                type: 'failure'
            })
        }
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await userUpdateEmailOtp({newEmail: details.email})
            setOtpOpen(true)
            setOtpExpiresAt(res.data.expiresAt)
        }
        catch (error) {
            //console.log(error.message)
            setMessageProps({
                isOpen: true,
                title: 'Email Update Error',
                message: error.response.data.message,
                type: 'failure'
            })
        }
    }

    const verifyOtp = async (otp) => {
        try {
            setOtpLoading(true)
            const res = await userUpdateEmail({
                email: details.email,
                otp: otp
            })
            setMessageProps({
                isOpen: true,
                title: 'Email Update Successful',
                message: res.data.message,
                type: 'success'
            })
            setOtpOpen(false)
            setUser(res.data.data)
        } catch (e) {
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'Otp Error',
                message: e.response.data.message,
                type: 'failure'
            })
        } finally {
            setOtpLoading(false)
        }
    }

    const resendOtp = async () => {
        try {
            setOtpLoading(true)
            const res = await userUpdateEmailOtp({
                email: details.email
            })
            setOtpExpiresAt(res.data.expiresAt)
            setMessageProps({
                isOpen: true,
                title: 'Otp Resend Successful',
                message: res.data.message,
                type: 'success'
            })
        } catch (e) {
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'Otp Resend Error',
                message: e.response.data.message,
                type: 'failure'
            })
        } finally {
            setOtpLoading(false)
        }
    }

    const handleChangePassSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await userChangePassword(changePass)
            setMessageProps({
                isOpen: true,
                title: 'Password Update Successful',
                message: res.data.message,
                type: 'success'
            })
            setUser(null)
            navigate('/login', {replace: true})
        } catch (error) {
            //console.log(error.message)
            setMessageProps({
                isOpen: true,
                title: 'Password Update Error',
                message: error.response.data.message,
                type: 'failure'
            })
        }
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await userDelete(deletePass)
            setMessageProps({
                isOpen: true,
                title: 'User Account Delete Successful',
                message: res.data.message,
                type: 'success'
            })
            setUser(null)
            navigate('/', {replace: true})
        } catch (error) {
            //console.log(error.message)
            setMessageProps({
                isOpen: true,
                title: 'User Account Delete Error',
                message: error.response.data.message,
                type: 'failure'
            })
        }
    }

    return (
        <main className="
            min-h-screen
            bg-slate-200
            pt-[55px]
            px-4
            sm:px-6"
        >
            <OtpModal
                isOpen={otpOpen}
                onClose={() => setOtpOpen(false)}
                email={details.email}
                onVerify={verifyOtp}
                loading={otpLoading}
                expiresAt={otpExpiresAt}
                resendOtp={resendOtp}
            />
            <div className="
                max-w-7xl
                mx-auto
                p-5"
            >
                <h1 className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                    text-blue-950"
                >
                    Profile
                </h1>
                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-5
                    mt-2"
                >
                    <Details 
                        details={details}
                        setDetails={setDetails}
                        handleDetailsSubmit={handleDetailsSubmit}
                        handleEmailSubmit={handleEmailSubmit}
                    />
                    <ChangePass 
                        password={changePass}
                        setPassword={setChangePass}
                        handleSubmit={handleChangePassSubmit}
                    />
                    <DeleteAccount 
                        password={deletePass}
                        setPassword={setDeletePass}
                        deleteConfirmation={deleteConfirmation}
                        setDeleteConfirmation={setDeleteConfirmation}
                        handleSubmit={handleDeleteSubmit}
                    />
                </div>
            </div>
        </main>
    )
}