import { 
    UserPlus, 
    ClipboardList, 
    CheckCircle2,
    ArrowRight,
    ArrowDown
 } from "lucide-react"

export default function HowItWorks () {
    return (
        <div className="py-15 px-10 bg-slate-100">
            <div className="text-center mb-16">
                <p className="text-4xl md:text-5xl font-bold text-blue-950">
                    How It Works
                </p>
                <p className="text-gray-600 text-xl mt-4">
                    Get started in just a few simple steps.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-5">
                <div className="text-center">
                    <div className="w-15 h-15 flex justify-center mx-auto">
                        <UserPlus className="text-pink-500" size={40}/>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">
                        Create Account
                    </p>
                    <p className="mt-2 text-gray-600">
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
                    <div className="w-15 h-15 flex justify-center mx-auto">
                        <ClipboardList className="text-yellow-500" size={40}/>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">
                        Add Tasks
                    </p>
                    <p className="mt-2 text-gray-600">
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
                    <div className="w-15 h-15 flex justify-center mx-auto">
                        <CheckCircle2 className="text-green-500" size={40}/>
                    </div>
                    <p className="mt-2 text-2xl font-semibold">
                        Track Progress
                    </p>
                    <p className="mt-2 text-gray-600">
                        Update task status and stay productive.
                    </p>
                </div>
            </div>
        </div>
    )
}