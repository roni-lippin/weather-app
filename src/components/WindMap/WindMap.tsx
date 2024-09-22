import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "./windMap.css";
import location from "../location.svg"


interface Props {
  city: string;
  isDarkMode: boolean;
  temp: number
}

const API_KEY = '00cf40eea985471c83c111501240409';

const WindMap: React.FC<Props> = ({ city, isDarkMode, temp }) => {
  const mapRef = useRef<L.Map | null>(null); // Store Leaflet map instance

  useEffect(() => {
    // Fetch city coordinates and initialize the map
    const fetchCityCoordinates = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`);
        const data = await response.json();
        
        const { lat, lon } = data.location;
        initMap(lat, lon);
      } catch (error) {
        console.error("Error fetching city coordinates:", error);
      }
    };

    // Function to initialize the map
    const initMap = (lat: number, lon: number) => {
      // If map is already initialized, do not reinitialize
      if (mapRef.current) {
        mapRef.current.setView([lat, lon], 10); // Just update the view
        return;
      }

      // Initialize the map if not already created
      const map = L.map('wind-map', {
        center: [lat, lon],
        zoom: 10,
        zoomControl: true, // Default is "topleft"
      });

      mapRef.current = map; // Store map instance in ref

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
    };

    fetchCityCoordinates();
  }, [city]); // Re-run the effect if the city changes

  return (
    <div className={`condition-wind-map ${isDarkMode ? 'dark' : 'light'}`}>
      <h3>
      <img src={location} alt="Wind Icon" style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)'}} />
      MAP
      </h3>
      <div id="wind-map" className="wind-map-container"></div>
    </div>
  );
};

export default WindMap;