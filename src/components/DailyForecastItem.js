import React from 'react';
import './components.css';

const DailyForecastItem = ({ day, unit }) => {
  const readableDate = unixTimestampToReadableDate(day.dt);
  return (
    <div className="daily-forecast-item">
      <div class="box temperature">{readableDate}</div>
      <div class="box">
        <img
          className="weather-icon"
          src={`${process.env.PUBLIC_URL}/assets/images/${day.weather[0].icon}.png`}
          alt="Weather Icon"
        />
      </div>
      <div class="box textCent">
        <div className="temperature ">{day.temp.min} {unit == 'Imperial' ? '°F' : '°C'}</div>
        <div className="description "> {day.weather[0].description}</div>
      </div>
    </div>
  );
};

const unixTimestampToReadableDate = (timestamp) => {
  const dateTime = new Date(timestamp * 1000);
  const month = ('0' + (dateTime.getMonth() + 1)).slice(-2); 
  const day = ('0' + dateTime.getDate()).slice(-2);
  const readableDate = `${month}/${day}`;

  return readableDate;
};

export default DailyForecastItem;
