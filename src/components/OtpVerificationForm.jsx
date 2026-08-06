import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { userSignup } from "../api/user";

function OtpVerificatoinForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const userData = location.state;

    const [formData, setFormData] = useState({
        otp: "",
    });

    async function submitHandler(event) {
        try {
            event.preventDefault();

            //api call later
            const res = await userSignup({ ...userData, ...formData });

            if (res.data.success) {
                alert("successfully created user.");
                navigate("/login");
            } else {
                console.log(res);
                alert("something went wrong try again.");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="
            bg-white
            rounded-2xl
            shadow
            p-6
        ">
            <h2 className="
                text-2xl
                font-bold
                mb-6
            ">
                OTP Verification
            </h2>
            <form
                onSubmit={submitHandler}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="OTP"
                    value={formData.otp}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            otp: e.target.value
                        })
                    }
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                    "
                />
                <button
                    type="submit"
                    className="
                        px-5
                        py-3
                        bg-blue-950
                        text-white
                        rounded-xl
                    "
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default OtpVerificatoinForm;
