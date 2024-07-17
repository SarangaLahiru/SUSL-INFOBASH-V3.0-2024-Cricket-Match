import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logOut } from "../../firebaseConfig";

const NavBar = ({ user }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const location = useLocation();

    const handleLogOut = () => {
        logOut();
        window.location.replace('/');
        setShowProfileMenu(false);
    };

    return (
        <div className="bg-black relative z-50">
            <Navbar className="p-1 bg-gradient-to-r from-black via-yellow-700 to-yellow-500 shadow-lg z-50">
                <Navbar.Brand href="/">
                    <img src="/favicon.svg" className="mr-3 h-10 sm:h-14" alt="Flowbite React Logo" />
                    {/* <span className="self-center text-2xl font-bold whitespace-nowrap text-black">Info Bash</span> */}
                </Navbar.Brand>
                <div className="flex md:order-2 items-center">
                    {user ? (
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={user.photoURL || "/default-avatar.jpg"} rounded />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm text-gray-900">{user.displayName || "User"}</span>
                                <span className="block truncate text-sm font-medium text-gray-500">{user.email}</span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                <Link to="/register" className="hover:text-yellow-500">Dashboard</Link>
                            </Dropdown.Item>

                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogOut} className="hover:text-red-500">Sign out</Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <Link to="/signin" className="text-black ml-4 hover:text-gray-700">
                            {/* Sign In */}
                        </Link>
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
        className={`text-white hover:text-gray-300 px-4 py-6 text-lg font-medium transition duration-300 ${active ? 'font-bold border-b-4 border-yellow-500' : ''}`}
    >
        {label}
    </Link>
);

export default NavBar;
