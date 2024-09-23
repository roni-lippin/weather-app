import React, { useEffect, useState } from 'react';
import './App.css';
import SideBar from './components/SideBar/SideBar';
import MainContent from './components/MainContent/MainContent';
import { Route, Routes } from 'react-router-dom'; 
import Header from './components/Header/Header';
import Setting from './components/Setting/Setting';

const API_KEY = 'a6013d4da00e4e93a7a110941240409';

function App() {
  const [data, setData] = useState<any>(null); // Default to null instead of undefined
  const [city, setCity] = useState<string>(() => localStorage.getItem('defaultCity') || 'london');
  const [tempType, setTempType] = useState<string>('celsius');
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [cities, setCities] = useState<string[]>([localStorage.getItem('defaultCity') || 'london'])
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API_KEY}&days=10`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const result = await response.json();
        setData(result);

        // Check the current hour
        const localTime = new Date(result.location.localtime);
        const currentHour = localTime.getHours();
        
        // Set isDarkMode based on the hour
        if (currentHour >= 19 || currentHour < 7) {
          setIsDarkMode(true);
        } else {
          setIsDarkMode(false);
        }
      } catch (e) {
        console.error(e);
        alert('City not found. Please enter a valid city name.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Header isDarkMode={isDarkMode} setCities={setCities} setCity={setCity} />
      <SideBar tempType={tempType} cities={cities} setCity={setCity} setCities={setCities} isDarkMode={isDarkMode}/>
      <Routes>
        <Route
          path="/"
          element={ <MainContent city={city} setCity={setCity} data={data} tempType={tempType} setCities={setCities} isDarkMode={isDarkMode}/> }
        />
        <Route
          path="/Settings"
          element={<Setting setTempType={setTempType} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setCity={setCity} setCities={setCities} cities={cities}/>}
        />
      </Routes>
    </div>
  );
}

export default App;