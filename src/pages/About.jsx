export default function About () {
    const features = [
        {
            title: "Secure Authentication",
            description: "Users can securely create accounts and manage notes."
        },
        {
            title: 'Flexible Notes',
            description: 'Combine text blocks and checklist items within the same note to organize information however you like.'
        },
        {
            title: "Trash Bin",
            description: "Restore deleted notes or permanently remove them."
        },
        {
            title: "Password Recovery",
            description: "Reset passwords using OTP verification."
        },
        {
            title: 'Custom Preferences',
            description: 'Personalize your experience by choosing your preferred note color theme.'
        },
        {
            title: 'Responsive Design',
            description: 'Use the application comfortably across desktop and mobile devices.'
        }
    ];

    const techStack = {
        frontend: [
            "React",
            "Vite",
            "Tailwind CSS",
            "Axios",
            "React Router"
        ],
        backend: [
            "Node.js",
            "Express.js",
            "JWT Authentication"
        ],
        database: [
            "MongoDB",
            "Mongoose.js"
        ],
        deployment: [
            "Vercel",
            "Render"
        ]
    };

    const contacts = [
        {
            name: "GitHub",
            value: "github.com/rahulSidDev",
            link: "https://github.com/rahulSidDev"
        },
        {
            name: "LinkedIn",
            value: "linkedin.com/in/rahul-siddhartha",
            link: "https://www.linkedin.com/in/rahul-siddhartha/"
        },
        {
            name: "Email",
            value: "rahulsiddhartha1@gmail.com",
        }
    ];

    return (
        <main className="
            min-h-screen
            bg-slate-50
            pt-[55px]
        ">
            <div className="
                max-w-6xl
                mx-auto
                px-6
                py-12
            ">
                {/* Hero */}
                <section className="mb-16">
                    <h1 className="
                        text-5xl
                        font-bold
                        mb-6
                    ">
                        What is MyNotes App?
                    </h1>

                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        MyNotes App is a very simple and elegant personal note taking
                        app. It streamlines the note taking experience of users by taking away the
                        unnecessary and unused features of a traditional notes app and only
                        providing the user with the features they need. MyNotes App enables
                        users to get straight to note taking without bogging them down with
                        tutorials, complicated UI, or three dozen features that feels overwhelming.
                        This app is perfect for taking simple notes or creating To-Do lists
                        for everyday tasks.
                    </p>
                </section>

                {/* Features */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        What can the MyNotes App do?
                    </h2>
                    {/* feature cards */}
                    <div className="
                        grid
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                    ">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="
                                    bg-white
                                    p-6
                                    rounded-2xl
                                    shadow
                                "
                            >
                                <h3 className="
                                    text-xl
                                    font-semibold
                                    mb-3
                                ">
                                    {feature.title}
                                </h3>

                                <p>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        Technology Stack used for this App.
                    </h2>
                    {/* tech stack content */}
                    <div className="
                        grid
                        md:grid-cols-2
                        gap-6
                    ">
                        {Object.entries(techStack).map(
                            ([category, technologies]) => (
                                <div
                                    key={category}
                                    className="
                                        bg-white
                                        p-6
                                        rounded-2xl
                                        shadow
                                    "
                                >
                                    <h3 className="
                                        text-xl
                                        font-semibold
                                        mb-4
                                        capitalize
                                    ">
                                        {category}
                                    </h3>

                                    <ul className="
                                        space-y-2
                                    ">
                                        {technologies.map((tech) => (
                                            <li
                                                key={tech}
                                                className="text-gray-700"
                                            >
                                                • {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                </section>

                {/* Why I Built It */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        Why did I build this app?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        I created this app to learn how to create Web Apps using 
                        the MERN stack. I wanted to get better at developing Full-Stack
                        applications and just in general improve my coding skills. Initially
                        this app started off as a simple To-Do App but then I realised that the 
                        app can be turned into a decent note taking app that provides simple 
                        features not found in the modern note taking app. And so, I kept working 
                        on the To-Do app and I kept adding more and more features to turn the simple 
                        To-Do app into the present day MyNotes App.
                    </p>
                </section>

                {/* Contact */}
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        Who am I?
                    </h2>
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        Hi, my name is Rahul Siddhartha, and I am a graduate from the University 
                        of New South Wales with a Bachelor's degree in Computer Science. 
                        I'm based in Perth, Australia and I have a strong interest in 
                        full-stack web development.
                    </p>
                    <br />
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        I enjoy building practical applications that solve real-world 
                        problems while helping me deepen my understanding of modern software 
                        development. My primary focus is on JavaScript and the MERN stack, 
                        including React, Node.js, Express.js, and MongoDB.
                    </p>
                    <br />
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        This project was built as part of my journey to develop 
                        production-style applications and strengthen my skills 
                        in all areas of full-stack architecture. Through projects 
                        like this, I aim to continuously improve as a developer 
                        by applying industry practices and learning new technologies.
                    </p>
                    <br />
                    <p className="
                        text-lg
                        text-gray-700
                        leading-relaxed
                    ">
                        When I'm not coding, I'm usually exploring new development 
                        tools, refining existing projects, and expanding my knowledge 
                        of software engineering and web technologies.
                    </p>
                </section>
                <section className="mb-16">
                    <h2 className="
                        text-3xl
                        font-bold
                        mb-6
                    ">
                        My Contact Info.
                    </h2>
                    <div className="
                        grid
                        md:grid-cols-3
                        gap-4
                    ">
                        {contacts.map((contact) => (
                            <a
                                key={contact.name}
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    bg-white
                                    p-6
                                    rounded-2xl
                                    shadow
                                    hover:shadow-lg
                                    transition
                                "
                            >
                                <h3 className="
                                    font-semibold
                                    mb-2
                                ">
                                    {contact.name}
                                </h3>
                                <p className="
                                    text-sm
                                    text-gray-600
                                    break-all
                                ">
                                    {contact.value}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}