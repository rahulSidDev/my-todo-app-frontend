import { CgDanger } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";
import { BsFillExclamationCircleFill } from "react-icons/bs";

export default function DeleteAccount({
    password,
    setPassword,
    deleteConfirmation,
    setDeleteConfirmation,
    handleSubmit
}) {
    return (
        <div className="
            bg-red-50
            border
            border-red-300
            rounded-md
            p-5"
        >
            <h2 className="
                text-2xl
                font-bold
                text-red-700
                mb-2"
            >
                Delete Account
            </h2>
            <p className="
                text-red-600
                mb-2
                flex
                gap-2"
            >
                <BsFillExclamationCircleFill
                    className="shrink-0 mt-1"
                    size={15}
                />
                This will permanently delete
                your account and all your notes.
            </p>
            {!deleteConfirmation ?
            <form onSubmit={(e) => {
                e.preventDefault()
                setDeleteConfirmation(true)
            }}>
                <label className="text-red-600">Password:</label>
                <input className="
                    w-full
                    border
                    border-red-600
                    rounded-md
                    p-2
                    mb-5"
                    type="password"
                    required
                    value={password.password}
                    onChange={(e) =>
                        setPassword({...password, password: e.target.value})
                    }
                />
                <button className="
                    flex
                    gap-2
                    items-center
                    px-2
                    py-2
                    bg-red-600
                    text-white
                    rounded-md
                    hover:bg-red-500
                    transition"
                    type="submit"
                >
                    <CgDanger size={20}/>
                    <span>Delete Account</span>
                </button>
            </form> :
            <form onSubmit={handleSubmit}>
                <p className="text-red-700 font-medium mb-5">
                    Are you sure you want to delete your account?
                </p>
                <div className="flex items-center gap-4">
                    <button className="
                        flex
                        gap-2
                        border
                        items-center
                        px-2
                        py-2
                        bg-white
                        rounded-md
                        hover:bg-slate-100
                        transition"
                        onClick={() => {
                            setDeleteConfirmation(false)
                            setPassword({password: ''})
                        }}
                    >
                        <FcCancel size={20}/>
                        <span>Cancel</span>
                    </button>
                    <button className="
                        flex
                        gap-2
                        items-center
                        px-2
                        py-2
                        bg-red-600
                        text-white
                        rounded-md
                        hover:bg-red-500
                        transition"
                        type="submit"
                    >
                        <CgDanger size={20}/>
                        <span>Delete Account</span>
                    </button>
                </div>
            </form>}
        </div>
    )
}