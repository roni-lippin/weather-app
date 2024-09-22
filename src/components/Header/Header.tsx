import React from "react";
import "./header.css"
import App from "../../App";
import Setting from "../Setting/Setting";
import { Link } from 'react-router-dom';

interface Props {
    isDarkMode: boolean;
}

const Header: React.FC<Props> = ({ isDarkMode }) => {
    return (
        <div className={`header ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="Weather">
                <h1>Weather</h1>
            </div>
            <div className="links">
                <div className="Home">
                    <Link to="/">Home</Link>
                </div>
                <div className="Settings">
                    <Link to="/Settings">Settings</Link>
                </div>
            </div>
        </div>
    )
}

export default Header