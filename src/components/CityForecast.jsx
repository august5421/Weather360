import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import { setCoords, } from '../actions/actions.jsx'
import { fahrenheitToCelsius } from './utilities.jsx'
function CityForecast(props) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const mobile = useSelector((state) => state.mobile);
  const tablet = useSelector((state) => state.tablet);
  const weatherData = useSelector((state) => state.weatherData);
  const coords = useSelector((state) => state.coords);
  const userCities = JSON.parse(localStorage.getItem('userCities'));
  const temp = localStorage.getItem('tempUnit')
  const setCity = (x,y) => {
    dispatch(setCoords('lat', x))
    dispatch(setCoords('lng', y))
  }
  return (
    <>
        <Box
            sx={{
            borderRadius: '15px',
            backgroundColor: props.city.lat === coords.lat ? null : darkMode ? theme.primary : theme.secondary,
            border: '2px solid',
            borderColor: props.city.lat === coords.lat ? darkMode ? theme.secondary : theme.primary : 'transparent',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
            }}
            onClick={() => {setCity(props.city.lat, props.city.lng)}}
        >
            <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <img
                    className="weather-icon"
                    src={`/assets/${userCities[props.index].icon}.png`}
                    alt="Weather Icon"
                    width="60%"
                />
            </Box>
            <Box
            sx={{
                display: 'flex',
                flex: 3,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            >
                <Typography
                    sx={{
                    color: darkMode ? theme.light : theme.primary,
                    fontWeight: 700,
                    fontSize: '35px'
                    }}
                >
                    {props.city.name}
                </Typography>
            </Box>
            <Box
            sx={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            >
                <Typography
                    sx={{
                    color: darkMode ? theme.light : theme.primary,
                    fontWeight: 700,
                    fontSize: '35px'
                    }}
                >
                    {temp == 'Fahrenheit' ? Math.floor(userCities[props.index].temp) : Math.floor(fahrenheitToCelsius(userCities[props.index].temp))} &deg;{temp == 'Fahrenheit' ? 'F' : 'C'}
                </Typography>
            </Box>
        </Box>
    </>
  );
}

export default CityForecast;
