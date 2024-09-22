import React from "react";
import "./daysTemp.css"
import DaysItem from "../DaysItem/DaysItem";
import calender from "../calendar.png"

interface Props {
  days: any,
  tempType: string
  isDarkMode: boolean
}

const daysConvert = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const DaysTemp: React.FC<Props> = ({ days, tempType, isDarkMode }) => {
    return (
        <div className={`condition-days-forecast ${isDarkMode ? 'dark' : 'light'}`}>
        <h3>
        <img src={calender} alt="Calendar Icon" style={{ width: '20px', height: '20px', marginRight: '8px', filter: 'invert(100%)'}} />
        3-DAY FORECAST
        </h3>
        <table>
            {days.map((item: any) => (
              <DaysItem
                key={item.time} // Unique key
                day={daysConvert[(new Date(item.date)).getDay()]}
                icon={item.day.condition.icon}
                minTemp={tempType === 'celsius' ? item.day.mintemp_c : item.day.mintemp_f} // Toggle between Celsius and Fahrenheit
                maxTemp={tempType === 'celsius' ? item.day.maxtemp_c : item.day.maxtemp_f} // Toggle between Celsius and Fahrenheit
              />
            ))}
        </table>
      </div>
    )
}

export default DaysTemp