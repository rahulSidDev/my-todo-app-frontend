export default function OtpStep({formData, setFormData, setStep}) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(3);
    };

    return (
        <form onSubmit={handleSubmit}>

            <h1 className="text-3xl font-bold mb-6">
                Verify OTP
            </h1>

            <input
                type="text"
                value={formData.otp}
                onChange={(e) =>
                    setFormData({...formData, otp: e.target.value})
                }
                placeholder="Enter OTP"
                className="w-full border p-3 rounded-xl"
            />

            <button
                type="submit"
                className="
                    w-full
                    mt-4
                    bg-blue-500
                    text-white
                    p-3
                    rounded-xl
                "
            >
                Verify OTP
            </button>

        </form>
    );
}