import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { todoDelete, todoGetOne, todoUpdate } from "../api/todos"
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";

export default function Note () {
    const {id} = useParams()

    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(false)
    const [editingmode, setEditingmode] = useState(false)
    const [editedNote, setEditedNote] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        fetchNote()
    }, [])

    const fetchNote = async () => {
        const response = await todoGetOne(id)
        setNote(response.data.data)
        setEditedNote({
            title: response.data.data.title,
            description: response.data.data.description
        })
    }

    if (loading) {
        return (
            <div className="pt-[55px] p-8">
                Loading...
            </div>
        );
    }

    const handleEdit = () => {
        setEditingmode(true)
    }

    const handleDelete = async () => {
        try {
            const response = await todoDelete(note._id)
            if (response.status === 200) {
                navigate('/my-notes')
            }
            else {
                throw new Error('delete request failed.')
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const handleSave = async () => {
        try {
            const response = await todoUpdate(
                note._id,
                {
                    title: editedNote.title,
                    description: editedNote.description
                }
            )

            if (response.status !== 200) {
                throw new Error("update request failed")
            }

            setNote(response.data.data)
            setEditingmode(false)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const handleCancel = () => {
        setEditingmode(false)
        setEditedNote({title: note.title, description: note.description})
    }

    if (!note) {
        return (
            <div className="pt-[55px] p-8">
                Note not found.
            </div>
        );
    }

    return (
        <main className="pt-[55px] min-h-screen bg-slate-50">

            <div className="max-w-4xl mx-auto px-6 py-10">

                <button
                    onClick={() => navigate("/my-notes")}
                    className="
                        mb-6
                        text-sm
                        text-gray-500
                        hover:text-black
                    "
                >
                    ← Back to Notes
                </button>

                <div className="flex justify-between items-start mb-6">
                    <div>
                        <NoteTitle 
                            editedNote={editedNote} 
                            title={note.title} 
                            editingmode={editingmode} 
                            setEditedNote={setEditedNote}
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Created{" "}
                            {new Date(note.createdAt).toLocaleDateString(
                                "en-AU",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                    <NoteButtons 
                        editingmode={editingmode}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleCancel={handleCancel}
                        handleSave={handleSave}
                    />
                </div>
                <NoteDesc
                    editedNote={editedNote}
                    setEditedNote={setEditedNote}
                    editingmode={editingmode}
                    description={note.description}
                />
            </div>
        </main>
    )
}

function NoteTitle ({editingmode, title, editedNote, setEditedNote}) {
    if (editingmode) {
        return (
            <input 
                type="text" 
                value={editedNote.title}
                onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}
                className="w-full text-4xl font-bold border rounded-xl px-4 py-2
            "/>
        )
    }

    return (
        <h1 className="text-4xl font-bold">
            {title}
        </h1>
    )
}

function NoteDesc ({editingmode, description, editedNote, setEditedNote}) {
    if (editingmode) {
        return (
            <textarea
                value={editedNote.description}
                onChange={(e) => setEditedNote({...editedNote, description: e.target.value})}
                rows={10}
                className="w-full border rounded-xl p-4"
            />
        )
    }

    return (
        <div className="whitespace-pre-wrap leading-relaxed">
            {description}
        </div>
    )
}

function NoteButtons ({editingmode, handleDelete, handleCancel, handleEdit, handleSave}) {
    if (editingmode) {
        return (
            <div className="flex gap-3">
                <button
                    onClick={handleCancel}
                    className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        border
                        border-gray-300
                        hover:bg-gray-100
                        transition
                ">
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-xl
                        bg-green-500
                        text-white
                        hover:bg-green-600
                        transition
                ">
                    <MdDelete size={20} />
                    Save
                </button>
            </div>
        )
    }

    return (
        <div className="flex gap-3">
            <button
                onClick={handleEdit}
                className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-gray-300
                    hover:bg-gray-100
                    transition
            ">
                <LuPencil size={20} />
                Edit
            </button>
            <button
                onClick={handleDelete}
                className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    bg-red-500
                    text-white
                    hover:bg-red-600
                    transition
            ">
                <MdDelete size={20} />
                Delete
            </button>
        </div>
    )
}