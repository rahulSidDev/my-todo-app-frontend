import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth"
import { userChangePassword } from "../../api/user"

export default function ChangePass() {
    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate()

    const [password, setPassword] = useState({
        password: '',
        newPass: '',
        confirmNewPass: ''
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await userChangePassword(password)
            setUser(null)
            alert(res.data.message)
            navigate('/login')
        }
        catch (error) {
            console.log(error.message)
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
                Change Password
            </h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="password"
                    placeholder="Current Password"
                    value={
                        password.password
                    }
                    onChange={(e) =>
                        setPassword({
                            ...password,
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
                    placeholder="New Password"
                    value={
                        password.newPass
                    }
                    onChange={(e) =>
                        setPassword({
                            ...password,
                            newPass: e.target.value
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
                    placeholder="Confirm New Password"
                    value={
                        password.confirmNewPass
                    }
                    onChange={(e) =>
                        setPassword({
                            ...password,
                            confirmNewPass: e.target.value
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
                        bg-blue-500
                        text-white
                        rounded-xl
                    "
                >
                    Update Password
                </button>
            </form>
        </div>
    )
}