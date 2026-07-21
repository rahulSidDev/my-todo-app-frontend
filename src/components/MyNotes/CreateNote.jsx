import { useState } from "react";

export default function CreateNote ({onClose, createNote}) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("") 

    const handleSubmit = (e) => {
        e.preventDefault()
        const newNote = {
            title,
            description
        }
        createNote(newNote)
    }

    return (
        <div onClick={onClose} className="
            fixed
            inset-0
            bg-black/50
            flex
            items-center
            justify-center
            z-50
            px-4
        ">
            <div onClick={(e) => e.stopPropagation()} className="
                bg-white
                rounded-2xl
                shadow-xl
                w-full
                max-w-xl
                p-6
            ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Create Note
                    </h2>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label htmlFor="title"
                        className="
                            block
                            text-sm
                            font-medium
                            mb-2
                        ">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Enter note title"
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                px-4
                                py-3
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-400"
                            required
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-6">
                        <label
                            htmlFor="description"
                            className="
                                block
                                text-sm
                                font-medium
                                mb-2
                        ">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Write your note..."
                            rows={6}
                            className="
                                w-full
                                border
                                border-gray-300
                                rounded-xl
                                px-4
                                py-3
                                resize-none
                                focus:outline-none
                                focus:ring-2
                                focus:ring-pink-400"
                        />
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => onClose()}
                            className="
                                px-5
                                py-3
                                rounded-xl
                                border
                                border-gray-300
                                hover:bg-gray-100
                                transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="
                                px-5
                                py-3
                                rounded-xl
                                bg-pink-500
                                text-white
                                hover:bg-pink-600
                                transition"
                        >
                            Create Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}