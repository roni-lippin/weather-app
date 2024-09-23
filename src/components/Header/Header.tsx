import React from "react";
import "./header.css"
import App from "../../App";
import Setting from "../Setting/Setting";
import { Link } from 'react-router-dom';
import SearchBar from "../SearchBar/SearchBar";

interface Props {
    isDarkMode: boolean;
    setCity: React.Dispatch<React.SetStateAction<string>>,
    setCities: React.Dispatch<React.SetStateAction<string[]>>
}

const Header: React.FC<Props> = ({ isDarkMode, setCities, setCity }) => {
    return (
        <div className={`header ${isDarkMode ? 'dark' : 'light'}`}>
            <div className="links">
                <div className="Home">
                    <Link to="/">Home</Link>
                </div>
                <div className="Settings">
                    <Link to="/Settings">Settings</Link>
                </div>
            </div>
            <SearchBar setCity={setCity} setCities={setCities} isDarkMode={isDarkMode}/>
        </div>
    )
}

export default Header