import React, { useEffect, useState } from 'react';
import './App.css'
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { setCoords, setCurrentScreen, setLocation, setShowNav, setWeatherData, setDarkMode, setTheme } from './actions/actions.jsx'
import axios from 'axios';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import WeatherScreen from './screens/WeatherScreen.jsx';
import CitiesScreen from './screens/CitiesScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const weatherData = useSelector((state) => state.weatherData);
  const currentScreen = useSelector((state) => state.currentScreen);
  const showNav = useSelector((state) => state.showNav);
  const [darkModeLoaded, setDarkModeLoaded] = useState(false); 
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const mobile = useSelector((state) => state.mobile);
  const coords = useSelector((state) => state.coords);

  useEffect(() => {
    setTimeout(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(setCoords('lat', position.coords.latitude))
        dispatch(setCoords('lng', position.coords.longitude))
      });
    }, 1000)
  }, [dispatch]);
  
  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    const storedTheme = JSON.parse(localStorage.getItem('themeStore'));
    if (storedTheme !== null) {
        dispatch(setTheme(storedTheme));
    }
    if (storedDarkMode !== null) {
      dispatch(setDarkMode(storedDarkMode === 'true')); 
    }
    setDarkModeLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (!darkModeLoaded) return; 

    if (coords.lat !== null && coords.lng !== null) {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=deae629bae3842a69e70d273c0ef9e14&units=Imperial`)
        .then((response) => {
          dispatch(setWeatherData(response.data));
          console.log(response.data)
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setLoading(false);
        });
        setTimeout(() => {
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=deae629bae3842a69e70d273c0ef9e14&units=Imperial`)
          .then((response) => {
            dispatch(setLocation(response.data));
            const existingCities = JSON.parse(localStorage.getItem('userCities')) || [];
            const isExisting = existingCities.some(city => city.name === response.data.name);
            if (!isExisting) {
              const updatedCities = [...existingCities, { name: response.data.name, lat: coords.lat, lng: coords.lng, temp: response.data.main.temp, icon: response.data.weather[0].icon }];
              localStorage.setItem('userCities', JSON.stringify(updatedCities));
              console.log(localStorage.getItem('userCities'))
            }
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });    
        }, 50)
    }
  }, [coords, dispatch, darkModeLoaded]);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setShowNav(true));
    }, 1000)
    
    setTimeout(() => {
      dispatch(setCurrentScreen('active', 'weatherScreen'));
      dispatch(setCurrentScreen('out', 'weatherScreen'));
    }, 1500)
  }, []);

  if (loading) {
    return (
      <Box sx={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: darkMode ? theme.dark : theme.light, color: darkMode ? theme.light :  theme.dark}}>
        <CircularProgress style={{color: theme.light}} />
        <div style={{marginTop: '15px'}}>Loading</div>
      </Box>
    );
  }

  return (
    <Box sx={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, display:'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: darkMode ? theme.dark : theme.light, color: darkMode ? theme.light :  theme.dark}}>
      <Box sx={{display: 'flex', flexDirection: 'row', flex: 1}}>
        {!mobile ? (
          <Box sx={{display: 'flex', flexDirection: mobile ? 'row' : 'column', flex: 1}}>
            <Collapse in={showNav}>
              <Navbar />
            </Collapse>
          </Box>
        ) : <Navbar />}
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 10}}>
          <Collapse in={currentScreen.active === 'weatherScreen'} orientation="horizontal">
              {currentScreen.out === 'weatherScreen' && (<WeatherScreen key="weatherScreen" />)}
          </Collapse>
          <Collapse in={currentScreen.active === 'citiesScreen'} orientation="horizontal">
            {currentScreen.out === 'citiesScreen' && (<CitiesScreen key="citiesScreen" />)}
          </Collapse>
          <Collapse in={currentScreen.active === 'settingsScreen'} orientation="horizontal">
            {currentScreen.out === 'settingsScreen' && (<SettingsScreen key="settingsScreen" />)}
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
