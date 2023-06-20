import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import HomeScreen from './screens/HomeScreen';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [townName, setTownName] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const apiKey = 'deae629bae3842a69e70d273c0ef9e14';
  const [unit, setUnit] = useState('Imperial');
  const [darkMode, setDarkMode] = useState(true);
  
  const fetchData = async (lat, lng, unit) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${apiKey}&units=${unit}`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data.current);
      setHourlyData(response.data.hourly);
      setForecastData(response.data.daily);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };
  useEffect(() => {
    const getUserLocation = () => {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
          );
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });
      
    };

    getUserLocation()
      .then((position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        fetchData(latitude, longitude, unit);
      })
      .catch((error) => {
        console.error('Error getting user location:', error);
      });
      (async () => {
        const url2 = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;
        try {
          const response = await axios.get(url2);
          setTownName(response.data.address.town + ', ' + response.data.address.state);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      })();
  }, []);

  const handleLocationChange = (lat, lng, name) => {
    setLatitude(lat);
    setLongitude(lng);
    setTownName(name);
    fetchData(lat, lng, unit);
  };
  const handleUnitChange = (val) => {
    setUnit(val);
    fetchData(latitude, longitude, val);
  };
  const handleDarkModeChange = (val) => {
    setDarkMode(val);
  };
  return (
    <div className={darkMode ? "darkApp" : "lightApp"}>
      {weatherData && forecastData ? (
        <HomeScreen
          weatherData={weatherData}
          forecastData={forecastData}
          hourlyData={hourlyData}
          townName={townName}
          onLocationChange={handleLocationChange}
          handleUnitChange={handleUnitChange} 
          handleDarkModeChange={handleDarkModeChange}
          unit={unit}
          darkMode={darkMode}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
