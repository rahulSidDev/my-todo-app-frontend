import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { AuthContext } from "../contexts/auth";
import { 
    noteMoveToTrash, 
    noteGetOne, 
    noteUpdate, 
    noteCheckCheckbox 
} from "../api/notes"

function getSingleNoteColor(
    preference,
    index = 0
) {

    if (preference === "pink") {
        return "bg-pink-300";
    }

    if (preference === "yellow") {
        return "bg-yellow-300";
    }

    if (preference === "alternate") {

        return index % 2 === 0
            ? "bg-pink-300"
            : "bg-yellow-300";
    }

}

export default function Note () {
    const {id} = useParams()
    const {user} = useContext(AuthContext)

    const [note, setNote] = useState(null)
    const [loading, setLoading] = useState(false)
    const [editingmode, setEditingmode] = useState(false)
    const [editedNote, setEditedNote] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        fetchNote()
    }, [])

    const fetchNote = async () => {
        const response = await noteGetOne(id)
        setNote(response.data.data)
        setEditedNote({
            title: response.data.data.title,
            content: response.data.data.content
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
            const response = await noteMoveToTrash(note._id)
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
            const response = await noteUpdate(
                note._id,
                {
                    title: editedNote.title,
                    content: editedNote.content
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
        setEditedNote({title: note.title, content: note.content})
    }

    const updateCheckbox = async (contentID) => {
        try {
            const response = await noteCheckCheckbox(
                note._id, 
                {contentID: contentID}
            )
            setNote(response.data.data)
        }
        catch (e) {
            console.log(e.message)
        }
    }

    if (!note) {
        return (
            <div className="pt-[55px] p-8">
                Note not found.
            </div>
        );
    }

    const noteColor = getSingleNoteColor(user.colorPreference, note.order)

    return (
        <main className={`pt-[55px] min-h-screen ${noteColor}`}>

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
                    Back to My-Notes
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
                <NoteContent
                    editedNote={editedNote}
                    setEditedNote={setEditedNote}
                    editingmode={editingmode}
                    content={note.content}
                    updateCheckbox={updateCheckbox}
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

function NoteContent ({
    editingmode, 
    content, 
    editedNote, 
    setEditedNote,
    updateCheckbox
}) {
    if (editingmode) {

        return (

            <div className="space-y-4">

                {editedNote.content.map((block, index) => (

                    <div key={index}>

                        {/* Text Block */}

                        {block.type === "text" && (

                            <textarea
                                value={block.content}
                                onChange={(e) => {

                                    const updatedContent =
                                        [...editedNote.content];

                                    updatedContent[index] = {
                                        ...block,
                                        content: e.target.value
                                    };

                                    setEditedNote({
                                        ...editedNote,
                                        content: updatedContent
                                    });

                                }}
                                rows={4}
                                className="
                                    w-full
                                    border
                                    rounded-xl
                                    p-4
                                "
                            />

                        )}

                        {/* Checklist Block */}

                        {block.type === "checklist" && (

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <input
                                    type="checkbox"
                                    checked={block.completed}
                                    onChange={() => {

                                        const updatedContent =
                                            [...editedNote.content];

                                        updatedContent[index] = {
                                            ...block,
                                            completed:
                                                !block.completed
                                        };

                                        setEditedNote({
                                            ...editedNote,
                                            content:
                                                updatedContent
                                        });

                                    }}
                                />

                                <input
                                    type="text"
                                    value={block.content}
                                    onChange={(e) => {

                                        const updatedContent =
                                            [...editedNote.content];

                                        updatedContent[index] = {
                                            ...block,
                                            content:
                                                e.target.value
                                        };

                                        setEditedNote({
                                            ...editedNote,
                                            content:
                                                updatedContent
                                        });

                                    }}
                                    className="
                                        flex-1
                                        border
                                        rounded-xl
                                        p-3
                                    "
                                />

                            </div>

                        )}

                    </div>

                ))}

            </div>

        );

    }

    return (

        <div className="space-y-4">

            {content.map((block, index) => (

                <div key={index}>

                    {block.type === "text" && (

                        <p className="
                            whitespace-pre-wrap
                            leading-relaxed
                        ">
                            {block.content}
                        </p>

                    )}

                    {block.type === "checklist" && (

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <input
                                type="checkbox"
                                checked={block.completed}
                                onChange={() => updateCheckbox(block._id)}
                            />

                            <span
                                className={
                                    block.completed
                                        ? "line-through text-gray-500"
                                        : ""
                                }
                            >
                                {block.content}
                            </span>

                        </div>

                    )}

                </div>

            ))}

        </div>

    );
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