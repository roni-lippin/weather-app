import React, { useState, useEffect } from "react";
import "./setting.css";

interface Props {
  setTempType: React.Dispatch<React.SetStateAction<string>>;
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setCities: React.Dispatch<React.SetStateAction<string[]>>;
  cities: string[];
}

const Setting: React.FC<Props> = ({ setTempType, isDarkMode, setIsDarkMode, setCity, setCities, cities }) => {
  // Local state to hold the settings before they are saved
  const [localTempType, setLocalTempType] = useState<string>("celsius");
  const [localIsDarkMode, setLocalIsDarkMode] = useState<boolean>(isDarkMode);
  const [defaultCity, setDefaultCity] = useState<string>("");

  // Update localIsDarkMode when isDarkMode prop changes
  useEffect(() => {
    setLocalIsDarkMode(isDarkMode);
  }, [isDarkMode]);

  // Handle input changes locally
  const handleTempChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalTempType(event.target.value);
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalIsDarkMode(event.target.checked); // Use event.target.checked to set the state
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultCity(event.target.value);
  };

  // Apply changes to parent state when the "Save Settings" button is clicked
  const handleSaveSettings = () => {
    setTempType(localTempType);
    setIsDarkMode(localIsDarkMode);
    setCity(defaultCity);
    setCities((prevCities) => {
      if (!prevCities.includes(defaultCity)) {
        return [...prevCities, defaultCity];
      }
      return prevCities;
    });
    localStorage.setItem('defaultCity', defaultCity);
  };

  return (
    <div className={`settings-page ${isDarkMode ? 'dark' : 'light'}`}>
      <form className="settings-form">
        <br />
        <label htmlFor="temp-unit">Temperature Unit: </label>
        <select id="temp-unit" name="temp-unit" value={localTempType} onChange={handleTempChange}>
          <option value="celsius">Celsius</option>
          <option value="fahrenheit">Fahrenheit</option>
        </select>
        <br />
        <br />
        <label htmlFor="dark-mode">Dark mode: </label>
        <input
          type="checkbox"
          id="dark-mode"
          name="dark-mode"
          checked={localIsDarkMode} // Use local state for checked value
          onChange={handleDarkModeChange}
        />
        <br />
        <br />
        <label htmlFor="city-name">Default city: </label>
        <input
          type="text"
          id="city-name"
          className="change-default-city"
          placeholder="City name"
          value={defaultCity}
          onChange={handleCityChange}
        />
        <br />
        <br />
        <button type="button" className="save-settings-button" onClick={handleSaveSettings}>
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Setting;