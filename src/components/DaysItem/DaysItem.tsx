import React from "react";
import "./daysItem.css"

interface Props {
  day: string,
  icon: string,
  minTemp: number,
  maxTemp: number
}

const DaysItem: React.FC<Props> = ({ day, icon, minTemp, maxTemp }) => {
  return (
    <tr>
      <th><h4 style={{ margin: 20 }}>{day}</h4></th>
      <th><img id="forecast-Image" src={icon} style={{ width: '50px', height: '50px' }} alt="weather icon" /></th>
      <th><h4 style={{ margin: 20 }}>{Math.round(minTemp)}°</h4></th>
      <th><h4 style={{ margin: 20 }}>{Math.round(maxTemp)}°</h4></th>
    </tr>
  );
};



export default DaysItem;