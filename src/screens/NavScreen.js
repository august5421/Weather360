import React from 'react';
import './screens.css';
import w360logo from '../assets/images/w360logo.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const NavScreen = ({ handleUnitChange, handleDarkModeChange, unit, darkMode }) => {
    const handleSwitchChange = (event) => {
      const val = event.target.checked ? 'Imperial': 'Metric';
      handleUnitChange(val);
    };
    const handleDarkModeSwitchChange = (event) => {
        const val = event.target.checked ? true: false;
        handleDarkModeChange(val);
      };
    return (
      <div className={"NavScreen  " + (darkMode ? "blue" : "lightBlue")}>
        <img src={w360logo} alt="Weather360" className="logo" />
        <FormGroup>
          <FormControlLabel
            value="bottom"
            control={
              <Switch
                color="warning"
                defaultChecked
                onChange={handleDarkModeSwitchChange}
              />
            }
            label="Dark Mode"
            labelPlacement="bottom"
            className="switches"
          />
          <FormControlLabel
            value="bottom"
            control={
              <Switch
                color="warning"
                defaultChecked={unit === 'Imperial'}
                onChange={handleSwitchChange}
              />
            }
            label={unit}
            labelPlacement="bottom"
          />
        </FormGroup>
      </div>
    );
  };
  

export default NavScreen;
