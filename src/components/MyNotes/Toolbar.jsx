export default function Toolbar ({onCreate}) {
    return (
        <div className="
            flex
            flex-col
            md:flex-row
            gap-4
            justify-between
            items-center
            mb-8
        ">
            <input
                type="text"
                placeholder="Search notes..."
                className="
                w-full
                md:w-80
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
            "/>
            <div className="flex gap-3">
                <button className="
                    px-4
                    py-3
                    rounded-xl
                    border
                ">
                    Filter
                </button>
                <button className="
                    px-4
                    py-3
                    rounded-xl
                    border
                ">
                    Sort
                </button>
                <button onClick={onCreate} className="
                    px-5
                    py-3
                    rounded-xl
                    bg-pink-500
                    text-white
                ">
                    + New Note
                </button>
            </div>
        </div>
    )
}