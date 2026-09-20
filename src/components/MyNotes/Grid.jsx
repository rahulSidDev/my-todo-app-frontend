import Card from './Card'
import {DndContext} from '@dnd-kit/core'
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
    SortableContext, 
    arrayMove, 
    rectSortingStrategy
} from '@dnd-kit/sortable'
import { noteReorder } from '../../api/notes';

export default function Grid ({
    notes, 
    deleteNote, 
    updateCheckbox,
    setNotes
}) {
    const handleDragEnd = async ({active, over}) => {
        if (!over || active.id === over.id) {
            return;
        }
        const oldIndex = notes.findIndex(
            note => note._id === active.id
        );
        const newIndex = notes.findIndex(
            note => note._id === over.id
        );
        const newNotes = arrayMove(
            notes,
            oldIndex,
            newIndex
        );
        setNotes(newNotes);
        const reorderedNotes = newNotes.map(
            (note, index) => ({
                id: note._id,
                order: index + 1
            })
        );
        try {
            await noteReorder({reorderedNotes})
        }
        catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="
            mt-5
            border
            border-slate-300
            rounded-md
            p-5"
        >
            {notes.length === 0 ? 
            <div className="
                min-h-[300px]
                flex
                flex-col
                items-center
                justify-center
                text-center"
            >
                <p className="
                    text-2xl
                    font-semibold
                    text-blue-950"
                >
                    No Notes Yet
                </p>
                <p className="
                    mt-2
                    text-gray-600"
                >
                    Create your first note to get started.
                </p>
            </div> : 
            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5"
            >
                <DndContext 
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={notes.map(note => note._id)}
                        strategy={rectSortingStrategy}>
                        {notes.map((note) => (
                            <Card key={note._id}
                                note={note}
                                deleteNote={deleteNote}
                                updateCheckbox={updateCheckbox}
                            />
                        ))}
                    </SortableContext>
                </DndContext>
            </div>
            }
        </div>
    )
}