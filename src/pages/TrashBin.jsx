import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth"
import { useNavigate } from "react-router-dom"
import Grid from "../components/MyNotes/Grid"
import { 
    noteDeleteOne, 
    noteGetTrashed, 
    noteRestore, 
    noteDeleteAll 
} from "../api/notes"

export default function TrashBin () {
    const [notes, setNotes] = useState([])
    const {user, setMessageProps} = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login', {replace: true})
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
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'Fetch Note Error',
                message: e.response.data.message,
                type: 'failure'
            })
        }
    }

    const deleteNote = async (id) => {
        try {
            const res = await noteDeleteOne(id)
            setNotes(notes.filter(note => note._id !== id))
            setMessageProps({
                isOpen: true,
                title: 'Note Delete Successful',
                message: res.data.message,
                type: 'success'
            })
        }
        catch (e) {
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'Note Deletion Error',
                message: e.response.data.message,
                type: 'failure'
            })
        }
    }

    const deleteAllNotes = async () => {
        try {
            const res = await noteDeleteAll()
            setNotes([])
            setMessageProps({
                isOpen: true,
                title: 'All Notes Deletion Successful',
                message: res.data.message,
                type: 'success'
            })
        }
        catch (e) {
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'All Notes Deletion Error',
                message: e.response.data.message,
                type: 'failure'
            })
        }
    }

    const restoreNote = async (id) => {
        try {
            const res = await noteRestore(id)
            setNotes(notes.filter(note => note._id !== id))
            setMessageProps({
                isOpen: true,
                title: 'Restore Note Successful',
                message: res.data.message,
                type: 'success'
            })
        }
        catch (e) {
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'Restore Note Error',
                message: e.response.data.message,
                type: 'failure'
            })
        }
    }
    
    return (
        <main className="
            min-h-screen
            bg-slate-200
            pt-[55px]
            px-4
            sm:px-6
        ">
            <div className="
                max-w-7xl
                mx-auto
                px-5
                py-5
            ">
                <h1 className="
                    text-3xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                    text-blue-950"
                >
                    Trash Bin
                </h1>
                <p className="mt-2 text-gray-600">
                    All deleted notes end up here.
                </p>
                <div className="
                    bg-red-50
                    border
                    border-red-200
                    rounded-md
                    p-2
                    mt-5
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:justify-between
                    md:items-center"
                >
                    <p className="
                        p-2
                        font-semibold
                        text-red-700"
                    >
                        Warning: Notes deleted from the Trash Bin will be
                        deleted permanently with no way of recovering.
                    </p>
                    {notes.length !== 0 ?
                    <button className="
                        px-2
                        py-2
                        bg-red-600
                        text-white
                        rounded-md
                        hover:bg-red-700"
                        onClick={deleteAllNotes}
                    >
                        Delete All
                    </button> : ''}
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