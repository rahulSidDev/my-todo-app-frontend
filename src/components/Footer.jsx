import { Link } from "react-router-dom"
import {
  MdEmail
} from "react-icons/md";
import {
  SiGithub
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

export default function Footer () {
    return (
        <footer className="bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-8 py-12">
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-4
                    gap-10
                ">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold">
                            [MyTodo~APP]
                        </h3>
                        <p className="mt-4 text-gray-400">
                            Utilize the simplest and the most straightforward Todo App for your daily task management. Get started right away.
                        </p>
                    </div>
                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            <li className="hover:underline transition"><Link to='/'>Home</Link></li>
                            <li className="hover:underline transition"><Link to='/my-notes'>My-Notes</Link></li>
                            <li className="hover:underline transition"><Link to='/login'>Login</Link></li>
                            <li className="hover:underline transition"><Link to='/signup'>Signup</Link></li>
                        </ul>
                    </div>
                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            Contact
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <p className="flex underline">
                                    <MdEmail className="mx-1" size={20}/>
                                    rahulsiddhartha1@gmail.com
                                </p>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/rahulSidDev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex hover:underline transition"
                                >
                                    <SiGithub className="mx-1" size={20}/>
                                    GitHub
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/rahul-siddhartha/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex hover:underline transition"
                                >
                                    <FaLinkedin className="mx-1" size={20}/>
                                    LinkedIn
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* Technologies */}
                    <div>
                        <h4 className="font-semibold mb-4">
                            Built With
                        </h4>
                        <p className="text-gray-400">
                            React · Tailwind · Node.js · MongoDB
                        </p>
                    </div>
                </div>
                <div className="
                    border-t
                    border-gray-700
                    mt-10
                    pt-6
                    text-center
                    text-gray-400
                ">
                    <p>
                        © 2026 My Todo APP. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}