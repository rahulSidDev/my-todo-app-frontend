import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate, Link } from "react-router-dom";
import { userLogout } from "../api/user";

export default () => {
	const { user, setUser } = useContext(AuthContext);

	const navigate = useNavigate();
	const logoutHandler = async () => {
		try {
			setUser(null);
			const res = await userLogout({});
			navigate("/login");
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<nav className="
		fixed
		top-0
		left-0
		w-full
		h-[55px]
		px-8
		bg-white
		border-b
		border-gray-200
		z-50
		flex
		justify-between
		items-center
		">			
			<p className="hover:underline transition duration-200 font-[900] text-2xl text-blue-950">[MyTodo~APP]</p>
			<ol className="flex gap-5 items-center text-xl">
				<Link className="hover:underline transition duration-200" to="/">
					<li>Home</li>
				</Link>
				{user ? (
					<Link className="hover:underline transition duration-200" to="/my-notes">
						<li>My-Notes</li>
					</Link>
				) : (
					""
				)}
				{user ? (
					<Link className="hover:underline transition duration-200" to="/profile">
						<li>Profile</li>
					</Link>
				) : (
					""
				)}
				{user ? (
					<button className="hover:underline transition duration-200" onClick={logoutHandler}>Logout</button>
				) : (
					<Link className="hover:underline transition duration-200" to="/login">
						<li>Login</li>
					</Link>
				)}
			</ol>
		</nav>
	);
};