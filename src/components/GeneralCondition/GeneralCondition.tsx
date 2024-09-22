import React, { ReactNode } from "react";
import "./generalCondition.css";
import sun from "../sun.png";
import sunset from "../sunset.png";
import wind from "../wind.png";
import raindrop from "../raindrop.png";
import termomether from "../termomether.png";
import eye from "../eye.png";
import humidity from "../humidity.png";
import barometer from "../barometer.png";
import graph from "../graph.png";

type IconName = 'sun' | 'sunset' | 'wind' | 'raindrop' | 'termomether' | 'eye' | 'humidity' | 'barometer' | 'graph';

const iconMap: Record<IconName, string> = {
    sun,
    sunset,
    wind,
    raindrop,
    termomether,
    eye,
    humidity,
    barometer,
    graph
};

interface Props {
    title: string;
    children: ReactNode;
    isDarkMode: boolean;
    icon: IconName;
}

const GeneralCondition: React.FC<Props> = ({ title, children, isDarkMode, icon }) => {
    return (
        <div className={`condition ${isDarkMode ? 'dark' : 'light'}`}>
            <h3>
                <img
                    src={iconMap[icon]}
                    style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '8px',
                        filter: 'invert(100%)'
                    }}
                    alt={title}
                />
                {title}
            </h3>
            <br />
            <h4>{children}</h4>
        </div>
    );
};

export default GeneralCondition;