import { useNavigate } from "react-router-dom"

export default function HeroBanner () {
    const navigate = useNavigate()

    const onClickGoToDashboard = () => navigate('/dashboard')
    const onClickSignup = () => navigate('/signup')

    return (
        <section className="pt-[55px] min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-8 py-16">
                
                {/* App Name */}
                <h1 className="text-center mb-16 text-4xl text-blue-950 md:text-6xl font-extrabold tracking-tight">
                    [MyTodo~APP]
                </h1>

                {/* Hero Content */}
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

                {/* Left Side */}
                <div className="max-w-xl">
                    <h2 className="text-blue-950 text-4xl md:text-6xl font-bold leading-tight">
                        Stay Organized.
                    <br />
                        Get More Done.
                    </h2>

                    <p className="mt-6 text-lg text-gray-600">
                        Utilize the simplest and the most straightforward Todo App
                        for your daily task management. Get started right away.
                    </p>

                    <div className="flex flex-wrap gap-4 mt-8">
                        <button onClick={onClickGoToDashboard} className="bg-blue-950 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                            Go To Dashboard
                        </button>

                        <button onClick={onClickSignup} className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition">
                            Signup
                        </button>
                    </div>
                </div>

                {/* Right Side - Overlapping Cards */}
                <div className="relative w-[400px] h-[350px]">

                {/* Yellow Card */}
                <div
                    className="
                    absolute
                    bottom-0
                    right-0
                    w-[280px]
                    h-[220px]
                    rounded-3xl
                    bg-yellow-300
                    shadow-xl
                    flex
                    items-center
                    justify-center
                    "
                >
                    <h3 className="text-3xl font-bold">
                    Notes
                    </h3>
                </div>


                {/* Pink Card */}
                <div
                    className="
                    absolute
                    top-0
                    left-0
                    w-[280px]
                    h-[220px]
                    rounded-3xl
                    bg-pink-500
                    shadow-xl
                    flex
                    items-center
                    justify-center
                    rotate-[-8deg]
                    z-10
                    "
                >
                    <h3 className="text-3xl font-bold text-white">
                    Todos
                    </h3>
                </div>

                </div>

                </div>
            </div>
        </section>
    )
}