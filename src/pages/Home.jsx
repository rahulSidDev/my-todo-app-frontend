import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/auth";

import HeroBanner from "../components/Home/HeroBanner";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import TechStack from "../components/Home/TechStack";

export default function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-7xl w-full pt-[55px]">
            <HeroBanner />
            <Features />
            <HowItWorks />
            <TechStack />
        </div>
    );
}
