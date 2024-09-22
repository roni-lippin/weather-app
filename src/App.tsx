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
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${API_KEY}&days=10`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        console.error(e);
        alert('City not found. Please enter a valid city name.');
      } finally {
        setLoading(false); // Set loading to false after fetching completes
      }
    };

    fetchData();
  }, [city]);

  return (
    <div className={`App ${isDarkMode ? 'dark' : 'light'}`}>
      <Header isDarkMode={isDarkMode}/>
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