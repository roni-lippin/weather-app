import React, { useState } from "react";
import "./searchBar.css";

interface Props {
  setCity: React.Dispatch<React.SetStateAction<string>>,
  setCities: React.Dispatch<React.SetStateAction<string[]>>
  isDarkMode: boolean
}

const SearchBar: React.FC<Props> = ({ setCity, setCities, isDarkMode }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setCity(inputValue); // Update city state in App

      setCities((cities) => {
        // Create a new array if the city is not already in the list
        if (!cities.includes(inputValue)) {
          return [...cities, inputValue]; // Return a new array with the new city
        }
        return cities; // If the city already exists, return the same array
      });

      setInputValue(""); // Clear input field after setting city
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search city"
        id={`${isDarkMode ? 'dark' : 'light'}`}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;