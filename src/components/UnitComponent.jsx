import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { Typography, Tabs, Tab } from '@mui/material';

function UnitComponent() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData);
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  
  const [tempUnit, setTempUnit] = useState(
    localStorage.getItem('tempUnit') || 'Fahrenheit'
  );
  const [windSpeedUnit, setWindSpeedUnit] = useState(
    localStorage.getItem('windSpeedUnit') || 'MPH'
  );
  const [timeFormat, setTimeFormat] = useState(
    localStorage.getItem('timeFormat') || 'Standard'
  );

  const handleTempUnitChange = (event, newValue) => {
    setTempUnit(newValue);
    localStorage.setItem('tempUnit', newValue);
  };

  const handleWindSpeedUnitChange = (event, newValue) => {
    setWindSpeedUnit(newValue);
    localStorage.setItem('windSpeedUnit', newValue);
  };

  const handleTimeFormatChange = (event, newValue) => {
    setTimeFormat(newValue);
    localStorage.setItem('timeFormat', newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '15px',
        backgroundColor: darkMode ? theme.primary : theme.tertiary,
        marginBottom: '15px',
        paddingBottom: '10px',
        display: 'flex',
        flex: 2, 
        flexDirection: 'column',
      }}
    >
      <Box>
        <Typography
          sx={{
            color: darkMode ? theme.grey : theme.secondary,
            fontWeight: 700,
            fontSize: '20px',
            padding: '10px',
          }}
        >
          Temperature
        </Typography>
        <Tabs
          value={tempUnit}
          onChange={handleTempUnitChange}
          TabIndicatorProps={{
            style: { backgroundColor: theme.secondary }
          }}
          textColor={theme.light}
          variant="fullWidth"
          aria-label="temperature unit tabs"
          style={{
            backgroundColor: darkMode ? theme.dark : theme.light, 
            margin: '0px 10px',
            borderRadius: '15px',
          }}
        >
          <Tab label="Fahrenheit" value="Fahrenheit" />
          <Tab label="Celsius" value="Celsius" />
        </Tabs>
      </Box>
      
      <Box>
        <Typography
          sx={{
            color: darkMode ? theme.grey : theme.secondary,
            fontWeight: 700,
            fontSize: '20px',
            padding: '10px',
          }}
        >
          Wind Speed
        </Typography>
        <Tabs
          value={windSpeedUnit}
          onChange={handleWindSpeedUnitChange}
          TabIndicatorProps={{
            style: { backgroundColor: theme.secondary }
          }}
          textColor={theme.light}
          variant="fullWidth"
          aria-label="wind speed unit tabs"
          style={{
            backgroundColor: darkMode ? theme.dark : theme.light, 
            margin: '0px 10px',
            borderRadius: '15px',
          }}
        >
          <Tab label="MPH" value="MPH" />
          <Tab label="KMH" value="KMH" />
          <Tab label="Knots" value="Knots" />
        </Tabs>
      </Box>
      
      <Box>
        <Typography
          sx={{
            color: darkMode ? theme.grey : theme.secondary,
            fontWeight: 700,
            fontSize: '20px',
            padding: '10px',
          }}
        >
          Time
        </Typography>
        <Tabs
          value={timeFormat}
          onChange={handleTimeFormatChange}
          TabIndicatorProps={{
            style: { backgroundColor: theme.secondary }
          }}
          textColor={theme.light}
          variant="fullWidth"
          aria-label="time format tabs"
          style={{
            backgroundColor: darkMode ? theme.dark : theme.light, 
            margin: '0px 10px',
            borderRadius: '15px',
          }}
        >
          <Tab label="Standard" value="Standard" />
          <Tab label="Military" value="Military" />
        </Tabs>
      </Box>
    </Box>
  );
}

export default UnitComponent;
