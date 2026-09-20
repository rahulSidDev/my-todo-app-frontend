import { useNavigate, useSearchParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../contexts/auth"

import Grid from "../components/MyNotes/Grid"
import Toolbar from "../components/MyNotes/Toolbar"
import CreateNote from "../components/MyNotes/CreateNote"

import { 
    noteGetAll, 
    noteMoveToTrash, 
    noteCreate, 
    noteCheckCheckbox, 
    noteSearch
} from '../api/notes'

export default function MyNotes() {
    const [notes, setNotes] = useState([])
    const [sort, setSort] = useState('');
    const [filter, setFilter] = useState('');
    const [showCreateNote, setShowCreateNote] = useState(false)

    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    useEffect(() => {
        if (!user) {
            navigate('/login', {replace: true})
        } else {
            fetchAllNotes()
        }
    }, [])

    const fetchAllNotes = async () => {
        try {
            let allTodos = await noteGetAll()
            allTodos = allTodos.data.data
            setNotes(allTodos)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const deleteNote = async (id) => {
        try {
            await noteMoveToTrash(id)
            setNotes(notes.filter(note => note._id !== id))
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const createNote = async (newNote) => {
        try {
            const response = await noteCreate(newNote)
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

    const updateCheckbox = async (noteID, contentID) => {
        try {
            let response = await noteCheckCheckbox(
                noteID, 
                {contentID: contentID}
            )
            response = response.data.data
            setNotes(notes.map(item => {
                if (item._id.toString() === response._id) {
                    return response
                }
                return item
            }))
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const searchNotes = async (search) => {
        try {
            const response = await noteSearch(search)
            setNotes(response.data.data)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const sortNotes = (sortBy) => {
        setSort(sortBy)
        if (sortBy === 'newest') {
            setNotes([...notes].sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }))
        }
        else if (sortBy === 'oldest') {
            setNotes([...notes].sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            }))
        }
        else if (sortBy === 'title-az') {
            setNotes([...notes].sort((a, b) => {
                return a.title.localeCompare(b.title);
            }))
        }
        else if (sortBy === 'title-za') {
            setNotes([...notes].sort((a, b) => {
                return b.title.localeCompare(a.title);
            }))
        }
    }

    const filterNotes = notes.filter((note) => {
        switch (filter) {
            case "text":
                return (
                    note.content.length > 0 &&
                    note.content.every(
                        (block) => block.type === "text"
                    )
                );
            case "checklist":
                return (
                    note.content.length > 0 &&
                    note.content.every(
                        (block) => block.type === "checklist"
                    )
                );
            case "all": return true
            default:
                return true;
        }
    });

    return (
        <div className="
            overflow-x-hidden
            pt-[55px] 
            min-h-screen 
            bg-slate-200 
            px-4 
            sm:px-6"
        >
            <div className="
                max-w-7xl 
                mx-auto 
                px-5 
                py-5"
            >
                {/* Header */}
                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-6"
                >
                    <div>
                        <h1 className="
                        text-3xl
                        sm:text-4xl
                        font-bold
                        tracking-tight
                        text-blue-950">
                            My Notes
                        </h1>
                        <p className="mt-2 text-gray-600">
                            All of your notes in one place.
                        </p>
                    </div>
                    <button className="
                        px-6
                        py-4
                        rounded-md
                        bg-blue-950
                        hover:bg-blue-900
                        transition
                        text-white"
                        onClick={() => setShowCreateNote(true)}
                    >
                        + New Note
                    </button>
                </div>
                <Toolbar searchNotes={searchNotes}
                    sortNotes={sortNotes}
                    sort={sort}
                    filter={filter}
                    setFilter={setFilter}
                />
                <Grid notes={filterNotes} 
                    deleteNote={deleteNote} 
                    updateCheckbox={updateCheckbox}
                    setNotes={setNotes}
                />
            </div>
            {/* Modal */}
            {
                showCreateNote && (
                    <CreateNote createNote={createNote} onClose={() => setShowCreateNote(false)}/>
                )
            }
        </div>
    )
}
