import { BsFillExclamationCircleFill } from "react-icons/bs";

export default function Details({
    details,
    setDetails,
    handleDetailsSubmit,
    handleEmailSubmit
}) {
    return (
        <div className="
            bg-white
            border
            border-slate-300
            rounded-md
            p-5
            text-blue-950"
        >
            <h2 className="
                text-2xl
                font-bold
                mb-2"
            >
                Profile Details
            </h2>
            <p className="
                text-slate-600 
                mb-2 
                gap-2 
                flex"
            >
                <BsFillExclamationCircleFill 
                    className="shrink-0 mt-1" 
                    size={15}
                />
                Changing your email will require you to 
                verify the new email via otp.
            </p>
            <form className="space-y-4"
                onSubmit={handleDetailsSubmit}
            >
                <div>
                    <label>Name:</label>
                    <input className="
                        w-full
                        border
                        rounded-md
                        p-2"
                        type="text"
                        value={details.name}
                        onChange={(e) =>
                            setDetails({
                                ...details,
                                name: e.target.value
                            })
                        }
                        required
                    />
                </div>
                <div>
                    <label>
                        Note Color Preference:
                    </label>
                    <select className="
                        w-full
                        border
                        rounded-md
                        p-2"
                        value={details.colorPreference}
                        onChange={(e) =>
                            setDetails({
                                ...details,
                                colorPreference:
                                    e.target.value
                            })
                        }
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
                <button className="
                    px-2
                    py-2
                    bg-blue-950
                    text-white
                    rounded-md
                    hover:bg-blue-900
                    transition"
                    type="submit"
                >
                    Update Details
                </button>
            </form>
            <form className="space-y-4 mt-4"
                onSubmit={handleEmailSubmit}
            >
                <div>
                    <label>Email:</label>
                    <input className="
                        w-full
                        border
                        rounded-md
                        p-2"
                        type="email"
                        value={details.email}
                        onChange={(e) =>
                            setDetails({
                                ...details,
                                email: e.target.value
                            })
                        }
                        required
                    />
                </div>
                <button className="
                    px-2
                    py-2
                    bg-blue-950
                    text-white
                    rounded-md
                    hover:bg-blue-900
                    transition"
                    type="submit"
                >
                    Update Email
                </button>
            </form>
        </div>
    )
}