import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHourlyData } from '../actions/actions';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from "@mui/material/Typography";
import { fahrenheitToCelsius } from './utilities.jsx'

function DailyForecast(props) {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const weatherData = useSelector((state) => state.weatherData);
  const hourlyData = useSelector((state) => state.hourlyData);
  const tablet = useSelector((state) => state.tablet);
  const mobile = useSelector((state) => state.mobile);
  const temp = localStorage.getItem('tempUnit')

  useEffect(() => {
    if (weatherData && weatherData.hourly) {
      dispatch(setHourlyData(weatherData.hourly.slice(0, 12)));
    }
  }, [weatherData, dispatch]);

  const formatTime = (timestamp) => {
    const timeFormat = localStorage.getItem('timeFormat');
    if (timeFormat === 'Military') {
      const date = new Date(timestamp * 1000);
      const hour = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hour}:${minutes}`;
    } else {
      const date = new Date(timestamp * 1000);
      const hour = date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
      const meridiem = hour.slice(-2);
      const formattedHour = hour.slice(0, -3);
      return `${formattedHour} ${meridiem}`;
    }
  };
  

  const renderHourlyData = () => {
    if (!hourlyData) return null;

    const columnsPerRow = tablet || props.cities ? 6 : 12;
    const rows = Math.ceil(hourlyData.length / columnsPerRow);

    const rowsContent = [];
    for (let i = 0; i < rows; i++) {
      const rowData = hourlyData.slice(i * columnsPerRow, (i + 1) * columnsPerRow);
      rowsContent.push(
        <Box
          key={i + 'daily'}
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {rowData.map((hour, index) => (
            <Box
              key={index + 'dailyIn'}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0px 5px',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRight: index !== rowData.length - 1 ? '1px solid rgba(224, 224, 224, 0.2)' : 'none',
              }}
            >
              <Typography
                sx={{
                  color: darkMode ? theme.grey : theme.secondary,
                  fontWeight: 700,
                  fontSize: '15px',
                  whiteSpace: 'nowrap',
                }}
              >{formatTime(hour.dt)}</Typography>
              <img
                className="weather-icon"
                src={`https://august5421.github.io/Weather360/assets/${hour.weather[0].icon}.png`}
                alt="Weather Icon"
                width="60%"
              />
              <Typography
                sx={{
                  color: darkMode ? theme.light : theme.primary,
                  fontWeight: 700,
                  fontSize: '20px'
                }}
              >
                {temp == 'Fahrenheit' ? Math.round(hour.temp) : Math.round(fahrenheitToCelsius(hour.temp))}&deg;{temp == 'Fahrenheit' ? 'F' : 'C'}
              </Typography>
            </Box>
          ))}
        </Box>
      );
    }
    return rowsContent;
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '15px',
        minHeight: 'calc((100vh - 175px) / 3)',
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
        Today's Forecast
      </Typography>
      {renderHourlyData()}
    </Box>
  );
}

export default DailyForecast;
