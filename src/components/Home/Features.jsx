import {
  ShieldCheck,
  CheckSquare,
  StickyNotes
} from "lucide-react";

export default function Features () {
    return (
        <div className="py-15 px-10 bg-white">
            <div className="text-center mb-15">
                <p className="text-4xl md:text-5xl font-bold text-blue-950">
                    Simple Effective Features
                </p>
                <p className="mt-4 text-gray-600 text-xl">
                    Everything you need to stay organised and manage your daily tasks.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="bg-slate-100 rounded-md p-10">
                    <ShieldCheck
                        size={40}
                        className="mb-4 text-blue-500"
                    />
                    <p className="text-xl font-semibold">
                        Secure Authentication
                    </p>
                    <p className="mt-5 text-gray-600">
                        Create your account with just a couple of clicks.
                        Keep you notes and lists private and secure.
                    </p>
                </div>
                <div className="bg-slate-100 rounded-md p-10">
                    <CheckSquare
                        size={40}
                        className="mb-4 text-green-500"
                    />
                    <p className="text-xl font-semibold">
                        Notes, Todo list, and that's it
                    </p>
                    <p className="mt-5 text-gray-600">
                        Manage your tasks with just simple notes and todo lists.
                        No compicated or fancy editing tools stopping you from being
                        productive immediately.
                    </p>
                </div>
                <div className="bg-slate-100 rounded-md p-10">
                    <div className="flex items-center gap-3">
                        <StickyNotes
                            size={40}
                            className="mb-4 text-pink-500"
                        />
                        <StickyNotes
                            size={40}
                            className="mb-4 text-yellow-500"
                        />
                    </div>
                    <p className="text-xl font-semibold">
                        Remember Post-It Notes?
                    </p>
                    <p className="mt-5 text-gray-600">
                        Experience the simple and elegant design of the Post-It Notes
                        now brought onto the digital world. Simple and elegant note taking
                        and list making just like how you did on Post-It Notes.
                    </p>
                </div>
            </div>
        </div>
    )
}