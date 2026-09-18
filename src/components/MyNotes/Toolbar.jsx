import { useState } from "react";

export default function Toolbar ({
    searchNotes, 
    sortNotes, 
    sort,
    filter,
    setFilter
}) {
    const [selected, setSelected] = useState('')

    return (
        <div className="
            mt-5
            rounded-md
            border
            border-slate-200
            bg-white
            p-2
            shadow-sm
        ">
            <div className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
            ">
                {/* Search */}
                <div className="relative w-full sm:flex-1">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        onChange={(e) => searchNotes(e.target.value)}
                        className="
                            w-full
                            rounded-md
                            border
                            border-slate-300
                            bg-slate-50
                            px-2
                            py-2
                            pl-2
                            text-gray-800
                            outline-none
                            transition
                            focus:bg-white
                        "
                    />
                </div>

                {/* Sort */}
                <select  className="
                    w-full
                    rounded-md
                    border
                    border-slate-300
                    bg-slate-50
                    px-2
                    py-2
                    text-gray-700
                    outline-none
                    sm:w-44"
                    onChange={(e) => sortNotes(e.target.value)}
                    value={selected}
                >
                    <option value="">--Sort By--</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="title-az">Title A–Z</option>
                    <option value="title-za">Title Z–A</option>
                </select>

                {/* Filter */}
                <select 
                    className="
                    w-full
                    rounded-md
                    border
                    border-slate-300
                    bg-slate-50
                    px-2
                    py-2
                    text-gray-700
                    outline-none
                    sm:w-44"
                    onChange={(e) => setFilter(e.target.value)}
                    value={selected}
                >
                    <option value="">--Filter By--</option>
                    <option value="all">All</option>
                    <option value="text">Text Only</option>
                    <option value="checklist">Checklists Only</option>
                </select>

            </div>
        </div>
    )
}