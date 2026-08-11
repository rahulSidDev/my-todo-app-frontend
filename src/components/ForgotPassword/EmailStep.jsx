import { userForgotPassOtp } from "../../api/user";

export default function EmailStep({formData, setFormData, setStep}) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userForgotPassOtp({email: formData.email});
            setStep(2);
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h1 className="text-3xl font-bold mb-6">
                Forgot Password
            </h1>

            <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({...formData, email: e.target.value})
                }
                placeholder="Email"
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
                Send OTP
            </button>

        </form>
    );
}