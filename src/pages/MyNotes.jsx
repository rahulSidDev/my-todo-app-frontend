import { useNavigate, useSearchParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth"

import Grid from "../components/MyNotes/Grid"
import Toolbar from "../components/MyNotes/Toolbar"
import CreateNote from "../components/MyNotes/CreateNote"

import { todoGetAll, todoDelete, todoCreate } from '../api/notes'

export default function MyNotes() {
    const [notes, setNotes] = useState([])
    const [showCreateNote, setShowCreateNote] = useState(false)

    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        } else {
            fetchAllNotes()
        }
    }, [])

    const fetchAllNotes = async () => {
        try {
            let allTodos = await todoGetAll()
            allTodos = allTodos.data.data
            setNotes(allTodos)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const deleteNote = async (id) => {
        try {
            await todoDelete(id)
            setNotes(notes.filter(note => note._id !== id))
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const createNote = async (newNote) => {
        try {
            const response = await todoCreate(newNote)
            setNotes(prev => [
                ...prev,
                response.data.data
            ])
            setShowCreateNote(false)
        }
        catch(e) {
            console.log(e.message)
        }
    }

    return (
        <main className="pt-[55px] min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">
                        My Notes
                    </h1>
                </div>
                <Toolbar onCreate={() => setShowCreateNote(true)}/>
                <Grid notes={notes} deleteNote={deleteNote}/>
            </div>
            {/* Modal */}
            {
                showCreateNote && (
                    <CreateNote createNote={createNote} onClose={() => setShowCreateNote(false)}/>
                )
            }
        </main>
    )
}
