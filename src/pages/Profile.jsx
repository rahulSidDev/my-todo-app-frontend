import { useContext, useEffect } from "react"
import { AuthContext } from "../contexts/auth"
import { useNavigate } from "react-router-dom"

import Details from "../components/Profile/Details"
import ChangePass from "../components/Profile/ChangePass"
import DeleteAccount from "../components/Profile/DeleteAccount"

export default function () {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user])

    if (!user) {
        return <></>
    } // add this to every page component.

    return (
        <main className="
            min-h-screen
            bg-slate-50
            pt-[55px]
        ">
            <div className="
                max-w-5xl
                mx-auto
                px-6
                py-10
            ">
                <h1 className="
                    text-4xl
                    font-bold
                    mb-8
                ">
                    Profile
                </h1>
                <div className="
                    space-y-8
                ">
                    <Details />
                    <ChangePass />
                    <DeleteAccount />
                </div>
            </div>
        </main>
    )
}