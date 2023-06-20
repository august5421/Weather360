import React from 'react';
import './screens.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faArrowUp, faArrowDown, faDroplet, faWind } from '@fortawesome/free-solid-svg-icons';
const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHour}:${formattedMinutes} ${meridiem}`;
  };
  
const AdditionalScreen = ({weatherData, unit, darkMode}) => {
  return (
    <div className={"AdditionalScreen " + (darkMode ? "blue" : "lightBlue")}>
        <div className="container">
      <div className="cell">
        <div className="inner-cell">
          <div className="inner-content">
            <div className='iconHouse'>
                <FontAwesomeIcon icon={faArrowUp}  />
                <FontAwesomeIcon icon={faSun} size="3x" />
            </div>
          </div>
          <div className="inner-content">
            {formatTime(weatherData.sunrise)}
            <span className='additiopnalScreenDescription title'>Sunrise</span>
          </div>
        </div>
      </div>
      <div className="cell">
        <div className="inner-cell">
          <div className="inner-content">
            <div className='iconHouse'>
                <FontAwesomeIcon icon={faArrowDown}  />
                <FontAwesomeIcon icon={faSun} size="3x" />
            </div>
          </div>
          <div className="inner-content">
            {formatTime(weatherData.sunset)}
            <span className='additiopnalScreenDescription title'>Sunset</span>
          </div>
        </div>
      </div>
      <div className="cell">
        <div className="inner-cell">
          <div className="inner-content">
            <div className='iconHouse'>
                <FontAwesomeIcon icon={faDroplet} size="3x"  />
            </div>
          </div>
          <div className="inner-content">
            {weatherData.humidity}%
            <span className='additiopnalScreenDescription title'>Humidity</span>
          </div>
        </div>
      </div>
      <div className="cell">
        <div className="inner-cell">
          <div className="inner-content">
            <div className='iconHouse'>
                <FontAwesomeIcon icon={faWind}  size="3x" />
            </div>
          </div>
          <div className="inner-content">
            {weatherData.wind_speed} {unit == 'Imperial' ? 'MPH' : 'M/S'}
            <span className='additiopnalScreenDescription title'>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
 </div>
  );
};

export default AdditionalScreen;
