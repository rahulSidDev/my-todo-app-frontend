import { MdDelete } from "react-icons/md";
import { GrUndo } from "react-icons/gr";
import { Link } from "react-router-dom";
import { LuGripVertical } from "react-icons/lu";
import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {AuthContext} from '../../contexts/auth'

function generatePreview(content, updateCheckbox, isTrashed, noteID) {
    return content.map(block => {
        if(block.type === "checklist"){
            return (
                <div
                    key={block._id}
                    className="flex items-center gap-2"
                >
                    {!isTrashed?
                        <input
                            type="checkbox"
                            checked={block.completed}
                            className="w-4 h-4" 
                            onChange={
                                () => updateCheckbox(noteID, block._id)
                            }
                        /> :
                        <input
                            type="checkbox"
                            checked={block.completed}
                            className="w-4 h-4" 
                            readOnly
                        />
                    }

                    <span
                        className={
                            block.completed
                                ? "line-through text-gray-400"
                                : ""
                        }
                    >
                        {block.content}
                    </span>
                </div>
            )
        }

        return (
            <div key={block._id}>
                {block.content}
            </div>
        )

    })

}

function getNoteColor(index, preference) {
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

    return "bg-pink-200";
}

export default function Card ({
    note, 
    deleteNote, 
    restoreNote, 
    updateCheckbox
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition
    } = useSortable({
        id: note._id
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };
    
    const {user} = useContext(AuthContext)
    const noteColor = getNoteColor(note.order, user.colorPreference)
    
    const preview = generatePreview(note.content, updateCheckbox, note.isTrashed, note._id);

    return (
        <div
            className={`
                h-64
                w-full
                rounded-md
                shadow
                p-5
                flex
                flex-col
                text-blue-950
                ${noteColor}
            `}
            style={style}
            ref={setNodeRef}
        >
            <div className="
                flex
                items-center
                justify-between
                gap-3
                mb-4"
            >
                <Link
                    to={`/note/${note._id}`}
                    className="
                    text-xl
                    font-bold
                    truncate
                    leading-tight
                    hover:underline
                    hover:decoration-2
                    hover:underline-offset-2"
                >
                    {note.title}
                </Link>
                {!note.isTrashed ?
                <button
                    ref={setActivatorNodeRef}
                    {...attributes}
                    {...listeners}
                    type="button"
                    className="
                    shrink-0
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    hover:text-gray-600
                    cursor-grab
                    active:cursor-grabbing"
                    aria-label="Drag note"
                >
                    <LuGripVertical size={20} />
                </button>
                : ''}
            </div>
            <div className="
                overflow-hidden
                line-clamp-5
                whitespace-pre-wrap"
            >
                {preview}
            </div>
            {/* Footer */}
            <div
                className="
                    mt-auto
                    flex
                    justify-between
                    items-center
                    pt-4
                "
            >
                {/* Created date */}
                <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                </span>

                <span>
                    {
                        note.isTrashed ?
                        <button
                            onClick={() => restoreNote(note._id)}
                            className="
                                text-blue-500
                                hover:text-blue-700
                                font-medium
                                px-4
                            "
                        >
                            <GrUndo size={25} />
                        </button> : ''
                    }
                    {/* Delete button */}
                    <button
                        onClick={() => deleteNote(note._id)}
                        className="
                            text-red-500
                            hover:text-red-700
                            font-medium
                        "
                    >
                        <MdDelete size={25} />
                    </button>
                </span>
            </div>
        </div>
    )
}