import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userDelete } from "../../api/user"
import { AuthContext } from "../../contexts/auth"

export default function DeleteAccount() {
    const {setUser} = useContext(AuthContext)
    const [password, setPassword] = useState({password: ''})
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            const res = await userDelete(password)
            alert(res.data.message)
            navigate('/')
            setUser(null)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="
            bg-red-50
            border
            border-red-300
            rounded-2xl
            p-6
        ">
            <h2 className="
                text-2xl
                font-bold
                text-red-700
                mb-4
            ">
                Delete Account
            </h2>
            <p className="
                text-red-600
                mb-4
            ">
                This permanently deletes
                your account and all notes.
            </p>
            <input
                type="password"
                placeholder="Enter password to confirm"
                value={password.password}
                onChange={(e) =>
                    setPassword({...password, password: e.target.value})
                }
                className="
                    w-full
                    border
                    rounded-xl
                    p-3
                    mb-4
                "
            />
            <button
                onClick={handleDelete}
                className="
                    px-5
                    py-3
                    bg-red-600
                    text-white
                    rounded-xl
                "
            >
                Delete My Account
            </button>
        </div>
    )
}