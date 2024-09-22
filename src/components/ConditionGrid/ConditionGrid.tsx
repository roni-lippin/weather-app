import React from "react";
import "./conditionGrid.css"
import HoursTemp from "../HoursTemp/HoursTemp";
import DaysTemp from "../DaysTemp/DaysTemp";
import WindMap from "../WindMap/WindMap";
import GeneralCondition from "../GeneralCondition/GeneralCondition";

interface Props {
    city: string
    data: any
    tempType: string
    isDarkMode: boolean
}


const ConditionGrid: React.FC<Props> = ({ city, data, tempType, isDarkMode })  => {
    const tempProps = tempType === 'celsius' ? {
        feelsLike: data.current.feelslike_c,
        average: data.forecast.forecastday[0].day.avgtemp_c,
        temp: data.current.temp_c
    } : {
        feelsLike: data.current.feelslike_f,
        average: data.forecast.forecastday[0].day.avgtemp_f,
        temp: data.current.temp_f
    } 
    return (
        <div className="conditions-grid">
            <HoursTemp data={data} tempType={tempType} isDarkMode={isDarkMode}/>
            <DaysTemp days={data.forecast.forecastday} tempType={tempType} isDarkMode={isDarkMode}/>
            <WindMap city={city} isDarkMode={isDarkMode} temp={tempProps.temp}/>
            <GeneralCondition title="UV INDEX" isDarkMode={isDarkMode} icon='sun'>
                {data.current.uv}
            </GeneralCondition>
            <GeneralCondition title="SUNSET" isDarkMode={isDarkMode} icon='sunset'>
                {data.forecast.forecastday[0].astro.sunset}
                <br /> <br /><br />
                Sunrise: {data.forecast.forecastday[0].astro.sunrise}
            </GeneralCondition>
            <GeneralCondition title="WIND" isDarkMode={isDarkMode} icon='wind'>
                {parseInt(data.current.wind_kph.toString())} km/h
            </GeneralCondition>
            <GeneralCondition title="PRECIPITATION" isDarkMode={isDarkMode} icon='raindrop'>
                {parseInt(data.current.precip_mm.toString())} mm in last 24h
            </GeneralCondition>
            <GeneralCondition title="FEELS LIKE" isDarkMode={isDarkMode} icon="termomether">
                {tempProps.feelsLike}°
            </GeneralCondition>
            <GeneralCondition title="VISIBILITY" isDarkMode={isDarkMode} icon="eye">
                {data.current.vis_km} km
            </GeneralCondition>
            <GeneralCondition title="HUMIDITY" isDarkMode={isDarkMode} icon="humidity">
                {data.current.humidity}%
            </GeneralCondition>
            <GeneralCondition title="PRESSURE" isDarkMode={isDarkMode} icon="barometer">
                {data.current.pressure_mb} mbar
            </GeneralCondition>
            <GeneralCondition title="AVERAGE" isDarkMode={isDarkMode} icon="graph">
                {parseInt(tempProps.average.toString())}°
            </GeneralCondition>
        </div>
    )
}

export default ConditionGrid