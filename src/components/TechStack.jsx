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
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-8">

                {/* Section Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl text-blue-950 font-bold">
                    Technology Stack
                    </h2>
                    <p className="mt-4 text-gray-600 text-lg">
                    Built with modern technologies and industry-standard tools.
                    </p>
                </div>

                {/* Tech Content */}
                <div className="space-y-10 max-w-4xl mx-auto">

                    {/* Frontend */}
                    <div>

                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Frontend
                        </h3>

                        <div className="flex flex-wrap justify-center gap-4">

                            <TechBadge url="https://react.dev/" icon={<SiReact color="#61DAFB" className="text-blue-500" size={22} />} name="React" />
                            <TechBadge url="https://tailwindcss.com/" icon={<SiTailwindcss color="#06B6D4" className="text-blue-500" size={22} />} name="Tailwind CSS" />
                            <TechBadge url="https://axios.rest/" icon={<SiAxios color="#5A29E4" className="text-blue-500" size={22} />} name="Axios" />
                            <TechBadge url="https://reactrouter.com/" icon={<SiReactrouter color="#CA4245" className="text-blue-500" size={22} />} name="React Router" />

                        </div>

                    </div>

                    {/* Backend */}
                    <div>

                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Backend
                        </h3>

                        <div className="flex flex-wrap justify-center gap-4">

                            <TechBadge url="https://nodejs.org/en" icon={<SiNodedotjs color="#339933" className="text-blue-500" size={22} />} name="Node.js" />
                            <TechBadge url="https://expressjs.com/" icon={<SiExpress color="#000000" className="text-blue-500" size={22} />} name="Express.js" />
                            <TechBadge url="https://www.mongodb.com/" icon={<SiMongodb color="#47A248" className="text-blue-500" size={22} />} name="MongoDB" />
                            <TechBadge url="https://www.jwt.io/" icon={<SiJsonwebtokens color="#000000" className="text-blue-500" size={22} />} name="JWT Authentication" />

                        </div>

                    </div>


                    {/* Deployment */}
                    <div>

                        <h3 className="text-xl font-semibold mb-4 text-center">
                            Deployment
                        </h3>

                        <div className="flex flex-wrap justify-center gap-4">

                            <TechBadge url="https://vercel.com/" icon={<SiVercel color="#000000" className="text-blue-500" size={22} />} name="Vercel" />
                            <TechBadge url="https://render.com/" icon={<SiRender color="#46E3B7" className="text-blue-500" size={22} />} name="Render" />

                        </div>

                    </div>


                </div>

            </div>
        </section>
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