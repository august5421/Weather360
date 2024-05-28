import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentScreen } from "../actions/actions";
import IconButton from '@mui/material/IconButton';
import Stack from "@mui/material/Stack";
import WeatherIcon from "@mui/icons-material/WbSunny";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MapIcon from "@mui/icons-material/Map";
import SettingsIcon from "@mui/icons-material/Settings";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

const Navbar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const weatherData = useSelector((state) => state.weatherData);
  const currentScreen = useSelector((state) => state.currentScreen);
  const mobile = useSelector((state) => state.mobile);

  const handleScreenChange = (screen) => {
    dispatch(setCurrentScreen('active', null));
    setTimeout(() => {
      dispatch(setCurrentScreen('out', screen));
    }, 400);
    setTimeout(() => {
      dispatch(setCurrentScreen('active', screen));
    }, 600);
  };

  const navActionStyle = {
    color: darkMode ? theme.light : theme.dark,
    '&.Mui-selected': {
      color: theme.secondary
    }
  };

  const desktopNav = (
    <Stack
      direction="column"
      spacing={2}
      sx={{
        display: 'flex',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: darkMode ? theme.primary : theme.tertiary,
        margin: '15px',
        height: 'calc(100vh - 30px)',
        width: '140px',
        borderRadius: '15px'
      }}
    >
      <img
        src={`https://august5421.github.io/Weather360/assets/${theme.logo}`}
        alt="Weather360"
        style={{ width: '70%', position: 'absolute', top: 15, cursor: 'pointer' }}
        onClick={() => handleScreenChange("weatherScreen")}
      />
      <Stack direction="column" spacing={2}>
        <IconButton
          onClick={() => {
            if (currentScreen.active !== "weatherScreen") handleScreenChange("weatherScreen");
          }}
          sx={navActionStyle}
        >
          <WeatherIcon />
        </IconButton>
        Weather
      </Stack>
      <Stack direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton
          onClick={() => {
            if (currentScreen.active !== "citiesScreen") handleScreenChange("citiesScreen");
          }}
          sx={navActionStyle}
        >
          <LocationCityIcon />
        </IconButton>
        Cities
      </Stack>
      <Stack direction="column" spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <IconButton
          onClick={() => {
            if (currentScreen.active !== "settingsScreen") handleScreenChange("settingsScreen");
          }}
          sx={navActionStyle}
        >
          <SettingsIcon />
        </IconButton>
        Settings
      </Stack>
    </Stack>
  );

  const mobileNav = (
    <BottomNavigation
      value={currentScreen.active}
      onChange={(event, newValue) => handleScreenChange(newValue)}
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: darkMode ? theme.primary : theme.tertiary,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 1300, 
      }}
    >
      <BottomNavigationAction
        label="Weather"
        value="weatherScreen"
        icon={<WeatherIcon />}
        sx={navActionStyle}
      />
      <BottomNavigationAction
        label="Cities"
        value="citiesScreen"
        icon={<LocationCityIcon />}
        sx={navActionStyle}
      />
      <BottomNavigationAction
        label="Settings"
        value="settingsScreen"
        icon={<SettingsIcon />}
        sx={navActionStyle}
      />
    </BottomNavigation>
  );

  return mobile ? mobileNav : desktopNav;
};

export default Navbar;
