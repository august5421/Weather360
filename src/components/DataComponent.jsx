import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function DataComponent() {
  const weatherData = useSelector((state) => state.weatherData);
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const mobile = useSelector((state) => state.mobile);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteData = () => {
    localStorage.setItem('userCities', null);
    localStorage.setItem('tempUnit', 'Fahrenheit');
    localStorage.setItem('windSpeedUnit', 'MPH');
    localStorage.setItem('timeFormat', 'Standard');
    localStorage.setItem('darkMode', true);
    localStorage.setItem('themeStore', JSON.stringify(
      {
        primary: '#202B3B',
        secondary: '#4F45FF',
        tertiary: '#b1c4e0',
        dark: '#05020A',
        light: '#F0EFFF',
        grey: '#a5a5a5',
        logo: 'w360logo.png'
      }
    ));
    
    setOpen(false);
    setTimeout(() => {
      location.reload();
    }, 150)
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '15px',
        marginBottom: mobile ? '58px' : null,
        backgroundColor: darkMode ? theme.primary : theme.tertiary,
        display: 'flex',
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
      }}
    >
      <Button
        variant="contained"
        color="error"
        onClick={handleOpen}
        sx={{ margin: '10px', width: mobile ? '85%' : '40%', backgroundColor: theme.secondary }}
      >
        Delete Stored Data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Stored Data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your stored data?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteData} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DataComponent;
