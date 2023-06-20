import React from 'react';
import './components.css';

const HourlyForecastItem = ({ hour, unit, darkMode }) => {
  const formattedTime = formatTime(hour.dt);
  const readableDate = unixTimestampToReadableDate(hour.dt);
  return (
    <div className={"hourly-forecast-item " + (darkMode ? "hov" : "lightHov")}>
      <img
        className="weather-icon"
        src={`${process.env.PUBLIC_URL}/assets/images/${hour.weather[0].icon}.png`}
        alt="Weather Icon"
      />
      <span className="temperature">{hour.temp}{unit == 'Imperial' ? '°F' : '°C'}</span>
      <span className="description">{hour.weather[0].description}</span>
      
      <span className="date">{formattedTime}</span>
      <span className="time">{readableDate}</span>
    </div>
  );
};

const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hour = date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
  const meridiem = hour.slice(-2);
  const formattedHour = hour.slice(0, -3);
  return `${formattedHour} ${meridiem}`;
};
const unixTimestampToReadableDate = (timestamp) => {
  const dateTime = new Date(timestamp * 1000);
  const year = dateTime.getFullYear();
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); 
  const day = ('0' + dateTime.getDate()).slice(-2);
  const readableDate = `${month}/${day}/${year}`;

  return readableDate;
};

export default HourlyForecastItem;
