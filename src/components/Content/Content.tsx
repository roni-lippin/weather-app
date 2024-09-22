import React from "react";
import "./content.css"

interface Props {
  city: string,
  temp: number,
  situation: string,
  minTemp: number,
  maxTemp: number
}

const Content: React.FC<Props> = ({ city, temp, situation, minTemp, maxTemp}) => {
    return (
        <div className="content">
        <div className="city-name" id="city-name-update-main">
          <h2>{city}</h2>
        </div>
        <div className="temperature">
          <h1>{parseInt(temp.toString())}°</h1>
        </div>
        <h3>{situation}</h3>
        <h3>H:{parseInt(maxTemp.toString())}° L:{parseInt(minTemp.toString())}°</h3>
      </div>
    )
}

export default Content