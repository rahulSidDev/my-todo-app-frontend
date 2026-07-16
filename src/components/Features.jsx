import {
  ShieldCheck,
  CheckSquare,
  StickyNotes
} from "lucide-react";

export default function Features () {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-blue-950">
                        Simple Effective Features
                    </h2>
                    <p className="mt-4 text-gray-600 text-lg">
                        Everything you need to stay organised and manage your daily tasks.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-50 rounded-2xl p-8">
                        <ShieldCheck
                            size={40}
                            className="mb-4 text-blue-500"
                        />
                        <h3 className="text-xl font-semibold">
                            Secure Authentication
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Create your account with just a couple of clicks.
                            Keep you notes and lists private and secure.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-8">
                        <CheckSquare
                            size={40}
                            className="mb-4 text-green-500"
                        />
                        <h3 className="text-xl font-semibold">
                            Notes, Todo list, and that's it
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Manage your tasks with just simple notes and todo lists.
                            No compicated or fancy editing tools stopping you from being
                            productive immediately.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-8">
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
                        <h3 className="text-xl font-semibold">
                            Remember Post-It Notes?
                        </h3>
                        <p className="mt-3 text-gray-600">
                            Experience the simple and elegant design of the Post-It Notes
                            now brought onto the digital world. Simple and elegant note taking
                            and list making just like how you did on Post-It Notes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}