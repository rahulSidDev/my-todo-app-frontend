import { useContext, useEffect, useState } from "react"
import { todoDeleteOne, noteGetTrashed, noteRestore, todoDeleteAll } from "../api/notes"
import { AuthContext } from "../contexts/auth"
import { useNavigate } from "react-router-dom"
import Grid from "../components/TrashBin/Grid"

export default function TrashBin () {
    const [notes, setNotes] = useState([])
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            fetchAllNotes()
        }
    }, [])

    const fetchAllNotes = async () => {
        try {
            let allNotes = await noteGetTrashed()
            allNotes = allNotes.data.data
            setNotes(allNotes)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const deleteNote = async (id) => {
        try {
            await todoDeleteOne(id)
            setNotes(notes.filter(note => note._id !== id))
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const deleteAllNotes = async () => {
        try {
            const res = await todoDeleteAll()
            setNotes([])
            alert(res.data.message)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const restoreNote = async (id) => {
        try {
            await noteRestore(id)
            setNotes(notes.filter(note => note._id !== id))
        }
        catch (e) {
            console.log(e.message)
        }
    }
    
    return (
        <main className="
            min-h-screen
            bg-slate-50
            pt-[55px]
        ">
            <div className="
                max-w-7xl
                mx-auto
                px-6
                py-8
            ">
                <h1 className="
                    text-4xl
                    font-bold
                    mb-6
                ">
                    Trash Bin
                </h1>
                <div className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-2xl
                    p-4
                    mb-8
                    flex
                    justify-between
                    items-center
                ">
                    <div>
                        <p className="
                            font-semibold
                            text-red-700
                        ">
                            Warning: Notes deleted from the Trash Bin will be
                            deleted permanently with no way of recovering.
                        </p>
                    </div>
                    {
                        notes.length !== 0 ?
                        <button
                        onClick={deleteAllNotes}
                        className="
                            px-4
                            py-2
                            bg-red-600
                            text-white
                            rounded-xl
                            hover:bg-red-700
                        "
                    >
                        Delete All
                    </button> : ''
                    }
                </div>
                <Grid
                    notes={notes}
                    deleteNote={deleteNote}
                    restoreNote={restoreNote}
                />
            </div>
        </main>
    )
}