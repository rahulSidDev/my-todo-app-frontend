import { MdDelete } from "react-icons/md";
import { GrUndo } from "react-icons/gr";
import { Link } from "react-router-dom";

function generatePreview(content) {
    return content.map(block => {

        if(block.type === "checklist"){
            return (
                <div
                    key={block._id}
                    className="flex items-center gap-2"
                >
                    <input
                        type="checkbox"
                        checked={block.completed}
                        readOnly
                        className="w-4 h-4"
                    />

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

export default function Card ({note, deleteNote, restoreNote}) {
    const preview = generatePreview(note.content);

    return (
        <div
            className="
                h-64
                w-full
                bg-white
                rounded-2xl
                shadow
                p-5
                flex
                flex-col
            "
        >
            <Link
                to={`/note/${note._id}`}
                className="
                    text-xl
                    font-bold
                    mb-4
                    hover:underline
                "
            >
                {note.title}
            </Link>
            <div
                className="
                    text-gray-600
                    overflow-hidden
                    line-clamp-5
                    whitespace-pre-wrap
                "
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
                <span
                    className="
                        text-sm
                        text-gray-400
                    "
                >
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