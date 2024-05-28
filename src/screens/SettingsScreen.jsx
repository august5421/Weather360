import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import LooksComponent from '../components/LooksComponent';
import UnitComponent from '../components/UnitComponent';
import DataComponent from '../components/DataComponent'
function SettingsScreen() {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherData);
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const tablet = useSelector((state) => state.tablet);
  const mobile = useSelector((state) => state.mobile);

  return (
    <Box style={{minWidth: mobile ? 'calc(100vw - 30px)' : 'calc(100vw - 190px)', display: 'flex', flex: 1, flexDirection: 'column', margin: mobile ? '15px' : '15px 15px 15px 0px',  minHeight: 'calc(100vh - 30px)', overflow: tablet ? 'scroll' : 'unset'}}>
      <Typography
          sx={{
          color: darkMode ? theme.light : theme.primary,
          fontWeight: 700,
          fontSize: '35px'
          }}
      >
          Units
      </Typography>
      <UnitComponent />
      <Typography
          sx={{
          color: darkMode ? theme.light : theme.primary,
          fontWeight: 700,
          fontSize: '35px'
          }}
      >
          Look & Feel
      </Typography>
      <LooksComponent />
      <Typography
          sx={{
          color: darkMode ? theme.light : theme.primary,
          fontWeight: 700,
          fontSize: '35px'
          }}
      >
          Data
      </Typography>
      <DataComponent />
    </Box>
  );
}

export default SettingsScreen;
