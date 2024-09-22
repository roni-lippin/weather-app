import React from "react";

interface Props {
  hour: string;
  icon: string;
  temp: number;
}

const HoursItem: React.FC<Props> = ({ hour, icon, temp }) => {
  return (
    <li className="dayForecastItem">
      <h4 style={{ margin: 18 }}>{hour}</h4>
      <img id="forecast-Image" src={icon} style={{ width: '50px', height: '50px' }} alt="weather icon" />
      <h4 style={{ margin: 18 }}>{parseInt(temp.toString())}°</h4>
    </li>
  );
};

export default HoursItem;