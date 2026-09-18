import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

export default function OtpVerificationModal({
    isOpen,
    onClose,
    email,
    onVerify,
    loading=false,
    error='',
    expiresAt,
    resendOtp
}) {
    if (!isOpen) {
        return null
    }

    const [otp, setOtp] = useState('')
    const [timer, setTimer] = useState(0)
    const [resendTimer, setResendTimer] = useState(5)

    useEffect(() => {
        if (!expiresAt) return;
        const updateTimer = () => {
            const remaining = Math.max(
                0,
                new Date(expiresAt).getTime() - Date.now()
            );
            const secondsLeft = Math.ceil(remaining / 1000)
            setTimer(secondsLeft);
            if (secondsLeft <= 0) onClose();
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [expiresAt])

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    
    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setTimeout(() => {
            setResendTimer(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [resendTimer]);

    const [visibleError, setVisibleError] = useState("");
    useEffect(() => {
        if (!error) {
            setVisibleError("");
            return;
        }
        setVisibleError(error);
        const timer = setTimeout(() => {
            setVisibleError("");
        }, 5000);
        return () => clearTimeout(timer);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault()
        onVerify(otp)
    }

    return (
        <div className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        px-5
        ">
            <div className="
            relative
            w-full
            max-w-md
            rounded-md
            bg-white
            p-10
            shadow-xl
            ">
                {/* Close button */}
                <button className="
                absolute
                right-4
                top-4
                text-gray-500
                hover:text-gray-800"
                type="button"
                onClick={onClose}
                >
                    <ImCross size={20} />
                </button>
                {/* Heading */}
                <div className="text-center mb-8">
                    <h2 className="
                    text-3xl
                    font-bold
                    text-blue-950"
                    >
                        Verify Your Email
                    </h2>
                    <p className="
                    mt-3
                    text-gray-600"
                    >
                        Enter the 6 digit verification code sent to:
                    </p>
                    <p className="
                    mt-1
                    font-semibold
                    text-gray-800
                    break-all
                    ">
                        {email}
                    </p>
                    <p className="
                    mt-1
                    font-semibold
                    text-blue-800
                    break-all
                    ">
                        Code expires in{" "}
                        {minutes}:{seconds.toString().padStart(2, "0")}
                    </p>
                </div>
                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    {visibleError && (
                        <div className="
                            rounded-lg
                            border
                            border-red-200
                            bg-red-50
                            px-4
                            py-3
                            text-sm
                            text-red-600
                        ">
                            {visibleError}
                        </div>
                    )}
                    <div>
                        <label
                            htmlFor="otp"
                            className="
                                mb-2
                                block
                                text-md
                                font-medium
                                text-gray-700
                            "
                        >
                            Verification Code
                        </label>
                        <input className="
                        w-full
                        rounded-md
                        border
                        border-gray-300
                        px-4
                        py-3
                        text-center
                        text-2xl
                        tracking-[0.5em]
                        outline-none
                        focus:border-blue-950
                        focus:ring-2
                        focus:ring-blue-100"
                        id="otp"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={otp}
                        onChange={(e) =>
                            setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || otp.length !== 6}
                        className="
                            w-full
                            rounded-md
                            bg-blue-950
                            px-4
                            py-3
                            font-semibold
                            text-white
                            transition
                            hover:bg-blue-900
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >
                        {loading
                            ? "Verifying..."
                            : "Verify Code"
                        }
                    </button>
                </form>
                <div className="flex justify-center">
                    {resendTimer > 0 ? (
                        <p className="
                        mt-5
                        font-semibold
                        text-gray-600
                        break-all"
                        >
                            Resend code available in {resendTimer}s
                        </p>
                    ) : (
                        <Link className="
                        mt-5
                        text-center
                        font-semibold
                        text-blue-950
                        hover:underline
                        hover:decoration-2
                        underline-offset-4"
                        onClick={() => {
                            resendOtp()
                            setResendTimer(5)
                        }}
                        >
                            Resend code
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
