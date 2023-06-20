import React from 'react';
import './screens.css';
import DailyForecastItem from '../components/DailyForecastItem';
const SevenDayScreen = ({forecastData, unit, darkMode }) => {

  return (
    <div className={"SevenDayScreen " + (darkMode ? "blue" : "lightBlue")}>
      {forecastData.map((day, index) => (
          <DailyForecastItem day={day} unit={unit} />
        ))}
    </div>
  );
};

export default SevenDayScreen;
