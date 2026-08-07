import Card from '../MyNotes/Card'

export default function Grid ({notes, deleteNote, restoreNote}) {
    if (notes.length === 0) {
        return (
            <div className="
                text-center
                py-20
            ">
                <h3 className="text-2xl font-semibold">
                    Trash Bin is Empty
                </h3>
            </div>
        );
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
            {notes.map((note) => (
                <Card 
                    key={note._id} 
                    note={note} 
                    deleteNote={deleteNote}
                    restoreNote={restoreNote}
                />
            ))}
        </div>
    )
}