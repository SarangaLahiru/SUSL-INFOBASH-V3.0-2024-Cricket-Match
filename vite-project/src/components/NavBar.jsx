import { Avatar, Dropdown, Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { logOut } from "../../firebaseConfig";

const NavBar = ({ user }) => {
    const handleLogOut = () => {
        logOut();
        // Optionally: Close the profile menu after logout
        setShowProfileMenu(false);
    };

    return (
        <Navbar className="p-6" fluid rounded >
            <Navbar.Brand href="/">
                <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
            </Navbar.Brand>
            <div className="flex md:order-2">
                {user ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img={user.photoURL || "/default-avatar.jpg"} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{user.displayName || "User"}</span>
                            <span className="block truncate text-sm font-medium">{user.email}</span>
                        </Dropdown.Header>
                        <Dropdown.Item>
                            <Link to="/dashboard">Dashboard</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/settings">Settings</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/earnings">Earnings</Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <>
                        {/* <Link to="/signin" className="text-white ml-4 hover:text-gray-200">
                            Sign In
                        </Link> */}
                    </>
                )}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link href="/" active>
                    Home
                </Navbar.Link>
                <Navbar.Link href="/teams">Teams</Navbar.Link>
                <Navbar.Link href="/matches">Matches</Navbar.Link>
                <Navbar.Link href="/about">About</Navbar.Link>
                <Navbar.Link href="/services">Services</Navbar.Link>
                <Navbar.Link href="/pricing">Pricing</Navbar.Link>
                <Navbar.Link href="/contact">Contact</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
