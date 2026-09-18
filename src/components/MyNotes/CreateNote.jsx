import { useState } from "react";
import { ImCross } from "react-icons/im";
import { TiDelete } from "react-icons/ti";

export default function CreateNote ({onClose, createNote}) {
    const [title, setTitle] = useState("")
    const [blocks, setBlocks] = useState([])
    
    const addTextBlock = () => {
        setBlocks([
            ...blocks, 
            {id: Date.now(), type: 'text', content: ''}
        ])
    }

    const addChecklistBlock = () => {
        setBlocks([
            ...blocks, 
            {
                id: Date.now(), 
                type: 'checklist', 
                content: '',
                completed: false,
            }
        ])
    }

    const updateBlockContent = (id, value) => {
        setBlocks(
            blocks.map(block =>
                block.id === id ? {...block, content: value} : block
            )
        )
    }

    const toggleChecklist = (id) => {
        setBlocks(
            blocks.map(block => 
                block.id === id ? 
                    {...block, completed: !block.completed} : block
            )
        )
    }

    const deleteBlock = (id) => {
        setBlocks(blocks.filter(block => block.id !== id ))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const newNote = {
            title,
            content: blocks.map(
                ({id, ...block}) => block
            )
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
            px-5
        ">
            <div onClick={(e) => e.stopPropagation()} className="
                bg-white
                rounded-md
                shadow-xl
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
                p-5
            ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-blue-950">
                        Create Note
                    </h2>
                    <button
                        onClick={onClose}
                        className="
                            p-2
                            rounded-lg
                            hover:bg-gray-100
                    ">
                        <ImCross />
                    </button>
                </div>
                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <input className="
                        w-full
                        border
                        border-gray-300
                        rounded-md
                        px-2
                        py-2"
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Enter Note Title"
                        required
                    />
                    {/* Blocks */}
                    <div className="
                        flex
                        flex-col
                        gap-4
                        mt-3"
                    >
                        {blocks.map((block) => (
                        <div className="flex items-center gap-3"
                            key={block.id}
                        >
                            {/* Text block */}
                            {block.type === "text" && (
                                <textarea
                                    value={block.content}
                                    onChange={(e) =>
                                        updateBlockContent(
                                            block.id,
                                            e.target.value
                                        )
                                    }
                                    placeholder="Write text..."
                                    rows={4}
                                    className="
                                        flex-1
                                        w-full
                                        resize-none
                                        border
                                        border-gray-300
                                        rounded-md
                                        p-3
                                        outline-none
                                        focus:border-blue-950
                                    "
                                />
                            )}

                            {/* Checklist block */}
                            {block.type === "checklist" && (
                                <div className="
                                    flex
                                    flex-1
                                    items-center
                                    gap-3
                                ">
                                    <input
                                        type="checkbox"
                                        checked={block.completed}
                                        onChange={() =>
                                            toggleChecklist(block.id)
                                        }
                                        className="h-5 w-5"
                                    />

                                    <input
                                        type="text"
                                        value={block.content}
                                        onChange={(e) =>
                                            updateBlockContent(
                                                block.id,
                                                e.target.value
                                            )
                                        }
                                        placeholder="Checklist item..."
                                        className="
                                            flex-1
                                            border
                                            border-gray-300
                                            rounded-md
                                            px-3
                                            py-2
                                            outline-none
                                            focus:border-blue-950
                                        "
                                    />
                                </div>
                            )}

                            {/* Delete button */}
                            <button
                                type="button"
                                onClick={() => deleteBlock(block.id)}
                                className="
                                    shrink-0
                                    p-2
                                    text-red-400
                                    hover:text-red-500
                                    transition
                                "
                                aria-label="Delete block"
                                title="Delete block"
                            >
                                <TiDelete size={30} />
                            </button>
                        </div>
                        ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button className="
                            px-2
                            py-2
                            rounded-md
                            bg-yellow-300
                            hover:bg-yellow-400"
                            type="button"
                            onClick={addTextBlock}
                        >
                            + Add Text
                        </button>
                        <button className="
                            px-2
                            py-2
                            rounded-md
                            bg-pink-300
                            hover:bg-pink-400"
                            type="button"
                            onClick={addChecklistBlock}
                        >
                            + Add Checklist
                        </button>
                    </div>
                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 mt-8">
                        <button className="
                            px-3
                            py-3
                            rounded-md
                            bg-gray-100
                            hover:bg-gray-200
                            transition"
                            type="button"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>
                        <button className="
                            px-3
                            py-3
                            rounded-md
                            bg-blue-950
                            text-white
                            hover:bg-blue-900
                            transition"
                            type="submit"
                        >
                            Create Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}