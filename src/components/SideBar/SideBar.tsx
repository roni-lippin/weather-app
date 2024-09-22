import React, { useEffect, useState } from 'react';
import "./sideBar.css";
import SideBarItem from "../sideBarItem/SideBarItem";

const API_KEY = 'a6013d4da00e4e93a7a110941240409';

interface Props {
  tempType: string;
  cities: string[];
  setCity: React.Dispatch<React.SetStateAction<string>>
  setCities: React.Dispatch<React.SetStateAction<string[]>>
  isDarkMode: boolean
}

const SideBar: React.FC<Props> = ({ tempType, cities, setCity, setCities, isDarkMode }) => {
  const [cityData, setCityData] = useState<any[]>([]); // Array to hold city data

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = [];
        for (let i = 0; i < cities.length; i++) {
          const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${cities[i]}&key=${API_KEY}&days=10`);
          if (!response.ok) {
            throw new Error('City not found');
          }
          const result = await response.json();
          fetchedData.push(result); // Collect data for each city
        }
        setCityData(fetchedData); // Set the collected data to state
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
  }, [cities]); // Refetch when cities change

  if (cityData.length === 0) {
    return <div className="city-bar">Loading...</div>;
  }

  return (
    <div className={`city-bar ${isDarkMode ? 'dark' : 'light'}`}>
      {cityData.map((data, index) => {
        // Calculate local time for each city
        const localTime = new Date(data.location.localtime);
        const hour = localTime.getHours().toString().padStart(2, '0'); // Ensure two-digit format
        const minute = localTime.getMinutes().toString().padStart(2, '0'); // Ensure two-digit format
        const formattedTime = `${hour}:${minute}`;

        return (
          <SideBarItem
            key={index}
            city={data.location.name}
            temp={tempType === 'celsius' ? data.current.temp_c : data.current.temp_f}
            situation={data.current.condition.text}
            minTemp={tempType === 'celsius' ? data.forecast.forecastday[0].day.mintemp_c : data.forecast.forecastday[0].day.mintemp_f}
            maxTemp={tempType === 'celsius' ? data.forecast.forecastday[0].day.maxtemp_c : data.forecast.forecastday[0].day.maxtemp_f}
            time={formattedTime} // Pass the calculated local time as a prop
            setCity={setCity}
            setCities={setCities}
            cities={cities}
          />
        );
      })}
    </div>
  );
};

export default SideBar;