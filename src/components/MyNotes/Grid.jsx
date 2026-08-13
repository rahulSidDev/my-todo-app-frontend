import Card from './Card'
import {DndContext} from '@dnd-kit/core'
import {SortableContext, arrayMove} from '@dnd-kit/sortable'
import { noteReorder } from '../../api/notes';

export default function Grid ({
    notes, 
    deleteNote, 
    updateCheckbox,
    setNotes
}) {
    if (notes.length === 0) {
        return (
            <div className="
                text-center
                py-20
            ">
                <h3 className="text-2xl font-semibold">
                    No notes yet
                </h3>
                <p className="text-gray-500 mt-2">
                    Create your first note to get started.
                </p>
            </div>
        );
    }

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
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            gap-6"
        >
            <DndContext onDragEnd={handleDragEnd}>
                <SortableContext items={notes.map(note => note._id)}>
                    {notes.map((note) => (
                        <Card 
                            key={note._id} 
                            note={note} 
                            deleteNote={deleteNote}
                            updateCheckbox={updateCheckbox}
                        />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )
}