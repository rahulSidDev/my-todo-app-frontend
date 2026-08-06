import { useState } from "react";
import { ImCross } from "react-icons/im";

export default function CreateNote ({onClose, createNote}) {
    const [title, setTitle] = useState("")
    const [blocks, setBlocks] = useState([])
    
    const addTextBlock = () => {
        setBlocks([...blocks, {id: Date.now(), type: 'text', content: ''}])
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
            px-4
        ">
            <div onClick={(e) => e.stopPropagation()} className="
                bg-white
                rounded-2xl
                shadow-xl
                w-full
                max-w-3xl
                max-h-[90vh]
                overflow-y-auto
                p-6
            ">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
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
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        placeholder="Note title..."
                        className="
                            w-full
                            border
                            border-gray-300
                            rounded-xl
                            px-4
                            py-3
                            mb-6"
                        required
                    />
                    {/* Blocks */}
                    <div className="
                        flex
                        flex-col
                        gap-4
                    ">
                        {blocks.map((block) => (
                            <div
                                key={block.id}
                                className="
                                    border
                                    border-gray-200
                                    rounded-xl
                                    p-4"
                            >
                                {/* text block */}
                                {block.type === 'text' && (
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
                                            w-full
                                            resize-none
                                            border
                                            border-gray-300
                                            rounded-lg
                                            p-3"
                                    />
                                )}
                                {/* checklist block */}
                                {block.type === 'checklist' && (
                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">
                                        <input
                                            type="checkbox"
                                            checked={block.completed}
                                            onChange={() =>
                                                toggleChecklist(block.id)
                                            }
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
                                                rounded-lg
                                                px-3
                                                py-2
                                            "
                                        />
                                    </div>
                                )}
                                <div className="
                                    flex
                                    justify-end
                                    mt-3
                                ">
                                    <button
                                        type="button"
                                        onClick={() => deleteBlock(block.id)}
                                        className="
                                            text-red-500
                                            text-sm
                                            hover:text-red-700
                                        "
                                    >
                                        Delete Block
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={addTextBlock}
                            className="
                                px-4
                                py-2
                                rounded-xl
                                bg-yellow-300
                                hover:bg-yellow-400
                            "
                        >
                            + Add Text
                        </button>
                        <button
                            type="button"
                            onClick={addChecklistBlock}
                            className="
                                px-4
                                py-2
                                rounded-xl
                                bg-pink-300
                                hover:bg-pink-400
                            "
                        >
                            + Add Checklist
                        </button>
                    </div>
                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 mt-8">
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