import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { Typography, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { setDarkMode, setTheme } from '../actions/actions.jsx'; 

function LooksComponent() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const mobile = useSelector((state) => state.mobile);
  const handleDarkModeToggle = () => {
    const newDarkMode = !darkMode;
    dispatch(setDarkMode(newDarkMode)); 
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode)); 
  };

  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    if (storedDarkMode !== null) {
      dispatch(setDarkMode(storedDarkMode)); 
    }
  }, [dispatch]);

  const availableThemes = [
    {
      name: 'Violet Storm',
      primary: '#202B3B',
      secondary: '#4F45FF',
      tertiary: '#b1c4e0',
      dark: '#05020A',
      light: '#F0EFFF',
      grey: '#a5a5a5',
      logo: 'w360logo.png'
    },
    {
      name: 'Sunset Glow',
      primary: '#78541A',
      secondary: '#DA8619',
      tertiary: '#FFE875',
      dark: '#05020A',
      light: '#F0EFFF',
      grey: '#a5a5a5',
      logo: 'w360logo1.png'
    },
    {
      name: 'Mossy Mist',
      primary: '#235910',
      secondary: '#3D931D',
      tertiary: '#ADFC92',
      dark: '#05020A',
      light: '#F0EFFF',
      grey: '#a5a5a5',
      logo: 'w360logo2.png'
    },
    {
      name: 'Solar Flare',
      primary: '#3D1405',
      secondary: '#7F3D25',
      tertiary: '#FCB292',
      dark: '#05020A',
      light: '#F0EFFF',
      grey: '#a5a5a5',
      logo: 'w360logo3.png'
    },
  ]

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: darkMode ? theme.primary: theme.secondary,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: darkMode ? theme.primary: theme.secondary,
      borderRadius: 20 / 2,
    },
  }));
  
  const handleThemeChange = (selectedTheme) => {
    dispatch(setTheme(selectedTheme)); 
    localStorage.setItem('themeStore', JSON.stringify(selectedTheme)); 
  };


  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '15px',
        backgroundColor: darkMode ? theme.primary : theme.tertiary,
        marginBottom: '15px',
        display: 'flex',
        flex: 2,
        flexDirection:  mobile ? 'column' : 'row',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flex: 1,
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
          Dark Mode
        </Typography>
        <FormControlLabel
          control={<MaterialUISwitch 
            sx={{ m: 1 }} 
            defaultChecked 
            checked={darkMode}
            onChange={handleDarkModeToggle}
            />}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flex: 3,
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
          Theme
        </Typography>
        <Box style={{ display: 'flex', flexDirection: 'row', padding: '15px', marginRight: '15px', backgroundColor: darkMode ? theme.dark : theme.light, borderRadius: '25px'}}>
          {availableThemes.map(themely => (
            <Box key={themely.name} onClick={() => handleThemeChange(themely)} style={{ display: 'flex', margin: '0px 15px', padding: '15px 0px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flex: 1, borderRadius: '25px', border: '3px solid', borderColor: theme.primary == themely.primary ? theme.secondary : 'transparent' }}>
              <Box style={{ flex: 1 }}>
              <Typography
                sx={{
                  color: darkMode ? theme.grey : theme.secondary,
                  fontWeight: 700,
                  fontSize: '20px',
                  padding: '10px',
                  flexShrink: 0,
                }}
              >
                {themely.name}
              </Typography>
              </Box>
              <Box style={{ flex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box style={{ backgroundColor: themely.primary, width: '50px', height: '50px', marginRight: '10px' }} />
                <Box style={{ backgroundColor: themely.secondary, width: '50px', height: '50px', marginRight: '10px' }} />
                <Box style={{ backgroundColor: themely.tertiary, width: '50px', height: '50px' }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default LooksComponent;
