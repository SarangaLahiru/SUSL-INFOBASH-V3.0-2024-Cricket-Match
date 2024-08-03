import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logOut, auth, db } from "../../firebaseConfig"; // Import your firebaseConfig
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

const NavBar = ({ user }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(null); // Handle error state

    const handleLogOut = () => {
        logOut();
        window.location.replace('/');
        setShowProfileMenu(false);
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userDoc = doc(db, `users/${user.uid}`);
            const userDocSnap = await getDoc(userDoc);

            if (!userDocSnap.exists()) {
                await setDoc(userDoc, { email: user.email, name: user.displayName, avatar: user.photoURL });
            }

            navigate('/register');
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError("Error signing in with Google. Please try again.");
        }
    };

    return (
        <div className="bg-black relative z-50">
            <Navbar className="p-0 bg-gradient-to-r h-20 pt-3 md:h-20 md:pt-0 from-[#000014] via-yellow-800 to-[#000014] shadow-lg z-50" style={{ backgroundColor: "#000014" }}  >
                <Navbar.Brand href="/">
                    <img src="./img/ggg.png" className="mx-4 mr-3 md:h-20 h-14 sm:h-14" alt=" Logo" />
                    <span className="self-center text-2xl font-bold whitespace-nowrap text-white">INFO BASH</span>
                </Navbar.Brand>
                <div className="flex md:order-2 mx-6 items-center">
                    {user ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={user.photoURL || "/default-avatar.jpg"} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm  text-gray-900">{user.displayName || "User"}</span>
                                <span className="block truncate text-sm font-medium text-gray-500">{user.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                <Link to="/register" className="hover:text-yellow-500">Profile</Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogOut} className="hover:text-red-500">Sign out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <button
                            onClick={signInWithGoogle}
                            className="relative inline-flex items-center justify-center px-6 py-3 font-bold text-white bg-[#000014] rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:animate-scaleUp hover:bg-gradient-to-r from-[#000014] via-[#ffcd00] to-[#000014] hover:animate-colorPulse hidden md:flex"
                        >
                            <FcGoogle className="mr-2" size={24} />
                            Sign In
                        </button>
                    )}
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <NavLink to="/" label="Home" active={location.pathname === '/'} />
                    <NavLink to="/teams" label="Teams" active={location.pathname === '/teams'} />
                    <NavLink to="/matches" label="Matches" active={location.pathname === '/matches'} />
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

const NavLink = ({ to, label, active }) => (
    <Link
        to={to}
        className={`block text-white bg-gradient-to-r md:bg-none from-[#000014] via-yellow-800 to-[#000014] hover:text-gray-300 px-4 py-2 md:py-6 text-lg font-medium transition duration-300 ${active ? 'font-bold border-b-4 border-[#ffcd00]' : ''}`}
    >
        {label}
    </Link>
);

export default NavBar;
