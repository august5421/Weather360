import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import SearchBar from '../components/SearchBar';
import MainForecast from '../components/MainForecast';
import DailyForecast from '../components/DailyForecast';
import AdditionalForecastInfo from '../components/AdditionalForecastInfo';
import SevenDayForecast from '../components/SevenDayForecast';

function WeatherScreen() {
  const weatherData = useSelector((state) => state.weatherData);
  const mobile = useSelector((state) => state.mobile);
  const tablet = useSelector((state) => state.tablet);

  return (
    <Box sx={{margin: mobile ? '15px' : '15px 15px 15px 0px', height: 'calc(100vh - 30px)', minWidth: 'calc(100vw - 190px)', overflow: tablet ? 'scroll' : 'unset' }}>
      <Box sx={{display: 'flex', flexDirection: 'row', flex: 1, marginBottom: '15px'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', flex: 1}}>
          <SearchBar />
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row', flex: 1}}>
        <Box sx={{display: 'flex', flexDirection: 'column', flex: 1.5, marginRight: mobile ? null : '15px'}}>
          <MainForecast />
          <DailyForecast />
          <AdditionalForecastInfo />
          {mobile && (<SevenDayForecast />)}
        </Box>
        {!mobile && (
          <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
            <SevenDayForecast />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default WeatherScreen;
