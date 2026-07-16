import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../contexts/auth";

import HeroBanner from "../components/HeroBanner";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import TechStack from "../components/TechStack";

function Home() {
    const { isLoggedIn, user } = useContext(AuthContext);

    return (
        <>
            <HeroBanner />
            <Features />
            <HowItWorks />
            <TechStack />
        </>
    );
}

export default Home;
