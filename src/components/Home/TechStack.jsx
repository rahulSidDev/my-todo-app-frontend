import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiVercel,
  SiAxios,
  SiReactrouter,
  SiRender
} from "react-icons/si";

export default function TechStack () {
    return (
        <div className="py-15 px-10 bg-slate-50">
            {/* Section Heading */}
            <div className="text-center mb-15">
                <p className="text-4xl md:text-5xl text-blue-950 font-bold">
                    Technology Stack
                </p>
                <p className="mt-4 text-gray-600 text-xl">
                    Built with modern technologies and industry-standard tools.
                </p>
            </div>
            {/* Tech Content */}
            <div className="space-y-10 max-w-4xl mx-auto">
                {/* Frontend */}
                <div>
                    <p className="text-xl md:text-2xl font-semibold mb-5 text-center">
                        Frontend
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <TechBadge url="https://react.dev/" icon={<SiReact color="#61DAFB" className="text-blue-500" size={25} />} name="React" />
                        <TechBadge url="https://tailwindcss.com/" icon={<SiTailwindcss color="#06B6D4" className="text-blue-500" size={25} />} name="Tailwind CSS" />
                        <TechBadge url="https://axios.rest/" icon={<SiAxios color="#5A29E4" className="text-blue-500" size={25} />} name="Axios" />
                        <TechBadge url="https://reactrouter.com/" icon={<SiReactrouter color="#CA4245" className="text-blue-500" size={25} />} name="React Router" />
                    </div>
                </div>
                {/* Backend */}
                <div>
                    <p className="text-xl md:text-2xl font-semibold mb-5 text-center">
                        Backend
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <TechBadge url="https://nodejs.org/en" icon={<SiNodedotjs color="#339933" className="text-blue-500" size={25} />} name="Node.js" />
                        <TechBadge url="https://expressjs.com/" icon={<SiExpress color="#000000" className="text-blue-500" size={25} />} name="Express.js" />
                        <TechBadge url="https://www.mongodb.com/" icon={<SiMongodb color="#47A248" className="text-blue-500" size={25} />} name="MongoDB" />
                        <TechBadge url="https://www.jwt.io/" icon={<SiJsonwebtokens color="#000000" className="text-blue-500" size={25} />} name="JWT Authentication" />
                    </div>
                </div>
                {/* Deployment */}
                <div>
                    <p className="text-xl md:text-2xl font-semibold mb-5 text-center">
                        Deployment
                    </p>
                    <div className="flex flex-wrap justify-center gap-5">
                        <TechBadge url="https://vercel.com/" icon={<SiVercel color="#000000" className="text-blue-500" size={25} />} name="Vercel" />
                        <TechBadge url="https://render.com/" icon={<SiRender color="#46E3B7" className="text-blue-500" size={25} />} name="Render" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function TechBadge ({icon, name, url}) {
    return (
        <a className="
            px-5
            py-2
            rounded-full
            bg-white
            border
            border-gray-200
            text-gray-700
            font-medium
            hover:shadow-md
            transition
            flex"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="mx-1">{icon}</div>
            {name}
        </a>
    );
}