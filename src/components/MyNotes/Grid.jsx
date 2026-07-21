import Card from './Card'

export default function Grid ({notes, deleteNote}) {
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
                <Card key={note._id} note={note} deleteNote={deleteNote}/>
            ))}
        </div>
    )
}