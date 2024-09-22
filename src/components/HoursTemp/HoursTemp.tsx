import React from "react";
import "./hoursTemp.css"
import HoursItem from "../HoursItem/HoursItem";


interface Props {
  data: any,
  tempType: string
  isDarkMode: boolean
}

const takeRelevent24Hours = (data: Props['data']): any[] => {
  if (!data.forecast || !data.forecast.forecastday || data.forecast.forecastday.length < 2) {
    console.error("Forecast data is incomplete or not available.");
    return [];
  }
  const now = new Date(data.location.localtime);
  const currentHour = now.getHours();
  const todayForecastHours = data.forecast.forecastday[0].hour;
  const nextDayForecastHours = data.forecast.forecastday[1].hour;

  // Filter today's hours to include only those from the current hour onwards
  const todayRelevantHours = todayForecastHours.filter((hour: any) => {
    return new Date(hour.time).getHours() >= currentHour - 1;
  });

  // Combine today's hours with the next day's hours, if needed, up to 24 hours
  const totalHours = [
    ...todayRelevantHours,
    ...nextDayForecastHours.slice(0, 24 - todayRelevantHours.length)
  ];

  return totalHours;
};

const HoursTemp: React.FC<Props> = ({ data , tempType, isDarkMode}) => {
  const hoursData = takeRelevent24Hours(data);
  hoursData[0].time="th Now"
  return (
    <ul id={`${isDarkMode ? 'dark' : 'light'}`}>
      {hoursData.map((item: any) => (
        <HoursItem
          key={item.time} // Unique key
          hour={item.time.split(" ")[1]} // Extract only the hour part (HH:mm)
          icon={item.condition.icon}
          temp={tempType === 'celsius' ? item.temp_c : item.temp_f} // Toggle between Celsius and Fahrenheit
        />
      ))}
    </ul>
  );
}



export default HoursTemp;
