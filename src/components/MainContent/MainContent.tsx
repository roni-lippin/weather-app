import React from "react";
import "./mainContent.css"
import SearchBar from "../SearchBar/SearchBar";
import Content from "../Content/Content";
import ConditionGrid from "../ConditionGrid/ConditionGrid";

interface Props {
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>,
    data: any,
    tempType: string
    setCities: React.Dispatch<React.SetStateAction<string[]>>
    isDarkMode: boolean
} 


const MainContent: React.FC<Props> = ({ city, setCity, data, tempType, setCities, isDarkMode}) => {
    if (!data || !data.current || !data.forecast || !data.forecast.forecastday) {
        return <div>Loading...</div>;
    }

    const tempProps = tempType === 'celsius' ? {
        temp: data.current.temp_c,
        minTemp: data.forecast.forecastday[0].day.mintemp_c,
        maxTemp: data.forecast.forecastday[0].day.maxtemp_c
    } : {
        temp: data.current.temp_f,
        minTemp: data.forecast.forecastday[0].day.mintemp_f,
        maxTemp: data.forecast.forecastday[0].day.maxtemp_f
    } 
    return (
        <div className="main-content">
            <Content
                city={data.location.name}
                temp={tempProps.temp}
                situation={data.current.condition.text}
                minTemp={tempProps.minTemp}
                maxTemp={tempProps.maxTemp}
            />
            <ConditionGrid city={data.location.name} data={data} tempType={tempType} isDarkMode={isDarkMode}/>
        </div>
    )
}

export default MainContent