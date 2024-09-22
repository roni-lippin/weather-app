import React from "react";
import "./sideBarItem.css";

interface Props {
    city: string;
    temp: number;
    situation: string;
    minTemp: number;
    maxTemp: number;
    time: string; // Add time prop
    setCity: React.Dispatch<React.SetStateAction<string>>;
    setCities: React.Dispatch<React.SetStateAction<string[]>>;
    cities: string[];
}

const SideBarItem: React.FC<Props> = ({ city, temp, situation, minTemp, maxTemp, time, setCity, setCities, cities }) => {
    const handleClick = () => {
        setCity(city);
    };


    const handleDelete = (cityToDelete: string) => {
        let newCities = cities.filter(c => c.toLowerCase() !== cityToDelete.toLowerCase());

        if (cityToDelete === city) {
            if (newCities.length == 0) {
                newCities = [localStorage.getItem('defaultCity') || 'london']
            }
            setCity(newCities[0]);
        }
        setCities(newCities);
    };

    return (
        <div className="city" tabIndex={0} onClick={handleClick}>
            <div className="city-info">
                <div className="city-name-bar">{city}</div>
                <div className="city-time">{time}</div> {/* Display the local time */}
            </div>
            <div className="situation">{situation}</div>
            <div className="city-temp-current">{parseInt(temp.toString())}°</div>
            <div className="min-max-temp">
                H: {parseInt(maxTemp.toString())}° L: {parseInt(minTemp.toString())}°
            </div>
            <button className="remove-city" onClick={(e) => {
                e.stopPropagation(); // Prevent the click from bubbling up to the city div
                handleDelete(city);
            }}>X</button>
        </div>
    );
};

export default SideBarItem;