import React, { useState } from 'react';
import axios from 'axios';

const AutocompleteSearchBar = ({ onLocationChange }) => {
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
    onLocationChange(lat, lon, cityName);
  };

  return (
    <div className="autocomplete-wrapper">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a location"
        className="search-bar"
      />
      <ul className="autocomplete-dropdown">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.properties.osm_id}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.properties.formatted}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompleteSearchBar;
