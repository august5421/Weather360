export const setWeatherData = (data) => ({
    type: 'SET_WEATHER_DATA',
    payload: data,
});
export const setCoords = (axis, value) => ({
    type: 'SET_COORDS',
    payload: { [axis]: value },
});
export const setShowNav = (data) => ({
    type: 'SET_SHOW_NAV',
    payload: data,
});
export const setCurrentScreen = (property, screen) => ({
    type: 'SET_CURRENT_SCREEN',
    payload: { [property]: screen },
});
export const setDarkMode = (value) => ({
    type: "SET_DARK_MODE",
    payload: value,
});
export const setTheme = (value) => ({
    type: "SET_THEME",
    payload: value,
});
export const setLocation = (value) => ({
    type: "SET_LOCATION",
    payload: value,
});
export const setCurrentWeatherIcon = (value) => ({
    type: "SET_CURRENT_WEATHER_ICON",
    payload: value,
});
export const setHourlyData = (value) => ({
    type: "SET_HOURLY_DATA",
    payload: value,
});
export const setMobile = (isMobile) => ({
    type: 'SET_MOBILE',
    payload: isMobile,
});
export const setTablet = (isTablet) => ({
    type: 'SET_TABLET',
    payload: isTablet,
});
export const setDailyData = (value) => ({
    type: "SET_DAILY_DATA",
    payload: value,
});
export const setAccompanyingData = (value) => ({
    type: "SET_ACCOMPANYING_DATA",
    payload: value,
});
export const setTz = (value) => ({
    type: 'SET_T_Z',
    payload: value,
});