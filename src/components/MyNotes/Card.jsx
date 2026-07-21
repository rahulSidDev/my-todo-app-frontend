import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Card ({note, deleteNote}) {
    const formattedDate = new Date(note.createdAt)
    .toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return (
        <div className="
            bg-white
            rounded-xl
            p-5
            shadow-sm
            border
            cursor-grab
            hover:shadow-lg
            transition
        ">
            <p className="font-semibold text-lg">
                <Link to={`/note/${note._id}`}  className="text-xl font-bold hover:underline">
                    {note.title}
                </Link>
            </p>
            <p className="
                text-gray-600
                mt-3
                line-clamp-4
            ">
                {note.description}
            </p>
            {/* Footer */}
            <div className="flex justify-between items-center mt-auto pt-4">
                <span className="text-sm text-gray-500">
                    {formattedDate}
                </span>

                <button
                    onClick={() => deleteNote(note._id)}
                    className="text-red-500 hover:text-red-600"
                >
                    <MdDelete size={25} />
                </button>
            </div>
        </div>
    )
}