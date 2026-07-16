import { 
    UserPlus, 
    ClipboardList, 
    CheckCircle2,
    ArrowRight,
    ArrowDown
 } from "lucide-react"

export default function HowItWorks () {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-blue-950">
                        How It Works
                    </h2>
                    <p className="text-gray-600 mt-4">
                        Get started in just a few simple steps.
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6">
                    <div className="text-center">

                        <div className="w-16 h-16 flex items-center justify-center mx-auto text-xl font-bold">
                            <UserPlus className="text-pink-500"/>
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Create Account
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Sign up securely and access your personal dashboard.
                        </p>

                    </div>
                    <div className="flex justify-center">

                        {/* Mobile Arrow */}
                        <ArrowDown
                            size={32}
                            className="lg:hidden text-gray-400"
                        />

                        {/* Desktop Arrow */}
                        <ArrowRight
                            size={32}
                            className="hidden lg:block text-gray-400"
                        />

                    </div>
                    <div className="text-center">

                        <div className="w-16 h-16 flex items-center justify-center mx-auto text-xl font-bold">
                            <ClipboardList className="text-yellow-500"/>
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Add Tasks
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Create and organise tasks with ease.
                        </p>

                    </div>
                    <div className="flex justify-center">

                        {/* Mobile Arrow */}
                        <ArrowDown
                            size={32}
                            className="lg:hidden text-gray-400"
                        />

                        {/* Desktop Arrow */}
                        <ArrowRight
                            size={32}
                            className="hidden lg:block text-gray-400"
                        />

                    </div>
                    <div className="text-center">

                        <div className="w-16 h-16 flex items-center justify-center mx-auto text-xl font-bold">
                            <CheckCircle2 className="text-green-500"/>
                        </div>

                        <h3 className="mt-6 text-xl font-semibold">
                            Track Progress
                        </h3>

                        <p className="mt-3 text-gray-600">
                            Update task status and stay productive.
                        </p>

                    </div>
                </div>
            </div>
        </section>
    )
}