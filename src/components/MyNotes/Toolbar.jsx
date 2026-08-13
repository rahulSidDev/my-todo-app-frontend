import { useState } from "react";

export default function Toolbar ({
    onCreate, 
    searchNotes, 
    sortNotes, 
    sort,
    filter,
    setFilter
}) {
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
                onChange={(e) => searchNotes(e.target.value)}
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
                <label className="py-3" htmlFor="filter">Filter By:</label>
                <select
                    id="filter"
                    name="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border rounded-xl px-3 py-2"
                >
                    <option value="">--Select--</option>
                    <option value="all">All Notes</option>
                    <option value="text">Only Text</option>
                    <option value="checklist">Only Checklist</option>
                </select>
                <label className="py-3" htmlFor="sort">Sort By:</label>
                <select
                    id="sort"
                    name="sort"
                    value={sort}
                    className="border rounded-xl px-3 py-2"
                    onChange={(e) => sortNotes(e.target.value)}
                >
                    <option value="">--Select--</option>
                    <option value="newest">
                        Newest
                    </option>
                    <option value="oldest">
                        Oldest
                    </option>
                    <option value="title-az">
                        Title A-Z
                    </option>
                    <option value="title-za">
                        Title Z-A
                    </option>
                </select>
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