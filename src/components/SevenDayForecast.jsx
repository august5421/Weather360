import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { setDailyData } from "../actions/actions";
import Typography from "@mui/material/Typography";
import { fahrenheitToCelsius } from './utilities.jsx'

function SevenDayForecast() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const weatherData = useSelector((state) => state.weatherData);
  const dailyData = useSelector((state) => state.dailyData);
  const mobile = useSelector((state) => state.mobile);
  const tablet = useSelector((state) => state.tablet);
  const temp = localStorage.getItem('tempUnit')

  useEffect(() => {
    if (weatherData && weatherData.daily) {
      dispatch(setDailyData(weatherData.daily));
    }
  }, [weatherData, dispatch]);

  const unixTimestampToReadableDate = (timestamp) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dateTime = new Date(timestamp * 1000);
    const dayOfWeek = days[dateTime.getDay()];
    return dayOfWeek;
  };

  return (
    <Box
      style={{
        width: "100%",
        backgroundColor: darkMode ? theme.primary : theme.tertiary,
        borderRadius: "15px",
        height: "calc((100vh - 120px))",
        marginBottom: mobile ? '58px' : null
      }}
    >
      <Typography
        sx={{
          color: darkMode ? theme.grey : theme.secondary,
          fontWeight: 700,
          fontSize: "20px",
          padding: "10px",
          flexShrink: 0,
        }}
      >
        Seven Day Forecast
      </Typography>
      {dailyData && dailyData.map((day, index) => (
        <React.Fragment key={index + 'sevenDay'}>
          <Box
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              textAlign: 'left',
              height: "calc((100vh - 170px) / 20)",
              margin: "0px 10px",
            }}
          >
            <Box
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  color: darkMode ? theme.grey : theme.secondary,
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "10px",
                  flexShrink: 0,
                }}
              >
                {unixTimestampToReadableDate(day.dt)}
              </Typography>
            </Box>
          </Box>
          <Box
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              height: "calc((100vh - 170px) / 14)",
              margin: "0px 20px",
              borderBottom:
                index !== dailyData.length - 1
                  ? "1px solid rgba(224, 224, 224, 0.2)"
                  : "none",
            }}
          >
            <Box
              style={{
                display: "flex",
                flex: 2,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                className="weather-icon"
                src={`/assets/${day.weather[0].icon}.png`}
                alt="Weather Icon"
                style={{ height: "70%", marginRight: "5px" }}
              />
              <Typography
                sx={{
                  color: darkMode ? theme.light : theme.primary,
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "10px",
                  flexShrink: 0,
                }}
              >
                {day.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Typography>

            </Box>
            <Box
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {temp == 'Fahrenheit' ? Math.floor(day.temp.min) : Math.floor(fahrenheitToCelsius(day.temp.min))}&deg;{temp == 'Fahrenheit' ? 'F' : 'C'}
              <Typography
                sx={{
                  color: darkMode ? theme.grey : theme.secondary,
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "10px",
                  flexShrink: 0,
                }}
              >
                Low
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {temp == 'Fahrenheit' ? Math.floor(day.temp.max) : Math.floor(fahrenheitToCelsius(day.temp.max))}&deg;{temp == 'Fahrenheit' ? 'F' : 'C'}
              <Typography
                sx={{
                  color: darkMode ? theme.grey : theme.secondary,
                  fontWeight: 700,
                  fontSize: "15px",
                  padding: "10px",
                  flexShrink: 0,
                }}
              >
                High
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
}

export default SevenDayForecast;
