import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userOtp } from "../api/user";

function SignupForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
    });

    async function submitHandler(event) {
        event.preventDefault();

        try {
            //api call
            const res = await userOtp(formData);

            if (res.data.success) {
                navigate("/otp-verification", { state: formData });
            } else {
                console.log(res);
                alert("something went wrong please try again");
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
                Signup
            </h2>
            <form
                onSubmit={submitHandler}
                className="space-y-4"
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            name: e.target.value
                        })
                    }
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                    "
                />
                <input
                    type="text"
                    placeholder="Email"
                    value={
                        formData.email
                    }
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value
                        })
                    }
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                    "
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={
                        formData.password
                    }
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            password: e.target.value
                        })
                    }
                    className="
                        w-full
                        border
                        rounded-xl
                        p-3
                    "
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={
                        formData.confirmPass
                    }
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            confirmPass: e.target.value
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

export default SignupForm;
