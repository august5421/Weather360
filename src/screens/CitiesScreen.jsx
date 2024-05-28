import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import SearchBar from '../components/SearchBar';
import MainForecast from '../components/MainForecast';
import DailyForecast from '../components/DailyForecast';
import AdditionalForecastInfo from '../components/AdditionalForecastInfo';
import SevenDayForecast from '../components/SevenDayForecast';
import CityForecast from '../components/CityForecast';

function CitiesScreen() {
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const mobile = useSelector((state) => state.mobile);
  const tablet = useSelector((state) => state.tablet);
  const userCities = JSON.parse(localStorage.getItem('userCities'));

  return (
    <Box sx={{margin: mobile ? '15px' : '15px 15px 15px 0px', height: 'calc(100vh - 30px)', minWidth: mobile ? 'calc(100vw - 30px)' : 'calc(100vw - 190px)', overflow: 'scroll' }}>
      <Box sx={{display: 'flex', flexDirection: 'row', flex: 1, marginBottom: '15px'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', flex: 1}}>
          <SearchBar />
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flex: 1}}>
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 3, marginRight: mobile ? null : '15px'}}>
          {Array.isArray(userCities) && userCities.map((city, index) => (
            <CityForecast key={index + 'city'} city={city} index={index} />
          ))}
        </Box>
        {!mobile && (
          <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <MainForecast />
            <DailyForecast cities={true} />
            <AdditionalForecastInfo cities={true} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default CitiesScreen;
