import React, { useState, useEffect } from 'react';
import './screens.css';
import NavScreen from './NavScreen';
import SearchScreen from './SearchScreen';
import CurrentScreen from './CurrentScreen';
import HourlyScreen from './HourlyScreen';
import AdditionalScreen from './AdditionalScreen';
import SevenDayScreen from './SevenDayScreen';

const HomeScreen = ({ weatherData, forecastData, hourlyData, townName, onLocationChange, handleUnitChange, unit, darkMode, handleDarkModeChange }) => {
    
    return (
    <div className="home-screen">
      <NavScreen handleUnitChange={handleUnitChange} handleDarkModeChange={handleDarkModeChange} unit={unit} darkMode={darkMode} />
      <div className='mainWeatherData'>
      <SearchScreen onLocationChange={onLocationChange} darkMode={darkMode} />
        <div className='rowOne'>
            <div className='colOne'>
                <CurrentScreen weatherData={weatherData} townName={townName} unit={unit} />
                <HourlyScreen hourlyData={hourlyData} unit={unit} darkMode={darkMode} />
                <AdditionalScreen weatherData={weatherData}  unit={unit} darkMode={darkMode} />
            </div>
            <SevenDayScreen forecastData={forecastData} unit={unit} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
