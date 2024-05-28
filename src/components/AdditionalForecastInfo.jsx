import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAccompanyingData } from '../actions/actions';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import OpacityIcon from '@mui/icons-material/Opacity';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { mphToKmph, mphToKnots, fahrenheitToCelsius } from './utilities.jsx'

function AdditionalForecastInfo(props) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const weatherData = useSelector((state) => state.weatherData);
  const accompanyingData = useSelector((state) => state.accompanyingData);
  const mobile = useSelector((state) => state.mobile);
  const wind = localStorage.getItem('windSpeedUnit')
  const temp = localStorage.getItem('tempUnit')
  const time = localStorage.getItem('timeFormat')
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    if (time === 'Military') {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  

  useEffect(() => {
    if (weatherData && weatherData.hourly) {
      const infoItems = [
        { icon: <ThermostatIcon />, value: temp == 'Fahrenheit' ? `${Math.round(weatherData.current.feels_like)}°F` : `${Math.round(fahrenheitToCelsius(weatherData.current.feels_like))}°C`, label: 'Real Feel' },
        { icon: <AirIcon />, value: wind === 'MPH' ? `${(Math.round(weatherData.current.wind_speed * 100) / 100).toFixed(2)} MPH` : (wind === 'KMH' ? `${(Math.round(mphToKmph(weatherData.current.wind_speed) * 100) / 100).toFixed(2)} KMH` : `${(Math.round(mphToKnots(weatherData.current.wind_speed) * 100) / 100).toFixed(2)} Knots`), label: 'Wind Speed' },
        { icon: <WbSunnyIcon />, value: Math.round(weatherData.current.uvi), label: 'UV Index' },
        { icon: <OpacityIcon />, value: `${weatherData.current.humidity} %`, label: 'Humidity' },
        { icon: <WbTwilightIcon />, value: formatTime(weatherData.current.sunrise), label: 'Sunrise' },
        { icon: <Brightness4Icon />, value: formatTime(weatherData.current.sunset), label: 'Sunset' },
      ];
      dispatch(setAccompanyingData([
        infoItems.slice(0, 3),
        infoItems.slice(3)
      ]));
    }
  }, [weatherData, dispatch]);
  
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: props.cities ? 'calc((100vh - 190px) / 3)' : 'calc((100vh - 175px) / 3)',
        borderRadius: '15px',
        backgroundColor: darkMode ? theme.primary : theme.tertiary,
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          color: darkMode ? theme.grey : theme.secondary,
          fontWeight: 700,
          fontSize: '20px',
          padding: '10px',
          flexShrink: 0, 
        }}
      >
        Air Conditions
      </Typography>
      {accompanyingData.length > 0 && accompanyingData.map((row, rowIndex) => (
        <Box
          key={rowIndex + 'accompanyingData'}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          {row.map((item, index) => (
            <Box
              key={index + 'row'}
              sx={{
                display: 'flex',
                flexDirection: mobile || props.cities ? 'column' : 'row',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: mobile ? '15px' : 'unset'
              }}
            >
              <Box
                key={index + 'column'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}
              >
                {React.cloneElement(item.icon, {
                  sx: {
                    color: darkMode ? theme.grey : theme.secondary,
                    fontSize: '30px'
                  }
                })}
              </Box>
              <Box
                key={index + 'innerCol'}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  
                }}
              >
              <Typography
                sx={{
                  color: darkMode ? theme.light : theme.primary,
                  fontWeight: 700,
                  fontSize: '20px'
                }}
              >
                {item.value}
              </Typography>  
              <Typography
                sx={{
                  color: darkMode ? theme.grey : theme.secondary,
                  fontWeight: 700,
                  fontSize: '15px'
                }}
              >
                {item.label}
              </Typography>  
              </Box>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default AdditionalForecastInfo;
