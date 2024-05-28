const initialState = {
    coords: {lat: null, lng: null},
    weatherData: [],
    mobile: false,
    tablet: false,
    showNav: false,
    currentScreen: {active: null, out: null},
    darkMode: true,
    location: null,
    currentWeatherIcon: null,
    hourlyData: null,
    dailyData: null,
    accompanyingData: [],
    tz: null,
    theme: {
        primary: '#202B3B',
        secondary: '#4F45FF',
        tertiary: '#b1c4e0',
        dark: '#05020A',
        light: '#F0EFFF',
        grey: '#a5a5a5',
        logo: 'w360logo.png'
    }
};
  
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_WEATHER_DATA':
            return {
                ...state,
                weatherData: action.payload,
            };
        case 'SET_T_Z':
            return {
                ...state,
                tz: action.payload,
            };
        case 'SET_MOBILE':
            return {
                ...state,
                mobile: action.payload,
            };
        case 'SET_TABLET':
            return {
                ...state,
                tablet: action.payload,
            };
        case 'SET_SHOW_NAV':
            return {
                ...state,
                showNav: action.payload,
            };
        case 'SET_LOCATION':
            return {
                ...state,
                location: action.payload,
            };
        case 'SET_CURRENT_SCREEN':
            return {
                ...state,
                currentScreen: {
                    ...state.currentScreen,
                    ...action.payload,
                },
            };
        case 'SET_COORDS':
            return {
                ...state,
                coords: {
                    ...state.coords,
                    ...action.payload,
                },
            };
        case "SET_DARK_MODE":
            return {
                ...state,
                darkMode: action.payload,
            };
        case "SET_THEME":
            return {
                ...state,
                theme: action.payload,
            };
        case "SET_HOURLY_DATA":
            return {
                ...state,
                hourlyData: action.payload,
            };
        case "SET_DAILY_DATA":
            return {
                ...state,
                dailyData: action.payload,
            };
        case "SET_ACCOMPANYING_DATA":
            return {
                ...state,
                accompanyingData: action.payload,
            };
        case "SET_CURRENT_WEATHER_ICON":
            return {
                ...state,
                currentWeatherIcon: action.payload,
            }
        default:
        return state;
}
};
  
  export default rootReducer;
  