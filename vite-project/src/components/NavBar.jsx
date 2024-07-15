// src/NavBar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { logOut } from "../../firebase";

const NavBar = ({ user }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleLogOut = () => {
        logOut();
        // Optionally: Close the profile menu after logout
        setShowProfileMenu(false);
    };


    return (
        <div className="w-full bg-blue-600 p-4 flex justify-between items-center">
            <h1 className="text-white text-xl">Team Registration</h1>

            {user ? (
                <div className="relative">

                    <button onClick={toggleProfileMenu} className="flex items-center focus:outline-none ml-4">
                        <img src={user.photoURL || '/default-avatar.jpg'} alt="avatar" className="w-10 h-10 rounded-full mr-2" />
                        <span className="text-white">{user.displayName}</span>
                    </button>
                    {showProfileMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                            <div className="px-4 py-2">
                                <p className="text-gray-800 text-sm">{user.email}</p>
                            </div>
                            <div className="border-t border-gray-200">
                                <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <Link to="/teams" className="text-white mr-4 hover:text-gray-200">
                        Teams
                    </Link>
                    <Link to="/matches" className="text-white hover:text-gray-200">
                        Matches
                    </Link>
                    <Link to="/signin" className="text-white ml-4 hover:text-gray-200">
                        Sign In
                    </Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;
