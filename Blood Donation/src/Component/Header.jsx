import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <img
                    src="https://www.shutterstock.com/image-vector/blood-drop-plus-heart-shape-600nw-2238094877.jpg"
                    alt="logo"
                />
                <span>Blood Donation</span>
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/eligible"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Eligibility
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/aboutus"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => (isActive ? "active-link" : "")}
                        >
                            Log in
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;