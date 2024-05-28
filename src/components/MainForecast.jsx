import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentWeatherIcon, setWeatherData } from '../actions/actions';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Skeleton from '@mui/material/Skeleton';
import { fahrenheitToCelsius } from './utilities.jsx'

function MainForecast() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const weatherData = useSelector((state) => state.weatherData);
  const location = useSelector((state) => state.location);
  const currentWeatherIcon = useSelector((state) => state.currentWeatherIcon);
  const temp = localStorage.getItem('tempUnit')
  
  useEffect(() => {
    if (weatherData && weatherData.current && weatherData.current.weather[0].icon) {
      const iconUrl = `/assets/${weatherData.current.weather[0].icon}.png`;
      dispatch(setCurrentWeatherIcon(iconUrl));
    }
  }, [weatherData, dispatch]);

  return (
    <Box style={{width: '100%', height: 'calc((100vh - 100px) /3)', borderRadius: '15px', marginBottom: '15px'}}>
      <Box sx={{display: 'flex', flexDirection: 'row', flex: 1, height: '100%'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, height: '100%', justifyContent: 'space-between'}}>
          <div>
            {location && (
              <Typography
                sx={{
                  color: darkMode ? theme.light : theme.primary,
                  fontWeight: 700,
                  fontSize: '35px'
                }}
              >
                {location.name}
              </Typography>
            )}
            {weatherData && (
              <Typography
                sx={{
                  color: darkMode ? theme.grey : theme.secondary,
                  fontWeight: 400,
                }}
              >
                {weatherData.current.weather[0].description}
              </Typography>
            )}
          </div>
          <div>
            {weatherData && (
              <Typography
                sx={{
                  color: darkMode ? theme.light : theme.primary,
                  fontWeight: 700,
                  fontSize: '60px'
                }}
              >
                {temp == 'Fahrenheit' ? Math.round(weatherData.current.temp) : Math.round(fahrenheitToCelsius(weatherData.current.temp))}&deg;{temp == 'Fahrenheit' ? 'F' : 'C'}
              </Typography>
            )}
          </div>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {weatherData && (
            <img
              className="weather-icon"
              src={`/assets/${weatherData.current.weather[0].icon}.png`}
              alt="Weather Icon"
              width="60%"
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default MainForecast;
