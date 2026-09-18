import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate, Link } from "react-router-dom";
import { userLogout } from "../api/user";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

export default () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, setUser } = useContext(AuthContext);
	const navbarRef = useRef(null)
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			const res = await userLogout({});
			setUser(null);
			navigate("/login", {replace: true});
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				navbarRef.current &&
				!navbarRef.current.contains(event.target)
			) {
				setMenuOpen(false);
			}
		};
		document.addEventListener(
			"mousedown",
			handleClickOutside
		);
		return () => {
			document.removeEventListener(
				"mousedown",
				handleClickOutside
			);
		};
	}, []);

	const navLinks = [
		{
			name: 'About',
			to: '/about',
			type: 'PUBLIC',
			onClick: () => {
				setMenuOpen(false)
			}
		},
		{
			name: 'Login',
			to: '/login',
			type: 'GUEST',
			onClick: () => {
				setMenuOpen(false)
			}
		},
		{
			name: 'Signup',
			to: '/signup',
			type: 'GUEST',
			onClick: () => {
				setMenuOpen(false)
			}
		},
		{
			name: 'My-Notes',
			to: '/my-notes',
			type: 'PRIVATE',
			onClick: () => {
				setMenuOpen(false)
			}
		},
		{
			name: 'Trash-Bin',
			to: '/trash-bin',
			type: 'PRIVATE',
			onClick: () => {
				setMenuOpen(false)
			}
		},
		{
			name: 'Profile',
			to: '/profile',
			type: 'PRIVATE',
			onClick: () => {
				setMenuOpen(false)
			}
		},
		{
			name: 'Logout',
			to: '',
			onClick: handleLogout,
			type: 'PRIVATE',
		},
	]

	return (
		<nav className="
		@container
		fixed
		top-0
		left-0
		max-w-7xl
		w-full
		h-[55px]
		px-8
		bg-gray-100
		border-b-2
		border-gray-300
		z-50
		flex
		justify-between
		items-center
		font-medium
		text-blue-950"
		ref={navbarRef}
		>			
			<Link className="
			hover:underline
			hover:decoration-2
			transition
			font-[900] 
			text-2xl"
			to="/"
			>
				[MyNotes~APP]
			</Link>
			<ol className={`
			${menuOpen ? "flex" : "hidden"}
			bg-gray-100
			border-b-2
			border-gray-300
			@min-[800px]:flex
			@min-[800px]:border-0
			flex-col
			@min-[800px]:flex-row
			absolute
			@min-[800px]:static
			top-[56px]
			@min-[800px]:top-auto
			left-0
			@min-[800px]:left-auto
			w-full
			@min-[800px]:w-auto
			@min-[800px]:bg-transparent
			p-4
			@min-[800px]:p-0
			gap-4
			@min-[800px]:gap-8
			text-xl
			`}>
				{
					navLinks
					.filter(link => link.type === 'PUBLIC' ||
						(user && link.type === 'PRIVATE') || 
						(!user && link.type === 'GUEST')
					)
					.map(link => (
						<li key={link.to}>
							<Link className={`
							hover:underline 
							hover:decoration-2
							transition`}
							to={link.to}
							onClick={link.onClick}>
								{link.name}
							</Link>
						</li>
					))
				}
			</ol>
			<button
			onClick={() => setMenuOpen(!menuOpen)}
			className="@min-[800px]:hidden ml-auto p-2"
			>
				{menuOpen ? (
					<ImCross size={20} />
				) : (
					<GiHamburgerMenu size={25} />
				)}
			</button>
		</nav>
	);
};