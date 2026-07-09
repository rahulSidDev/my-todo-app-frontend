import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate, Link } from "react-router-dom";
import { userLogout } from "../api/user";

const Navbar = () => {
	const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

	const navigate = useNavigate();
	const logoutHandler = async () => {
		try {
			setIsLoggedIn(false);
			const res = await userLogout({});
			navigate("/login");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<div className="fixed top-0 left-0 w-full h-[55px] px-8 shadow-gray-200 flex justify-between items-center">
			<p className="font-[900] text-2xl text-blue-950">MyTodo~APP</p>
			<ol className="flex gap-5 items-center text-xl">
				<Link to="/">
					<li>Home</li>
				</Link>
				{isLoggedIn ? (
					<Link to="/dashboard">
						<li>Dashboard</li>
					</Link>
				) : (
					""
				)}
				{isLoggedIn ? (
					<button onClick={logoutHandler}>Logout</button>
				) : (
					<Link to="/login">
						<li>Login</li>
					</Link>
				)}
			</ol>
		</div>
	);
};

export default Navbar;