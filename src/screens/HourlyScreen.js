import React, { useState } from 'react';
import './screens.css';
import HourlyForecastItem from '../components/HourlyForecastItem';
import Marquee from "react-fast-marquee";

const HourlyScreen = ({ weatherData, hourlyData, unit, darkMode  }) => {
  const [animationPaused, setAnimationPaused] = useState(false);
  const slicedHours = hourlyData.slice(0, 12);

  const handleHover = () => {
    setAnimationPaused(!animationPaused);
  };

  return (
    <div className={"HourlyScreen " + (darkMode ? "blue" : "lightBlue")}>
      <Marquee pauseOnHover speed={25}>
        {slicedHours.map((hour, index) => (
          <HourlyForecastItem key={index} hour={hour} unit={unit} darkMode={darkMode} />
        ))}
      </Marquee>
    </div>
  );
};

export default HourlyScreen;
