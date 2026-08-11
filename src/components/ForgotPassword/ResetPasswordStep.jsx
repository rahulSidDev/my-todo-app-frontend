import {userForgotPassword} from '../../api/user'
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordStep({
    formData,
    setFormData
}) {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userForgotPassword(formData);
            alert(
                "Password reset successfully"
            );
            navigate('/login');
        }
        catch(error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <h1 className="text-3xl font-bold mb-6">
                Reset Password
            </h1>

            <input
                type="password"
                placeholder="New Password"
                value={formData.newPass}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        newPass: e.target.value
                    })
                }
                className="
                    w-full
                    border
                    p-3
                    rounded-xl
                    mb-4
                "
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmNewPass}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        confirmNewPass: e.target.value
                    })
                }
                className="
                    w-full
                    border
                    p-3
                    rounded-xl
                "
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
                Reset Password
            </button>
        </form>
    );
}