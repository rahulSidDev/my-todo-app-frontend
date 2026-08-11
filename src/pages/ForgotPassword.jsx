import { useState } from "react"
import EmailStep from '../components/ForgotPassword/EmailStep'
import OtpStep from '../components/ForgotPassword/OtpStep'
import ResetPasswordStep from '../components/ForgotPassword/ResetPasswordStep'

export default function ForgotPassword () {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        email: '',
        newPass: '',
        confirmNewPass: '',
        otp: ''
    })

    return (
        <main className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-slate-50
        ">
            <div className="
                bg-white
                p-8
                rounded-2xl
                shadow-lg
                w-full
                max-w-md
            ">

                {step === 1 &&
                    <EmailStep
                        formData={formData}
                        setFormData={setFormData}
                        setStep={setStep}
                    />
                }

                {step === 2 &&
                    <OtpStep
                        formData={formData}
                        setFormData={setFormData}
                        setStep={setStep}
                    />
                }

                {step === 3 &&
                    <ResetPasswordStep
                        formData={formData}
                        setFormData={setFormData}
                    />
                }

            </div>
        </main>
    )
}