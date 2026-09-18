import { useNavigate } from "react-router-dom"

export default function HeroBanner () {
    const navigate = useNavigate()

    const onClickGoToMyNotes = () => navigate('/my-notes')
    const onClickSignup = () => navigate('/signup')

    return (
        <div className="
        min-h-full
        bg-slate-200 
        px-10 
        py-15"
        >
            {/* App Name */}
            <p className="
            text-center 
            mb-15 
            text-4xl 
            text-blue-950 
            md:text-6xl 
            font-extrabold"
            >
                [MyNotes~APP]
            </p>
            {/* Hero Content */}
            <div className="
            flex
            flex-col-reverse
            lg:flex-row
            items-center
            justify-between
            gap-10"
            >
                {/* Left Side */}
                <div className="
                w-full
                lg:w-1/2"
                >
                    <p className="
                    text-blue-950
                    text-4xl
                    md:text-6xl
                    font-bold
                    leading-tight"
                    >
                        Stay Organized
                    <br />
                        Get More Done
                    </p>
                    <p className="
                    mt-5
                    text-lg 
                    text-gray-600"
                    >
                        Utilize the simplest and the most straightforward Todo App
                        for your daily task management. Get started right away.
                    </p>
                    <div className="
                    flex
                    flex-wrap
                    gap-5
                    mt-10"
                    >
                        <button 
                        className="
                        bg-blue-950
                        text-white
                        px-6
                        py-4
                        rounded-md
                        font-medium
                        hover:bg-blue-900
                        transition"
                        onClick={onClickGoToMyNotes}
                        >
                            See all My Notes
                        </button>
                        <button className="
                        bg-white
                        px-6 
                        py-4
                        rounded-md
                        font-medium 
                        hover:bg-gray-100 
                        transition"
                        onClick={onClickSignup}
                        >
                            Signup
                        </button>
                    </div>
                </div>
                {/* Right Side - Overlapping Cards */}
                <div className=" 
                w-full
                lg:w-1/2"
                >
                    <img
                        src="heroBannerImg.jpg"
                        alt="Todo Notes application"
                        className="
                            w-full
                            h-auto
                            object-contain
                        "
                    />
                </div>
            </div>
        </div>
    )
}