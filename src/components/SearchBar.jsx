import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, IconButton, Box } from '@mui/material';
import { setCoords } from '../actions/actions';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import axios from 'axios';

function SearchBar() {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const theme = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);

    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${newTerm}&apiKey=3efdac04afb447d38c9b8406e4915b9c`
      );

      const suggestions = response.data.features;
      setSuggestions(suggestions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.properties.formatted);
    setSuggestions([]);
    const { lat, lon } = suggestion.properties;
    const cityName = suggestion.properties.city + ', ' + suggestion.properties.state; 
    dispatch(setCoords('lat', lat))
    dispatch(setCoords('lng', lon))
  };

  return (
    <Box style={{width: '100%', height: '75px', borderRadius: '15px', backgroundColor: darkMode ? theme.primary : theme.tertiary}}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a location"
        className="search-bar"
        style={{
          width: 'calc(100% - 10px)',
          height: '75px', 
          borderRadius: '15px',
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          padding: '0px 20px',
          color: darkMode ? theme.grey : theme.secondary,
          '::placeholder': {
            color: darkMode ? theme.grey : theme.secondary,
          },
        }}
      />
      <Collapse in={suggestions.length > 0}>
        <Box style={{
          backgroundColor: darkMode ? theme.primary : theme.tertiary,
          zIndex: 999,
          position: 'relative',
          padding: '20px',
          top: -10,
          boxShadow: '0 10px 10px -10px rgba(0, 0, 0, 0.7)',
          borderBottomRightRadius: '15px',
          borderBottomLeftRadius: '15px',
        }}>
          {suggestions.map((suggestion, index) => (
            <div
              key={index + 'search'}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.properties.formatted}
            </div>
          ))}
        </Box>
      </Collapse>

    </Box>
  );
};

export default SearchBar;
