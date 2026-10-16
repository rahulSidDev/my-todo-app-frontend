import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MdDelete, MdSave, MdKeyboardBackspace } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { FcCancel } from "react-icons/fc";

import { AuthContext } from "../contexts/auth";
import { 
    noteMoveToTrash, 
    noteGetOne, 
    noteUpdate, 
    noteCheckCheckbox 
} from "../api/notes"

function getSingleNoteColor(preference, index = 0) {
    if (preference === "pink") {
        return "bg-pink-200";
    }
    if (preference === "yellow") {
        return "bg-yellow-200";
    }
    if (preference === "alternate") {

        return index % 2 === 0
            ? "bg-pink-200"
            : "bg-yellow-200";
    }
}

export default function Note () {
    const [loading, setLoading] = useState(false)
    if (loading) {
        return (
            <div className="pt-[55px] p-8">
                Loading...
            </div>
        );
    }
    
    const [note, setNote] = useState(null)
    const {id} = useParams()
    const {user, setMessageProps} = useContext(AuthContext)
    const [editingmode, setEditingmode] = useState(false)
    const [editedNote, setEditedNote] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        fetchNote()
    }, [])

    const fetchNote = async () => {
        try {
            const response = await noteGetOne(id)
            setNote(response.data.data)
            setEditedNote({
                title: response.data.data.title,
                content: response.data.data.content
            })
        }
        catch (e) {
            setMessageProps({
                isOpen: true,
                title: 'Note Fetch Error',
                message: e.response.data.message,
                type: 'failure'
            })
        }
    }

    if (!note) {
        return (
            <div className="pt-[55px] p-8">
                Note not found.
            </div>
        );
    }

    const handleEdit = () => {
        setEditingmode(true)
    }

    const handleCancel = () => {
        setEditingmode(false)
        setEditedNote({title: note.title, content: note.content})
    }

    const handleDelete = async () => {
        try {
            const response = await noteMoveToTrash(note._id)
            setMessageProps({
                isOpen: true,
                title: 'Note Delete Successful',
                message: response.data.message,
                type: 'success'
            })
            navigate('/my-notes')
        }
        catch (e) {
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'Note Delete Error',
                message: e.response.data.message,
                type: 'failure'
            })
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
            setNote(response.data.data)
            setEditingmode(false)
            setMessageProps({
                isOpen: true,
                title: 'Note Update Successful',
                message: response.data.message,
                type: 'success'
            })
        }
        catch (e) {
            //console.log(e.message)
            setMessageProps({
                isOpen: true,
                title: 'Note Update Error',
                message: e.response.data.message,
                type: 'failure'
            })
        }
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

    const noteColor = getSingleNoteColor(user.colorPreference, note.order)

    return (
        <main className={`pt-[55px] min-h-screen ${noteColor}`}>
            <div className="max-w-4xl mx-auto px-6 py-10">
                <button className="
                    flex
                    items-center
                    gap-2
                    mb-6
                    text-sm
                    text-gray-600
                    hover:text-blue-600"
                    onClick={() => navigate("/my-notes")}
                >
                    <MdKeyboardBackspace size={20}/>
                    <span>Back to My-Notes</span>
                </button>
                <div className="
                    flex 
                    flex-col
                    gap-4
                    md:flex-row
                    md:justify-between
                    md:items-center 
                    mb-5"
                >
                    <div className="min-w-0 flex-1">
                        {editingmode ? 
                        <input className="
                            w-full 
                            text-4xl 
                            font-bold
                            bg-white
                            border 
                            rounded-md
                            text-blue-950
                            px-2"
                            type="text" 
                            value={editedNote.title}
                            onChange={(e) => setEditedNote({
                                ...editedNote, 
                                title: e.target.value
                            })}
                        /> : 
                        <h1 className={`
                            ${!note.title && 'text-slate-400'}
                            break-words 
                            text-4xl 
                            font-bold 
                            text-blue-950`}
                        >
                            {note.title ? note.title : '[No Note Title]'}
                        </h1>}
                        <p className="text-sm text-gray-600 mt-2">
                            Created{" "}
                            {new Date(note.createdAt)
                            .toLocaleDateString(
                                "en-AU",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                }
                            )}
                        </p>
                    </div>
                    <div className="flex gap-3 shrink-0">
                        <button className={`
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-md
                            bg-white
                            text-black
                            hover:bg-gray-100
                            transition`}
                            onClick={!editingmode ? 
                                handleEdit : 
                                handleCancel
                            }
                        >
                            {!editingmode ? <LuPencil size={20} /> : 
                            <FcCancel size={20} />}
                            {!editingmode ? 'Edit' : 'Cancel'}
                        </button>
                        <button className={`
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2
                            rounded-md
                            ${!editingmode ? 'bg-red-500' : 'bg-green-500'}
                            text-white
                            ${!editingmode ? 'hover:bg-red-600' : 
                                'hover:bg-green-600'
                            }
                            transition`}
                            onClick={!editingmode ? 
                                handleDelete : 
                                handleSave
                            }
                        >
                            {!editingmode ? <MdDelete size={20} /> : 
                            <MdSave size={20} />}
                            {!editingmode ? 'Delete' : 'Save'}
                        </button>
                    </div>
                </div>
                <div className="space-y-4 text-blue-950 text-xl">
                    {note.content.length === 0 && 
                    <p className="
                        text-slate-400
                        whitespace-pre-wrap
                        leading-relaxed"
                    >
                        [No Note Content]
                    </p>}
                    {(editingmode ? editedNote : note)
                    .content.map((block, index) => (
                        <div key={index}>
                            {/* Text Block */}
                            {block.type === "text" && (
                            !editingmode ? 
                            <p className="
                                whitespace-pre-wrap
                                leading-relaxed"
                            >
                                {block.content}
                            </p> : 
                            <textarea className="
                                w-full
                                border
                                rounded-md
                                px-2
                                bg-white"
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
                            />
                            )}
                            {/* Checklist Block */}
                            {block.type === "checklist" && (
                            !editingmode ?
                            <div className="
                                flex
                                items-center
                                gap-3"
                            >
                                <input className="h-5 w-5 shrink-0"
                                    type="checkbox"
                                    checked={block.completed}
                                    onChange={() => 
                                        updateCheckbox(block._id)
                                    }
                                />
                                <span className={
                                    block.completed ? 
                                    "line-through text-gray-500" : 
                                    ""}
                                >
                                    {block.content}
                                </span>
                            </div> :
                            <div className="
                                flex
                                items-center
                                gap-3"
                            >
                                <input className="h-8 w-8 shrink-0"
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
                                <input className="
                                    flex-1
                                    border
                                    rounded-md
                                    px-2
                                    bg-white"
                                    type="text"
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
                                />
                            </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
