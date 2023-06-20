import React from 'react';

const HomeScreen = ({ weatherData, townName, unit }) => {
  const { name } = weatherData;
  const { temp, humidity, weather } = weatherData;
  const { description, icon } = weather[0];

  return (
    <div className="CurrentScreen">
      <div className='column'>
        <span className='temp'>{temp}{unit == 'Imperial' ? '°F' : '°C'}</span>
        <div className='bottom'>
          <span className='location'>{townName}</span>
          <span>{description}</span>
        </div>
      </div>
      <div className='column cent'>
        <img src={`${process.env.PUBLIC_URL}/assets/images/${icon}.png`} alt="Weather Icon" width="50%" />
      </div>      
    </div>
  );
};

export default HomeScreen;
