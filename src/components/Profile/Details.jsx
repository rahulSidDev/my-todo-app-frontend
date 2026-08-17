import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/auth"
import { userUpdatePreferences } from "../../api/user"

export default function Details() {
    const {user, setUser} = useContext(AuthContext)
    const [details, setDetails] = useState({
        name: user.name,
        email: user.email,
        colorPreference: user.colorPreference
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await userUpdatePreferences(details)
            setUser(res.data.data)
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
                Profile Details
            </h2>
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={details.name}
                        onChange={(e) =>
                            setDetails({
                                ...details,
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
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={details.email}
                        onChange={(e) =>
                            setDetails({
                                ...details,
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
                </div>
                <div>
                    <label>
                        Note Color Preference
                    </label>
                    <select
                        value={details.colorPreference}
                        onChange={(e) =>
                            setDetails({
                                ...details,
                                colorPreference:
                                    e.target.value
                            })
                        }
                        className="
                            w-full
                            border
                            rounded-xl
                            p-3
                        "
                    >
                        <option value="pink">
                            Pink
                        </option>
                        <option value="yellow">
                            Yellow
                        </option>
                        <option value="alternate">
                            Alternate
                        </option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="
                        px-5
                        py-3
                        bg-pink-500
                        text-white
                        rounded-xl
                    "
                >
                    Save Changes
                </button>
            </form>
        </div>
    )
}